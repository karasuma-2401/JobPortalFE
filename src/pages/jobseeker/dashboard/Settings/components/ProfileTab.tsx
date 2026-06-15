import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../../../../components/ui/Button';
import Input from '../../../../../components/ui/Input';
import RichTextEditor from '../../../../../components/ui/RichTextEditor'; // 🌟 Import component của bạn
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
            toast.success('Profile information updated successfully.');
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to update profile.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSave}
            className='space-y-8 text-left animate-in fade-in duration-500'
        >
            <h3 className='text-base font-bold text-gray-900'>
                Personal Details
            </h3>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Input
                    label='Nationality'
                    value={values.nationality}
                    onChange={(e) => updateValue('nationality', e.target.value)}
                />
                <Input
                    label='Date of Birth'
                    type='date'
                    value={values.dateOfBirth}
                    onChange={(e) => updateValue('dateOfBirth', e.target.value)}
                />
                <Input
                    label='Gender'
                    value={values.gender}
                    onChange={(e) => updateValue('gender', e.target.value)}
                />
                <Input
                    label='Marital Status'
                    value={values.maritalStatus}
                    onChange={(e) =>
                        updateValue('maritalStatus', e.target.value)
                    }
                />
            </div>

            <div className='space-y-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Biography
                    </label>
                    <RichTextEditor
                        value={values.biography}
                        onChange={(val) => updateValue('biography', val)}
                        placeholder='Tell us about yourself...'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Experience Summary
                    </label>
                    <RichTextEditor
                        value={values.experienceSummary}
                        onChange={(val) =>
                            updateValue('experienceSummary', val)
                        }
                        placeholder='Summarize your work experience...'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Education Summary
                    </label>
                    <RichTextEditor
                        value={values.educationSummary}
                        onChange={(val) => updateValue('educationSummary', val)}
                        placeholder='Summarize your education...'
                    />
                </div>
            </div>

            <div className='pt-4'>
                <Button
                    variant='primary'
                    className='px-10 h-[50px]'
                    disabled={isLoading}
                >
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
