import { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
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

            // Đồng bộ avatar vào AuthContext (CandidateTopbar đọc từ user.avatar)
            const meResponse = await AuthService.getMe();
            AuthSessionService.saveUser(meResponse);

            refreshAuth();

            toast.success('Profile picture updated.');
            setSelectedFile(null);
        } catch (error) {
            toast.error((error as Error).message || 'Failed to upload avatar.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h3 className='mb-6 text-left text-sm font-semibold text-gray-900'>
                Basic Information
            </h3>
            <div className='mb-3 text-left text-xs font-medium uppercase text-gray-500'>
                Profile Picture
            </div>
            <div className='rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/20 p-8 text-center'>
                <img
                    src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.fullName || 'Candidate'}&background=eff6ff&color=2563eb`}
                    alt={profile.fullName}
                    className='mx-auto mb-4 h-24 w-24 rounded-full border border-gray-100 object-cover'
                />
                <p className='text-sm font-medium text-gray-900'>
                    {selectedFile ? selectedFile.name : 'Browse photo or drop here'}
                </p>
                <p className='mt-2 text-[11px] text-gray-400'>
                    A photo larger than 400 pixels works best.
                </p>
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(event) =>
                        setSelectedFile(event.target.files?.[0] ?? null)
                    }
                />
                <div className='mt-5 flex gap-3'>
                    <Button
                        variant='social'
                        className='flex-1'
                        onClick={() => inputRef.current?.click()}
                    >
                        <Upload size={16} />
                        Choose Photo
                    </Button>
                    <Button
                        variant='primary'
                        className='flex-1'
                        onClick={handleUpload}
                        disabled={isLoading || !selectedFile}
                    >
                        {isLoading ? (
                            <Loader2 className='animate-spin' size={18} />
                        ) : (
                            'Save Photo'
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
