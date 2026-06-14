import {
    MapPin,
    Briefcase,
    GraduationCap,
    Bookmark,
    BookmarkMinus,
    Mail,
} from 'lucide-react';
import type { Candidate } from '../../../../types/candidate';

interface CandidateCardProps {
    candidate: Candidate;
    isSaved: boolean;
    onToggleSave: (id: string, name: string) => void;
    onInvite: (candidate: Candidate) => void;
    onViewProfile?: (candidate: Candidate) => void;
}

export default function CandidateCard({
    candidate,
    isSaved,
    onToggleSave,
    onInvite,
    onViewProfile,
}: CandidateCardProps) {
    const defaultAvatar =
        'https://ui-avatars.com/api/?name=' +
        candidate.name.replace(' ', '+') +
        '&background=f3f4f6&color=4b5563';

    return (
        <div className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group flex flex-col'>
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-4'>
                    <img
                        src={candidate.avatar || defaultAvatar}
                        alt={candidate.name}
                        className='w-14 h-14 rounded-full object-cover border border-gray-100'
                    />
                    <div>
                        <h3 className='font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors'>
                            {candidate.name}
                        </h3>
                        <p className='text-sm font-medium text-gray-500'>
                            {candidate.role}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onToggleSave(candidate.id, candidate.name)}
                    className={`p-2 rounded-full transition-colors ${
                        isSaved
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-400 hover:bg-gray-100'
                    }`}
                >
                    {isSaved ? (
                        <Bookmark size={20} className='fill-current' />
                    ) : (
                        <BookmarkMinus size={20} />
                    )}
                </button>
            </div>

            <div className='flex flex-wrap items-center gap-3 mb-4'>
                <div className='flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md'>
                    <MapPin size={14} className='text-gray-400' />{' '}
                    {candidate.location}
                </div>
                <div className='flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md'>
                    <Briefcase size={14} className='text-gray-400' />{' '}
                    {candidate.experience}
                </div>
                <div className='flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md'>
                    <GraduationCap size={14} className='text-blue-500' />{' '}
                    {candidate.education}
                </div>
            </div>

            <p className='text-sm text-gray-600 mb-6 line-clamp-2 flex-1'>
                {candidate.biography}
            </p>

            <div className='flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto'>
                <button 
                    onClick={() => onViewProfile?.(candidate)}
                    className='flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors'
                >
                    View Profile
                </button>
                <button
                    onClick={() => onInvite(candidate)}
                    className='flex-1 py-2.5 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20'
                >
                    <Mail size={16} /> Invite
                </button>
            </div>
        </div>
    );
}
