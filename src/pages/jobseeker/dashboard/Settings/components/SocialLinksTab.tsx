import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';
import { JobseekerService } from '../../../../../services/jobseekerService';
import type { JobSeekerProfile } from '../../../../../types/jobseeker';

interface SocialLinksTabProps {
    profile: JobSeekerProfile;
    onUpdated: () => Promise<void>;
}

export default function SocialLinksTab({
    profile,
    onUpdated,
}: SocialLinksTabProps) {
    const [values, setValues] = useState({
        facebookUrl: profile.facebookUrl || '',
        twitterUrl: profile.twitterUrl || '',
        linkedlnUrl: profile.linkedlnUrl || '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setValues({
            facebookUrl: profile.facebookUrl || '',
            twitterUrl: profile.twitterUrl || '',
            linkedlnUrl: profile.linkedlnUrl || '',
        });
    }, [profile]);

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value.trim()) {
                formData.append(key, value.trim());
            }
        });

        try {
            setIsLoading(true);
            await JobseekerService.updateProfile(formData);
            await onUpdated();
            toast.success('Social links updated successfully.');
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update social links.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full animate-in bg-white text-left fade-in duration-500'>
            <form onSubmit={handleSave} className='flex flex-col gap-6'>
                <Input
                    label='Facebook URL'
                    type='url'
                    value={values.facebookUrl}
                    onChange={(event) =>
                        setValues((current) => ({
                            ...current,
                            facebookUrl: event.target.value,
                        }))
                    }
                />
                <Input
                    label='Twitter URL'
                    type='url'
                    value={values.twitterUrl}
                    onChange={(event) =>
                        setValues((current) => ({
                            ...current,
                            twitterUrl: event.target.value,
                        }))
                    }
                />
                <Input
                    label='LinkedIn URL'
                    type='url'
                    value={values.linkedlnUrl}
                    onChange={(event) =>
                        setValues((current) => ({
                            ...current,
                            linkedlnUrl: event.target.value,
                        }))
                    }
                />

                <div className='pt-4'>
                    <Button
                        variant='primary'
                        type='submit'
                        className='h-[50px] px-10'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className='animate-spin' size={20} />
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
