import { useEffect, useState } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { JobSeekerProfile } from '../../../../../types/jobseeker';
import { JobseekerService } from '../../../../../services/jobseekerService';
import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';

interface BasicInfoFormProps {
    profile: JobSeekerProfile;
    onUpdated: () => Promise<void>;
}

export default function BasicInfoForm({
    profile,
    onUpdated,
}: BasicInfoFormProps) {
    const [fullName, setFullName] = useState(profile.fullName);
    const [professionalTitle, setProfessionalTitle] = useState(
        profile.professionalTitle || ''
    );
    const [address, setAddress] = useState(profile.address);
    const [website, setWebsite] = useState(profile.website || '');
    const [secondaryPhone, setSecondaryPhone] = useState(
        profile.secondaryPhone || ''
    );
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFullName(profile.fullName);
        setProfessionalTitle(profile.professionalTitle || '');
        setAddress(profile.address);
        setWebsite(profile.website || '');
        setSecondaryPhone(profile.secondaryPhone || '');
    }, [profile]);

    const handleSaveChanges = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!fullName.trim() || !address.trim()) {
            toast.error('Full name and address are required.');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', fullName.trim());
        formData.append('address', address.trim());

        if (professionalTitle.trim()) {
            formData.append('professionalTitle', professionalTitle.trim());
        }
        if (website.trim()) {
            formData.append('website', website.trim());
        }
        if (secondaryPhone.trim()) {
            formData.append('secondaryPhone', secondaryPhone.trim());
        }

        try {
            setIsLoading(true);
            await JobseekerService.updateProfile(formData);
            await onUpdated();
            toast.success('Basic profile updated successfully.');
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSaveChanges} className='space-y-5'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                <Input
                    label='Full Name'
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                />
                <Input
                    label='Professional Title'
                    value={professionalTitle}
                    onChange={(event) =>
                        setProfessionalTitle(event.target.value)
                    }
                />
                <Input
                    label='Address'
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <Input label='Primary Phone' value={profile.phone} readOnly />
                <Input
                    label='Secondary Phone'
                    value={secondaryPhone}
                    onChange={(event) => setSecondaryPhone(event.target.value)}
                />
                <Input label='Email' value={profile.email} readOnly />
            </div>

            <div className='flex flex-col gap-2 text-left'>
                <label className='text-sm font-medium text-gray-700'>
                    Personal Website
                </label>
                <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 text-primary-500'>
                        <Globe size={18} />
                    </div>
                    <Input
                        type='text'
                        placeholder='Website url...'
                        className='pl-10'
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                    />
                </div>
            </div>

            <div className='text-left pt-2'>
                <Button variant='primary' className='px-8' disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={20} />
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </div>
        </form>
    );
}
