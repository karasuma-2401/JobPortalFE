import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ApplyJobType from './components/ApplyJobType';
import RichTextEditor from '../../../components/ui/RichTextEditor';
import PostSuccessModal from './components/PostSuccessModal';
import Input from '../../../components/ui/Input';
import CustomDropdown from '../../../components/ui/DropDown';
import CustomDatePicker from '../../../components/ui/DatePicker';
import { useCreateJob } from '../../../hooks/useCreateJob';

const roleOptions = [
    { label: 'Designer', value: 'DESIGNER' },
    { label: 'Developer', value: 'DEVELOPER' },
    { label: 'Manager', value: 'MANAGER' },
];

const salaryTypeOptions = [
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Yearly', value: 'YEARLY' },
    { label: 'Hourly', value: 'HOURLY' },
];

const educationOptions = [
    { label: 'Bachelor Degree', value: 'BACHELOR' },
    { label: 'Master Degree', value: 'MASTER' },
    { label: 'Associate Degree', value: 'ASSOCIATE' },
];

const experienceOptions = [
    { label: '1 Year', value: '1' },
    { label: '2 Years', value: '2' },
    { label: '5+ Years', value: '5' },
];

const jobTypeOptions = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Part Time', value: 'PART_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Contract', value: 'CONTRACT' },
];

const vacanciesOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '5+', value: '5' },
];

const jobLevelOptions = [
    { label: 'Intern', value: 'INTERN' },
    { label: 'Junior', value: 'JUNIOR' },
    { label: 'Middle', value: 'MIDDLE' },
    { label: 'Senior', value: 'SENIOR' },
];

export default function CreateJobForm() {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const { mutate: createJob, isPending } = useCreateJob();

    const [formData, setFormData] = useState({
        title: '',
        tags: '',
        role: 'DEVELOPER',
        minSalary: '',
        maxSalary: '',
        salaryType: 'MONTHLY',
        education: 'BACHELOR',
        experience: '1',
        jobType: 'FULL_TIME',
        vacancies: '1',
        expirationDate: '',
        jobLevel: 'MIDDLE',
        applyType: 'myjob',
        description: '',
        responsibilities: '',
        location: '',
    });

    const parseDate = (dStr: string) => (dStr ? new Date(dStr) : null);
    const formatISO = (date: Date | null) => {
        if (!date) return '';
        return date.toISOString();
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.location || !formData.expirationDate) {
            toast.error(
                'Please fill in all required fields (Title, Location, Expiration Date).'
            );
            return;
        }

        const payload: Record<string, unknown> = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            industryIds: [1], 
            salaryMin: Number(formData.minSalary) || 0,
            salaryMax: Number(formData.maxSalary) || 0,
            educationLevel: formData.education,
            jobLevel: formData.jobLevel,
            status: 'OPEN', 
            experience: Number(formData.experience) || 0,
            employmentType: formData.jobType,
            expiresAt: formData.expirationDate,
            tags: formData.tags,
            isFeatured: false,
            isHighlighted: false,
            jobRole: formData.role,
            responsibilities: formData.responsibilities,
            vacancies: Number(formData.vacancies) || 1,
            salaryType: formData.salaryType,
        };

        createJob(payload, {
            onSuccess: () => {
                setIsSuccessModalOpen(true);
            },
        });
    };

    return (
        <div className='w-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-16'>
            <div className='mb-8 border-b border-gray-100 pb-4'>
                <h1 className='text-2xl font-bold text-gray-900'>Post a job</h1>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Job Title *
                        </label>
                        <Input
                            type='text'
                            required
                            placeholder='Add job title, role, vacancies etc'
                            value={formData.title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Location *
                        </label>
                        <Input
                            type='text'
                            required
                            placeholder='e.g. Ho Chi Minh City'
                            value={formData.location}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange('location', e.target.value)}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Tags / Skills
                        </label>
                        <Input
                            type='text'
                            placeholder='Job keyword, tags etc...'
                            value={formData.tags}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange('tags', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Job Role
                        </label>
                        <CustomDropdown
                            options={roleOptions}
                            value={formData.role}
                            onChange={(val: string) =>
                                handleChange('role', val)
                            }
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <h3 className='text-sm font-bold text-gray-900 mb-4'>
                        Salary
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Min Salary
                            </label>
                            <div className='relative'>
                                <Input
                                    type='number'
                                    placeholder='Minimum salary...'
                                    value={formData.minSalary}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChange(
                                            'minSalary',
                                            e.target.value
                                        )
                                    }
                                />
                                <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium'>
                                    USD
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Max Salary
                            </label>
                            <div className='relative'>
                                <Input
                                    type='number'
                                    placeholder='Maximum salary...'
                                    value={formData.maxSalary}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChange(
                                            'maxSalary',
                                            e.target.value
                                        )
                                    }
                                />
                                <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium'>
                                    USD
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Salary Type
                            </label>
                            <CustomDropdown
                                options={salaryTypeOptions}
                                value={formData.salaryType}
                                onChange={(val: string) =>
                                    handleChange('salaryType', val)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <h3 className='text-sm font-bold text-gray-900 mb-4'>
                        Advance Information
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-6'>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Education
                            </label>
                            <CustomDropdown
                                options={educationOptions}
                                value={formData.education}
                                onChange={(val: string) =>
                                    handleChange('education', val)
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Experience
                            </label>
                            <CustomDropdown
                                options={experienceOptions}
                                value={formData.experience}
                                onChange={(val: string) =>
                                    handleChange('experience', val)
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Job Type
                            </label>
                            <CustomDropdown
                                options={jobTypeOptions}
                                value={formData.jobType}
                                onChange={(val: string) =>
                                    handleChange('jobType', val)
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Vacancies
                            </label>
                            <CustomDropdown
                                options={vacanciesOptions}
                                value={formData.vacancies}
                                onChange={(val: string) =>
                                    handleChange('vacancies', val)
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Expiration Date *
                            </label>
                            <CustomDatePicker
                                placeholder='dd/mm/yyyy'
                                onChange={(date) => {
                                    handleChange(
                                        'expirationDate',
                                        formatISO(date)
                                    );
                                }}
                                selected={parseDate(formData.expirationDate)}
                            />
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label className='text-sm font-medium text-gray-700'>
                                Job Level
                            </label>
                            <CustomDropdown
                                options={jobLevelOptions}
                                value={formData.jobLevel}
                                onChange={(val: string) =>
                                    handleChange('jobLevel', val)
                                }
                            />
                        </div>
                    </div>
                </div>

                <ApplyJobType
                    value={formData.applyType}
                    onChange={(val) => handleChange('applyType', val)}
                />

                <div className='mt-4 pt-6 border-t border-gray-100'>
                    <h3 className='text-sm font-bold text-gray-900 mb-4'>
                        Description & Responsibility
                    </h3>

                    <div className='mb-6 flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Description
                        </label>
                        <RichTextEditor
                            placeholder='Add your job description...'
                            value={formData.description}
                            onChange={(val) => handleChange('description', val)}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold text-gray-900'>
                            Responsibilities
                        </label>
                        <RichTextEditor
                            placeholder='Add your job responsibilities...'
                            value={formData.responsibilities}
                            onChange={(val) =>
                                handleChange('responsibilities', val)
                            }
                        />
                    </div>
                </div>

                <div className='mt-2'>
                    <button
                        type='submit'
                        disabled={isPending}
                        className='flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50'
                    >
                        {isPending && (
                            <Loader2 size={18} className='animate-spin' />
                        )}
                        Post Job <ArrowRight size={18} />
                    </button>
                </div>
            </form>

            <PostSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                jobTitle={formData.title || 'UI/UX Designer'}
            />
        </div>
    );
}
