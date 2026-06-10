import { Bookmark, BookmarkMinus, Mail, ArrowRight } from 'lucide-react';

interface ModalHeaderProps {
    avatar: string;
    name: string;
    role: string;
    isSaved: boolean;
    onToggleSave: () => void;
    onSendMail: () => void;
    onHire: () => void;
}

export default function ModalHeader({
    avatar,
    name,
    role,
    isSaved,
    onToggleSave,
    onSendMail,
    onHire,
}: ModalHeaderProps) {
    return (
        <div className='flex flex-col sm:flex-row sm:items-center justify-between p-8 border-b border-gray-100 shrink-0 gap-4'>
            <div className='flex items-center gap-4'>
                <img
                    src={avatar}
                    alt={name}
                    className='w-16 h-16 rounded-full object-cover'
                />
                <div>
                    <h2 className='text-xl font-bold text-gray-900'>{name}</h2>
                    <p className='text-sm text-gray-500'>{role}</p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <button
                    onClick={onToggleSave}
                    className={`p-2.5 rounded-md transition-colors ${
                        isSaved
                            ? 'text-blue-600 bg-blue-50 hover:bg-red-50 hover:text-red-500'
                            : 'text-gray-400 bg-gray-50 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    title={isSaved ? 'Unsave Candidate' : 'Save Candidate'}
                >
                    {isSaved ? (
                        <Bookmark size={20} fill='currentColor' />
                    ) : (
                        <BookmarkMinus size={20} />
                    )}
                </button>
                <button
                    onClick={onSendMail}
                    className='flex items-center gap-2 px-6 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors'
                >
                    <Mail size={16} /> Send Mail
                </button>
                <button
                    onClick={onHire}
                    className='flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors'
                >
                    Hire Candidate <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
