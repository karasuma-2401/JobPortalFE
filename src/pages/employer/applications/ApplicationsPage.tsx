import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import KanbanColumn, { type ColumnData } from './components/KanbanColumn';
import CandidateProfileModal from '../components/CandidateProfileModal';
import KanbanBoardSkeleton from './components/KanbanBoardSkeleton';

import type { Candidate } from '../../../types/candidate';
import type {
    ApplicationStatus,
    JobApplication,
} from '../../../types/application';
import {
    useApplications,
    useUpdateApplicationStatus,
    useDeleteApplication,
} from '../../../hooks/useApplications';

const FIXED_COLUMNS: ColumnData[] = [
    { id: 'PENDING', title: 'Pending' },
    { id: 'REVIEWING', title: 'Reviewing' },
    { id: 'ACCEPTED', title: 'Accepted' },
    { id: 'REJECTED', title: 'Rejected' },
];

export default function ApplicationsPage() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const currentJobId = searchParams.get('jobId');

    const { data: apiApplications, isLoading } = useApplications(currentJobId);
    const { mutate: updateStatus } = useUpdateApplicationStatus();
    const { mutate: deleteApplication } = useDeleteApplication();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState<
        string | null
    >(null);

    const sortMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sortMenuRef.current &&
                !sortMenuRef.current.contains(event.target as Node)
            ) {
                setShowSortMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const candidates: Candidate[] = useMemo(() => {
        if (!apiApplications || !Array.isArray(apiApplications)) return [];

        return apiApplications.map((app: JobApplication) => {
            const seeker = app.jobSeekerProfile;
            return {
                id: String(app.id),
                columnId: app.status,
                name: seeker?.fullName || 'Unknown Applicant',
                avatar: seeker?.avatar || null,
                role: seeker?.professionalTitle || 'Applicant',
                experience: seeker?.experienceSummary || 'N/A',
                education: seeker?.educationSummary || 'N/A',
                appliedDate: app.appliedAt || new Date().toISOString(),
                biography: 'View profile for details.',
                coverLetter: app.coverLetter || 'No cover letter provided.',
                dateOfBirth: 'Unknown',
                nationality: 'Unknown',
                maritalStatus: 'Unknown',
                gender: 'Unknown',
                website: '',
                location: seeker?.address || 'Unknown Location',
                phone: seeker?.phone || 'No Phone',
                secondaryPhone: '',
                email: seeker?.email || 'Unknown Email',
                social: {},
                resumeUrl: app.resume?.fileUrl || '',
            };
        });
    }, [apiApplications]);

    const filteredAndSortedCandidates = useMemo(() => {
        let result = [...candidates];

        if (searchQuery.trim()) {
            result = result.filter((candidate) =>
                candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return result.sort((a, b) => {
            const dateA = new Date(a.appliedDate).getTime();
            const dateB = new Date(b.appliedDate).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [candidates, searchQuery, sortOrder]);

    const selectedCandidate = useMemo(() => {
        return candidates.find((c) => c.id === selectedCandidateId) ?? null;
    }, [candidates, selectedCandidateId]);

    const handleDragStart = (e: React.DragEvent, candidateId: string) => {
        e.dataTransfer.setData('candidateId', candidateId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
        const candidateId = e.dataTransfer.getData('candidateId');
        if (!candidateId) return;

        updateStatus({
            id: Number(candidateId),
            status: targetColumnId as ApplicationStatus,
        });
        queryClient.setQueryData(
            ['jobApplications', currentJobId],
            (oldData: JobApplication[] | undefined) => {
                if (!oldData) return oldData;
                return oldData.map((app) =>
                    app.id === Number(candidateId)
                        ? {
                              ...app,
                              status: targetColumnId as ApplicationStatus,
                          }
                        : app
                );
            }
        );
    };

    const handleDeleteCandidate = (candidateId: string) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this application?'
        );
        if (confirm) {
            deleteApplication(Number(candidateId));
        }
    };

    return (
        <div className='w-full h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 shrink-0 gap-4'>
                <div>
                    <h1 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                        Job Applications
                        {currentJobId && (
                            <span className='text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium'>
                                Filtered by Job #{currentJobId}
                            </span>
                        )}
                    </h1>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search
                            size={16}
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                        />
                        <input
                            type='text'
                            placeholder='Search applicant...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 sm:w-64 transition-all text-gray-900'
                        />
                    </div>

                    <div className='relative' ref={sortMenuRef}>
                        <button
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                                showSortMenu
                                    ? 'bg-blue-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Sort <ChevronDown size={16} />
                        </button>

                        {showSortMenu && (
                            <div className='absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-xl p-5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100'>
                                <div className='space-y-4'>
                                    <label className='flex items-center gap-3 cursor-pointer group'>
                                        <input
                                            type='radio'
                                            checked={sortOrder === 'newest'}
                                            onChange={() =>
                                                setSortOrder('newest')
                                            }
                                            className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                        />
                                        <span className='text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>
                                            Newest
                                        </span>
                                    </label>

                                    <label className='flex items-center gap-3 cursor-pointer group'>
                                        <input
                                            type='radio'
                                            checked={sortOrder === 'oldest'}
                                            onChange={() =>
                                                setSortOrder('oldest')
                                            }
                                            className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                        />
                                        <span className='text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>
                                            Oldest
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <KanbanBoardSkeleton />
            ) : (
                <div className='flex gap-8 flex-1 min-h-0 relative'>
                    <div className='flex-1 flex gap-6 overflow-x-auto pb-4'>
                        {FIXED_COLUMNS.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                applicants={filteredAndSortedCandidates.filter(
                                    (candidate) =>
                                        candidate.columnId === column.id
                                )}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onDelete={() => {}}
                                onEdit={() => {}}
                                onDeleteApplicant={handleDeleteCandidate}
                                onViewProfile={setSelectedCandidateId}
                            />
                        ))}
                    </div>
                </div>
            )}

            <CandidateProfileModal
                isOpen={!!selectedCandidate}
                onClose={() => setSelectedCandidateId(null)}
                candidate={selectedCandidate}
                onHire={(candidateId) => {
                    updateStatus({
                        id: Number(candidateId),
                        status: 'ACCEPTED',
                    });
                    toast.success(`Candidate hired successfully!`);
                    setSelectedCandidateId(null);
                }}
            />
        </div>
    );
}
