import { Mail } from 'lucide-react';

interface ModalHeaderProps {
    avatar: string;
    name: string;
    role: string;
    onSendMail: () => void;
}

export default function ModalHeader({
    avatar,
    name,
    role,
    onSendMail,
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
                    onClick={onSendMail}
                    className='flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20'
                >
                    <Mail size={16} /> Send Mail
                </button>
            </div>
        </div>
    );
}
