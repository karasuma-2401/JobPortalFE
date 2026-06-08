import { useEffect, useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ResumeCard from './ResumeCard';
import AddResume from './AddResume';
import { JobseekerService } from '../../../../../services/jobseekerService';
import type { Resume } from '../../../../../types/jobseeker';

export default function ResumeManager() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

    const loadResumes = async () => {
        try {
            setIsLoading(true);
            const response = await JobseekerService.getMyResumes();
            setResumes(response);
        } catch (error) {
            toast.error((error as Error).message || 'Failed to load resumes.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadResumes();
    }, []);

    const handleSaveResume = async (values: {
        fileName: string;
        file?: File | null;
    }) => {
        if (selectedResume) {
            await JobseekerService.renameResume(selectedResume.id, values.fileName);
            toast.success('Resume renamed successfully.');
        } else if (values.file) {
            await JobseekerService.uploadResume(values.file, values.fileName);
            toast.success('New resume added successfully.');
        }

        await loadResumes();
    };

    const handleDeleteResume = async (id: string) => {
        try {
            await JobseekerService.deleteResume(id);
            await loadResumes();
            toast.success('Resume removed successfully.');
        } catch (error) {
            toast.error((error as Error).message || 'Failed to delete resume.');
        }
    };

    const handleSetDefaultResume = async (id: string) => {
        try {
            await JobseekerService.setDefaultResume(id);
            await loadResumes();
            toast.success('Default resume updated.');
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to set default resume.'
            );
        }
    };

    return (
        <div className='mt-16 border-t border-gray-100 pt-10 text-left'>
            <h3 className='mb-8 text-lg font-bold text-gray-900'>Your Cv/Resume</h3>

            {isLoading ? (
                <div className='flex justify-center py-10'>
                    <Loader2 className='animate-spin text-primary-500' size={24} />
                </div>
            ) : (
                <div className='grid grid-cols-1 items-stretch gap-6 md:grid-cols-2'>
                    {resumes.map((resume) => (
                        <ResumeCard
                            key={resume.id}
                            resume={resume}
                            onDelete={handleDeleteResume}
                            onEdit={() => {
                                setSelectedResume(resume);
                                setIsModalOpen(true);
                            }}
                            onSetDefault={handleSetDefaultResume}
                        />
                    ))}

                    <button
                        type='button'
                        onClick={() => {
                            setSelectedResume(null);
                            setIsModalOpen(true);
                        }}
                        className='group flex h-full items-center justify-start rounded-lg border-2 border-dashed border-primary-100 bg-bg-white p-5 outline-none transition-all hover:bg-primary-50'
                    >
                        <div className='flex items-center gap-4'>
                            <div className='rounded-full bg-primary-100 p-3 text-primary-500 transition-transform group-hover:scale-110'>
                                <Plus size={24} />
                            </div>
                            <div className='flex flex-col text-left'>
                                <p className='text-sm font-bold text-primary-500'>
                                    Add Cv/Resume
                                </p>
                                <p className='mt-1 text-[11px] text-gray-400'>
                                    Upload a backend-managed resume file.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            )}

            <AddResume
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveResume}
                editData={
                    selectedResume
                        ? { fileName: selectedResume.fileName }
                        : null
                }
            />
        </div>
    );
}
