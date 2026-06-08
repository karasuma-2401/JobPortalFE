import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../../../../components/ui/Button';
import { JobseekerService } from '../../../../../services/jobseekerService';
import type { JobSeekerProfile } from '../../../../../types/jobseeker';

interface ProfileTabProps {
    profile: JobSeekerProfile;
    onUpdated: () => Promise<void>;
}

export default function ProfileTab({ profile, onUpdated }: ProfileTabProps) {
    const [values, setValues] = useState({
        nationality: profile.nationality || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        maritalStatus: profile.maritalStatus || '',
        biography: profile.biography || '',
        educationSummary: profile.educationSummary || '',
        experienceSummary: profile.experienceSummary || '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setValues({
            nationality: profile.nationality || '',
            dateOfBirth: profile.dateOfBirth || '',
            gender: profile.gender || '',
            maritalStatus: profile.maritalStatus || '',
            biography: profile.biography || '',
            educationSummary: profile.educationSummary || '',
            experienceSummary: profile.experienceSummary || '',
        });
    }, [profile]);

    const updateValue = (field: keyof typeof values, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    };

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
            toast.success('Profile information updated.');
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSave} className='space-y-8 text-left'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                    Nationality
                    <input
                        value={values.nationality}
                        onChange={(event) =>
                            updateValue('nationality', event.target.value)
                        }
                        className='rounded-lg border border-gray-100 px-3 py-3 outline-none focus:border-primary-400'
                    />
                </label>
                <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                    Date of Birth
                    <input
                        type='date'
                        value={values.dateOfBirth}
                        onChange={(event) =>
                            updateValue('dateOfBirth', event.target.value)
                        }
                        className='rounded-lg border border-gray-100 px-3 py-3 outline-none focus:border-primary-400'
                    />
                </label>
                <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                    Gender
                    <input
                        value={values.gender}
                        onChange={(event) => updateValue('gender', event.target.value)}
                        className='rounded-lg border border-gray-100 px-3 py-3 outline-none focus:border-primary-400'
                    />
                </label>
                <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                    Marital Status
                    <input
                        value={values.maritalStatus}
                        onChange={(event) =>
                            updateValue('maritalStatus', event.target.value)
                        }
                        className='rounded-lg border border-gray-100 px-3 py-3 outline-none focus:border-primary-400'
                    />
                </label>
            </div>

            <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                Biography
                <textarea
                    value={values.biography}
                    onChange={(event) => updateValue('biography', event.target.value)}
                    rows={5}
                    className='min-h-[160px] rounded-lg border border-gray-100 p-4 outline-none focus:border-primary-400'
                />
            </label>

            <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                Experience Summary
                <textarea
                    value={values.experienceSummary}
                    onChange={(event) =>
                        updateValue('experienceSummary', event.target.value)
                    }
                    rows={5}
                    className='min-h-[160px] rounded-lg border border-gray-100 p-4 outline-none focus:border-primary-400'
                />
            </label>

            <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                Education Summary
                <textarea
                    value={values.educationSummary}
                    onChange={(event) =>
                        updateValue('educationSummary', event.target.value)
                    }
                    rows={5}
                    className='min-h-[160px] rounded-lg border border-gray-100 p-4 outline-none focus:border-primary-400'
                />
            </label>

            <div className='pt-4'>
                <Button variant='primary' className='px-10' disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={22} />
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </form>
    );
}
