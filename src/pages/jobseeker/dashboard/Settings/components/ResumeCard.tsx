import { useEffect, useRef, useState } from 'react';
import {
    CheckCircle2,
    ExternalLink,
    FileText,
    MoreVertical,
    Pencil,
    Star,
    Trash2,
} from 'lucide-react';
import type { Resume } from '../../../../../types/jobseeker';

interface ResumeCardProps {
    resume: Resume;
    onDelete: (id: string) => void;
    onEdit: () => void;
    onSetDefault: (id: string) => void;
}

export default function ResumeCard({
    resume,
    onDelete,
    onEdit,
    onSetDefault,
}: ResumeCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='relative flex h-full items-center justify-between rounded-lg border border-gray-100 bg-bg-white p-5 text-left transition-all hover:border-primary-200'>
            <div className='flex min-w-0 items-center gap-4'>
                <div className='rounded-lg bg-primary-50 p-3 shrink-0'>
                    <FileText className='h-6 w-6 text-primary-500' />
                </div>
                <div className='min-w-0'>
                    <div className='flex items-center gap-2'>
                        <h4 className='truncate pr-2 text-sm font-semibold text-gray-900'>
                            {resume.fileName}
                        </h4>
                        {resume.defaultResume && (
                            <span className='rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600'>
                                Default
                            </span>
                        )}
                    </div>
                    <p className='mt-1 text-xs text-gray-500'>
                        Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                    <a
                        href={resume.fileUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:underline'
                    >
                        View Resume <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            <div className='relative ml-2 shrink-0' ref={menuRef}>
                <button
                    type='button'
                    onClick={() => setIsOpen((current) => !current)}
                    className={`rounded-full p-1.5 transition-colors ${
                        isOpen
                            ? 'bg-primary-50 text-primary-500'
                            : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <MoreVertical size={20} />
                </button>

                {isOpen && (
                    <div className='absolute right-0 z-30 mt-2 w-44 rounded-lg border border-gray-100 bg-bg-white py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <button
                            type='button'
                            className='flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50'
                            onClick={() => {
                                setIsOpen(false);
                                onEdit();
                            }}
                        >
                            <Pencil size={16} className='text-primary-500' />
                            Rename Resume
                        </button>
                        {!resume.defaultResume && (
                            <button
                                type='button'
                                className='flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50'
                                onClick={() => {
                                    setIsOpen(false);
                                    onSetDefault(resume.id);
                                }}
                            >
                                <Star size={16} className='text-amber-500' />
                                Set As Default
                            </button>
                        )}
                        {resume.defaultResume && (
                            <div className='flex items-center gap-2 px-4 py-2.5 text-sm text-green-600'>
                                <CheckCircle2 size={16} />
                                Current Default
                            </div>
                        )}
                        <div className='my-1 h-px bg-gray-100' />
                        <button
                            type='button'
                            className='flex w-full items-center gap-2 px-4 py-2.5 text-sm text-danger-500 transition-colors hover:bg-danger-50'
                            onClick={() => {
                                setIsOpen(false);
                                onDelete(resume.id);
                            }}
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
