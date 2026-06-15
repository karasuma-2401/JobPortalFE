import { useRef, useState } from 'react';
import { Loader2, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';
import type { JobSeekerProfile } from '../../../../../types/jobseeker';
import { JobseekerService } from '../../../../../services/jobseekerService';
import Button from '../../../../../components/ui/Button';
import useAuth from '../../../../../contexts/auth/useAuth';
import { AuthService } from '../../../../../services/authService';
import { AuthSessionService } from '../../../../../services/authSessionService';

interface ProfilePictureProps {
    profile: JobSeekerProfile;
    onUpdated: () => Promise<void>;
}

export default function ProfilePicture({
    profile,
    onUpdated,
}: ProfilePictureProps) {
    const { refreshAuth } = useAuth();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Choose an avatar image first.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            setIsLoading(true);
            await JobseekerService.updateProfile(formData);
            await onUpdated();

            const meResponse = await AuthService.getMe();
            AuthSessionService.saveUser(meResponse);
            refreshAuth();

            toast.success('Profile picture updated successfully!');
            setSelectedFile(null);
        } catch (error) {
            toast.error((error as Error).message || 'Failed to upload avatar.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='space-y-6'>
            <h3 className='text-sm font-bold text-gray-900'>
                Basic Information
            </h3>

            <div className='rounded-xl border border-gray-100 bg-gray-50/30 p-8 text-center transition-all hover:border-gray-200'>
                <div className='relative inline-block'>
                    <img
                        src={
                            selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : profile.avatar ||
                                  `https://ui-avatars.com/api/?name=${profile.fullName || 'Candidate'}&background=e7f0fa&color=0a65cc`
                        }
                        alt={profile.fullName}
                        className='h-28 w-28 rounded-full border-4 border-white shadow-md object-cover mb-4'
                    />
                    <button
                        onClick={() => inputRef.current?.click()}
                        className='absolute bottom-4 right-0 bg-primary-500 text-white p-2 rounded-full border-2 border-white shadow-sm hover:bg-primary-600 transition-colors'
                    >
                        <Camera size={16} />
                    </button>
                </div>

                <div className='space-y-1'>
                    <p className='text-sm font-bold text-gray-900'>
                        {selectedFile ? selectedFile.name : 'Upload Avatar'}
                    </p>
                    <p className='text-xs text-gray-400'>
                        PNG, JPG, JPEG (Max 5MB)
                    </p>
                </div>

                <input
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(event) =>
                        setSelectedFile(event.target.files?.[0] ?? null)
                    }
                />

                <div className='mt-6 flex gap-3 w-full'>
                    <Button
                        variant='social'
                        className='flex-1 h-[50px] !border-gray-200'
                        onClick={() => inputRef.current?.click()}
                    >
                        <Upload size={16} />
                        Choose
                    </Button>

                    <Button
                        variant='primary'
                        className='flex-1 h-[50px]'
                        onClick={handleUpload}
                        disabled={isLoading || !selectedFile}
                    >
                        {isLoading ? (
                            <Loader2 className='animate-spin' size={20} />
                        ) : (
                            'Save Photo'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
