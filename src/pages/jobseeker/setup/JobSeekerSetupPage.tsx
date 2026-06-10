import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import useAuth from '../../../contexts/auth/useAuth';
import { getDefaultAuthenticatedRoute } from '../../../contexts/auth/auth-utils';
import { AuthService } from '../../../services/authService';
import { AuthSessionService } from '../../../services/authSessionService';
import { JobseekerService } from '../../../services/jobseekerService';
import { consumePostAuthRedirect } from '../../../utils/post-auth-redirect';

const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/;

const initialValues = {
    fullName: '',
    address: '',
    phone: '',
    professionalTitle: '',
    biography: '',
    dateOfBirth: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    experienceSummary: '',
    educationSummary: '',
    website: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedlnUrl: '',
    secondaryPhone: '',
};

export default function JobSeekerSetupPage() {
    const navigate = useNavigate();
    const { user, refreshAuth } = useAuth();
    const [values, setValues] = useState(initialValues);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canAccessSetup = useMemo(
        () => Array.isArray(user?.roles) && user.roles.includes('SEEKER'),
        [user]
    );

    if (!canAccessSetup) {
        return <Navigate to='/' replace />;
    }

    if (user?.hasProfile) {
        return <Navigate to={getDefaultAuthenticatedRoute(user)} replace />;
    }

    const updateValue = (field: keyof typeof initialValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!values.fullName.trim() || !values.address.trim() || !values.phone.trim()) {
            toast.error('Full name, address, and phone are required.');
            return;
        }

        if (!PHONE_REGEX.test(values.phone.trim())) {
            toast.error('Primary phone must match backend format.');
            return;
        }

        if (values.secondaryPhone.trim() && !PHONE_REGEX.test(values.secondaryPhone.trim())) {
            toast.error('Secondary phone must match backend format.');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', values.fullName.trim());
        formData.append('address', values.address.trim());
        formData.append('phone', values.phone.trim());

        Object.entries(values).forEach(([key, value]) => {
            if (['fullName', 'address', 'phone'].includes(key)) {
                return;
            }
            if (value.trim()) {
                formData.append(key, value.trim());
            }
        });

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            setIsSubmitting(true);
            await JobseekerService.createProfile(formData);
            const refreshedUser = await AuthService.getMe();
            AuthSessionService.saveUser(refreshedUser);
            refreshAuth();
            toast.success('Profile created successfully.');
            navigate(
                consumePostAuthRedirect() ||
                    getDefaultAuthenticatedRoute(refreshedUser),
                { replace: true }
            );
        } catch (error) {
            toast.error((error as Error).message || 'Failed to create profile.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-5xl px-4 py-10 sm:px-6'>
            <div className='rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8'>
                <div className='mb-8 text-left'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Complete Your Job Seeker Profile
                    </h1>
                    <p className='mt-2 text-sm text-gray-500'>
                        You need a completed seeker profile before applying to jobs.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-8'>
                    <div className='grid gap-5 md:grid-cols-2'>
                        <Input
                            label='Full Name *'
                            value={values.fullName}
                            onChange={(event) => updateValue('fullName', event.target.value)}
                        />
                        <Input
                            label='Professional Title'
                            value={values.professionalTitle}
                            onChange={(event) =>
                                updateValue('professionalTitle', event.target.value)
                            }
                        />
                        <Input
                            label='Address *'
                            value={values.address}
                            onChange={(event) => updateValue('address', event.target.value)}
                        />
                        <Input
                            label='Phone *'
                            value={values.phone}
                            onChange={(event) => updateValue('phone', event.target.value)}
                        />
                        <Input
                            label='Secondary Phone'
                            value={values.secondaryPhone}
                            onChange={(event) =>
                                updateValue('secondaryPhone', event.target.value)
                            }
                        />
                        <Input
                            label='Website'
                            value={values.website}
                            onChange={(event) => updateValue('website', event.target.value)}
                        />
                        <Input
                            label='Date Of Birth'
                            type='date'
                            value={values.dateOfBirth}
                            onChange={(event) =>
                                updateValue('dateOfBirth', event.target.value)
                            }
                        />
                        <Input
                            label='Nationality'
                            value={values.nationality}
                            onChange={(event) =>
                                updateValue('nationality', event.target.value)
                            }
                        />
                        <Input
                            label='Gender'
                            value={values.gender}
                            onChange={(event) => updateValue('gender', event.target.value)}
                        />
                        <Input
                            label='Marital Status'
                            value={values.maritalStatus}
                            onChange={(event) =>
                                updateValue('maritalStatus', event.target.value)
                            }
                        />
                        <Input
                            label='Facebook URL'
                            value={values.facebookUrl}
                            onChange={(event) =>
                                updateValue('facebookUrl', event.target.value)
                            }
                        />
                        <Input
                            label='Twitter URL'
                            value={values.twitterUrl}
                            onChange={(event) =>
                                updateValue('twitterUrl', event.target.value)
                            }
                        />
                        <Input
                            label='LinkedIn URL'
                            value={values.linkedlnUrl}
                            onChange={(event) =>
                                updateValue('linkedlnUrl', event.target.value)
                            }
                        />
                        <label className='flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500 transition hover:border-primary-400 hover:bg-primary-50'>
                            <Upload className='mb-3 h-6 w-6 text-primary-500' />
                            <span className='font-medium text-gray-900'>
                                {avatarFile ? avatarFile.name : 'Upload avatar'}
                            </span>
                            <span className='mt-1 text-xs'>Optional image file</span>
                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={(event) =>
                                    setAvatarFile(event.target.files?.[0] ?? null)
                                }
                            />
                        </label>
                    </div>

                    <div className='grid gap-5'>
                        <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                            Biography
                            <textarea
                                value={values.biography}
                                onChange={(event) =>
                                    updateValue('biography', event.target.value)
                                }
                                rows={4}
                                className='rounded-md border border-gray-100 bg-bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-500'
                            />
                        </label>
                        <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                            Experience Summary
                            <textarea
                                value={values.experienceSummary}
                                onChange={(event) =>
                                    updateValue('experienceSummary', event.target.value)
                                }
                                rows={4}
                                className='rounded-md border border-gray-100 bg-bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-500'
                            />
                        </label>
                        <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                            Education Summary
                            <textarea
                                value={values.educationSummary}
                                onChange={(event) =>
                                    updateValue('educationSummary', event.target.value)
                                }
                                rows={4}
                                className='rounded-md border border-gray-100 bg-bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-500'
                            />
                        </label>
                    </div>

                    <Button variant='primary' className='px-8' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className='animate-spin' size={18} />
                        ) : (
                            'Create Profile'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
