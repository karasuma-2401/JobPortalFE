import { useState, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import FilterSidebar from './components/FilterSidebar';
import CandidateCard from './components/CandidateCard';
import InviteModal from './components/InviteModal';
import CandidateProfileModal from '../components/CandidateProfileModal';
import { useDiscoverCandidates } from '../../../hooks/useDiscoverCandidates';
import {
    useSavedCandidates,
    useSaveCandidate,
    useRemoveSavedCandidate,
} from '../../../hooks/useSavedCandidates';
import type { Candidate } from '../../../types/candidate';

export default function FindCandidatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    const [inviteModalData, setInviteModalData] = useState<{
        isOpen: boolean;
        candidateName: string;
    }>({
        isOpen: false,
        candidateName: '',
    });

    // Query filters mapped to backend parameters
    const filters = useMemo(() => {
        return {
            search: searchQuery || undefined,
            jobLevel: selectedCategory !== 'All' ? selectedCategory : undefined,
            limit: 100, // Fetch up to 100 candidates to support local filtering of experience
            offset: 0,
        };
    }, [searchQuery, selectedCategory]);

    // API Queries
    const { data: discoverData, isLoading: isDiscoverLoading } = useDiscoverCandidates(filters);
    const { data: savedCandidates, isLoading: isSavedLoading } = useSavedCandidates();

    // API Mutations
    const { mutate: saveCandidate } = useSaveCandidate();
    const { mutate: removeSavedCandidate } = useRemoveSavedCandidate();

    // Map saved candidate IDs into a Set for fast lookup
    const savedIds = useMemo(() => {
        if (!savedCandidates) return new Set<string>();
        return new Set(savedCandidates.map((s) => s.jobSeekerId.toString()));
    }, [savedCandidates]);

    // Map backend JobSeekerResponse to frontend Candidate format
    const candidates: Candidate[] = useMemo(() => {
        if (!discoverData?.items) return [];

        return discoverData.items.map((seeker: any) => ({
            id: seeker.id.toString(),
            columnId: 'discover',
            name: seeker.fullName || 'Anonymous',
            avatar: seeker.avatar || null,
            role: seeker.professionalTitle || 'Candidate',
            experience: seeker.experienceSummary || 'Not specified',
            education: seeker.educationSummary || 'Not specified',
            appliedDate: '',
            biography: seeker.biography || 'No biography provided.',
            coverLetter: '',
            dateOfBirth: seeker.dateOfBirth ? new Date(seeker.dateOfBirth).toLocaleDateString() : 'Not specified',
            nationality: seeker.nationality || 'Not specified',
            maritalStatus: seeker.maritalStatus || 'Not specified',
            gender: seeker.gender || 'Not specified',
            website: seeker.website || '',
            location: seeker.address || 'Not specified',
            phone: seeker.phone || 'Not specified',
            secondaryPhone: seeker.secondaryPhone || '',
            email: seeker.email || '',
            social: {
                facebook: seeker.facebookUrl || '',
                twitter: seeker.twitterUrl || '',
                linkedin: seeker.linkedlnUrl || '',
            },
        }));
    }, [discoverData?.items]);

    // Parse numeric experience years from string
    const getExperienceYears = (expText: string): number => {
        const match = expText.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    };

    // Filter candidates locally for the experience dropdown
    const filteredCandidates = useMemo(() => {
        return candidates.filter((candidate: Candidate) => {
            if (selectedExperience === 'All') return true;

            const years = getExperienceYears(candidate.experience);
            if (selectedExperience === '0-2 Years') {
                return years <= 2;
            } else if (selectedExperience === '3-5 Years') {
                return years >= 3 && years <= 5;
            } else if (selectedExperience === '5+ Years') {
                return years >= 5;
            }
            return true;
        });
    }, [candidates, selectedExperience]);

    const toggleSaveCandidate = (id: string, name: string) => {
        const seekerId = Number(id);
        if (savedIds.has(id)) {
            removeSavedCandidate(seekerId, {
                onSuccess: () => {
                    toast.info(`Removed ${name} from saved list.`);
                },
            });
        } else {
            saveCandidate(seekerId, {
                onSuccess: () => {
                    toast.success(`Saved ${name} successfully!`);
                },
            });
        }
    };

    const handleHireCandidate = (_id: string) => {
        toast.success(`🎉 Successfully sent an offer to ${selectedCandidate?.name}!`);
        setSelectedCandidate(null);
    };

    const isLoading = isDiscoverLoading || isSavedLoading;

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16 flex flex-col lg:flex-row gap-8'>
            <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedExperience={selectedExperience}
                setSelectedExperience={setSelectedExperience}
            />

            <div className='flex-1'>
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Find Candidates
                        {!isLoading && (
                            <span className='text-gray-400 font-medium text-lg ml-2'>
                                ({filteredCandidates.length})
                            </span>
                        )}
                    </h1>
                </div>

                {isLoading ? (
                    <div className='flex flex-col items-center justify-center py-20 bg-white border border-gray-150 rounded-2xl'>
                        <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-3' />
                        <p className='text-sm text-gray-500 font-medium'>
                            Loading candidates list...
                        </p>
                    </div>
                ) : filteredCandidates.length === 0 ? (
                    <div className='bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center'>
                        <Search size={48} className='text-gray-300 mb-4' />
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                            No candidates found
                        </h3>
                        <p className='text-gray-500'>
                            Try adjusting your filters or search keywords.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setSelectedExperience('All');
                            }}
                            className='mt-4 text-blue-600 font-bold hover:underline'
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'>
                        {filteredCandidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                isSaved={savedIds.has(candidate.id)}
                                onToggleSave={toggleSaveCandidate}
                                onViewProfile={(candidate: Candidate) => setSelectedCandidate(candidate)}
                                onInvite={(name) =>
                                    setInviteModalData({
                                        isOpen: true,
                                        candidateName: name,
                                    })
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            <InviteModal
                isOpen={inviteModalData.isOpen}
                onClose={() =>
                    setInviteModalData({ isOpen: false, candidateName: '' })
                }
                candidateName={inviteModalData.candidateName}
            />

            <CandidateProfileModal
                isOpen={!!selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
                candidate={selectedCandidate}
                isGeneralSeeker={true}
                onHire={handleHireCandidate}
            />
        </div>
    );
}
