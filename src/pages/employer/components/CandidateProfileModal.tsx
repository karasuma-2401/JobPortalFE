import { X, Download, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { Candidate } from '../../../types/candidate';

import { useCandidateProfile } from '../../../hooks/useCandidateProfile';
import { useSeekerProfileById } from '../../../hooks/useSeekerProfileById';

import ModalHeader from './ModalHeader';
import { BiographySection, PersonalStatsCard } from './CandidateInfoSections';
import ContactInfoCard from './ContactInfoCard';

interface CandidateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    candidate: Candidate | null;
    onHire: (id: string) => void;
    isGeneralSeeker?: boolean;
    onInviteCandidate?: (candidate: Candidate) => void;
}

export default function CandidateProfileModal({
    isOpen,
    onClose,
    candidate,
    isGeneralSeeker,
    onInviteCandidate,
}: CandidateProfileModalProps) {
    const { data: appProfile, isLoading: isAppLoading } = useCandidateProfile(
        isOpen && candidate && !isGeneralSeeker ? Number(candidate.id) : null
    );

    const { data: seekerProfile, isLoading: isSeekerLoading } =
        useSeekerProfileById(
            isOpen && candidate && isGeneralSeeker ? Number(candidate.id) : null
        );

    const isLoading = isAppLoading || isSeekerLoading;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !candidate) return null;

    const seeker = isGeneralSeeker
        ? seekerProfile
        : appProfile?.jobSeekerProfile;

    const displayData = {
        name: seeker?.fullName || candidate.name,
        role: seeker?.professionalTitle || candidate.role || 'Candidate',
        biography:
            seeker?.biography ||
            candidate.biography ||
            'No biography provided.',
        coverLetter:
            appProfile?.coverLetter ||
            candidate.coverLetter ||
            'No cover letter provided.',
        dateOfBirth: seeker?.dateOfBirth
            ? new Date(seeker.dateOfBirth).toLocaleDateString()
            : candidate.dateOfBirth,
        nationality:
            seeker?.nationality || candidate.nationality || 'Not specified',
        maritalStatus:
            seeker?.maritalStatus || candidate.maritalStatus || 'Not specified',
        gender: seeker?.gender || candidate.gender || 'Not specified',
        experience:
            seeker?.experienceSummary ||
            candidate.experience ||
            'Not specified',
        education:
            seeker?.educationSummary || candidate.education || 'Not specified',
        website: seeker?.website || candidate.website,
        location: seeker?.address || candidate.location || 'Not specified',
        phone: seeker?.phone || candidate.phone || 'Not specified',
        secondaryPhone:
            seeker?.secondaryPhone ||
            candidate.secondaryPhone ||
            'Not specified',
        email: seeker?.email || candidate.email,
        avatar:
            seeker?.avatar ||
            candidate.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(seeker?.fullName || candidate.name)}&background=f3f4f6&color=4b5563`,
        social: {
            facebook: seeker?.facebookUrl || candidate.social?.facebook,
            twitter: seeker?.twitterUrl || candidate.social?.twitter,
            linkedin: seeker?.linkedlnUrl || candidate.social?.linkedin,
        },
    };

    const handleSendMail = () => {
        if (onInviteCandidate) {
            onInviteCandidate(candidate);
            return;
        }
        const subject = encodeURIComponent(
            `Interview Invitation: ${displayData.role}`
        );
        const body = encodeURIComponent(
            `Hi ${displayData.name},\n\nWe would like to invite you...`
        );
        window.location.href = `mailto:${displayData.email}?subject=${subject}&body=${body}`;
        toast.success(`Opening email composer...`);
    };

    const handleDownloadCV = () => {
        if (appProfile?.resume?.fileUrl) {
            window.open(appProfile.resume.fileUrl, '_blank');
            toast.success(`Opening official resume...`);
            return;
        }
        const dummyContent = `RESUME\n\nName: ${displayData.name}\nRole: ${displayData.role}`;
        const blob = new Blob([dummyContent], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `${displayData.name.replace(/\s+/g, '_')}_Resume.pdf`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success(`Downloading profile file...`);
    };

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200'>
                <button
                    onClick={onClose}
                    className='absolute -top-4 -right-4 w-10 h-10 bg-white shadow-md text-gray-500 hover:text-gray-900 rounded-full flex items-center justify-center transition-colors z-10'
                >
                    <X size={20} />
                </button>

                <ModalHeader
                    avatar={displayData.avatar}
                    name={displayData.name}
                    role={displayData.role}
                    onSendMail={handleSendMail}
                />

                {isLoading ? (
                    <div className='flex-1 flex flex-col items-center justify-center min-h-87.5'>
                        <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-3' />
                        <p className='text-sm font-medium text-gray-500'>
                            Loading candidate full portfolio...
                        </p>
                    </div>
                ) : (
                    <div className='flex-1 overflow-y-auto p-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                            <BiographySection
                                biography={displayData.biography}
                                coverLetter={displayData.coverLetter}
                                social={displayData.social}
                            />

                            <div className='space-y-6'>
                                <PersonalStatsCard
                                    dateOfBirth={displayData.dateOfBirth}
                                    nationality={displayData.nationality}
                                    maritalStatus={displayData.maritalStatus}
                                    gender={displayData.gender}
                                    experience={displayData.experience}
                                    education={displayData.education}
                                />
                                <div className='p-6 border border-gray-100 rounded-xl bg-blue-50/50'>
                                    <h3 className='text-sm font-bold text-gray-900 mb-4'>
                                        Download Resume
                                    </h3>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-white flex items-center justify-center rounded text-red-500 shadow-sm'>
                                                <i className='fa-solid fa-file-pdf text-xl'></i>
                                            </div>
                                            <div>
                                                <p className='text-xs text-gray-500 font-medium truncate max-w-30'>
                                                    {displayData.name}
                                                </p>
                                                <p className='text-sm font-bold text-gray-900'>
                                                    PDF Document
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDownloadCV}
                                            className='w-10 h-10 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center rounded transition-colors shadow-md'
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                                <ContactInfoCard
                                    website={displayData.website}
                                    location={displayData.location}
                                    phone={displayData.phone}
                                    secondaryPhone={displayData.secondaryPhone}
                                    email={displayData.email}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
