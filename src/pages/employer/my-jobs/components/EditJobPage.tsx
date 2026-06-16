import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '../../../../components/ui/RichTextEditor';
import Input from '../../../../components/ui/Input';
import CustomDropdown from '../../../../components/ui/DropDown';
import CustomDatePicker from '../../../../components/ui/DatePicker';
import TagsInput from '../../../../components/ui/TagsInput';
import { useUpdateJob } from '../../../../hooks/useUpdateJob';
import { useIndustries } from '../../../../hooks/useIndustries';
import type { JobDetail } from '../../../../types/jobpost';
import { useJobForEdit } from '../../../../hooks/useJobForEdit';

type UpdateJobMutationFn = (
    variables: { id: string; payload: Record<string, unknown> },
    options?: { onSuccess?: () => void }
) => void;

const roleOptions = [
    { label: 'Designer', value: 'DESIGNER' },
    { label: 'Developer', value: 'DEVELOPER' },
    { label: 'Manager', value: 'MANAGER' },
    { label: 'Marketing', value: 'MARKETING' },
];

const salaryTypeOptions = [
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Yearly', value: 'YEARLY' },
    { label: 'Hourly', value: 'HOURLY' },
];

const educationOptions = [
    { label: 'High School', value: 'HIGH_SCHOOL' },
    { label: 'Associate Degree', value: 'ASSOCIATE' },
    { label: 'Bachelor Degree', value: 'BACHELOR' },
    { label: 'Master Degree', value: 'MASTER' },
    { label: 'Doctorate', value: 'DOCTORATE' },
];

const experienceOptions = [
    { label: 'No Experience', value: '0' },
    { label: '1 Year', value: '1' },
    { label: '2 Years', value: '2' },
    { label: '5+ Years', value: '5' },
];

const jobTypeOptions = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Part Time', value: 'PART_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Contract', value: 'CONTRACT' },
    { label: 'Temporary', value: 'TEMPORARY' },
];

const vacanciesOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '5', value: '5' },
    { label: '10+', value: '10' },
];

const jobLevelOptions = [
    { label: 'Intern', value: 'INTERN' },
    { label: 'Fresher', value: 'FRESHER' },
    { label: 'Junior', value: 'JUNIOR' },
    { label: 'Middle', value: 'MIDDLE' },
    { label: 'Senior', value: 'SENIOR' },
];

interface JobFormInnerProps {
    job: JobDetail;
    id: string;
    isUpdating: boolean;
    industryOptions: Array<{ label: string; value: string }>;
    updateJob: UpdateJobMutationFn;
    handleCancel: () => void;
}

function JobFormInner({
    job,
    id,
    isUpdating,
    industryOptions,
    updateJob,
    handleCancel,
}: JobFormInnerProps) {
    const navigate = useNavigate();

    const parseDate = (dStr: string) => (dStr ? new Date(dStr) : null);
    const formatISO = (date: Date | null) => {
        if (!date) return '';
        return date.toISOString();
    };

    const [formData, setFormData] = useState(() => ({
        title: job.title || '',
        tags: Array.isArray(job.tags) ? job.tags : [],
        industry:
            job.industryIds && job.industryIds.length > 0
                ? String(job.industryIds[0])
                : '',
        role: job.jobRole || 'DEVELOPER',
        minSalary: job.salaryMin ? String(job.salaryMin) : '',
        maxSalary: job.salaryMax ? String(job.salaryMax) : '',
        salaryType: job.salaryType || 'MONTHLY',
        education: job.educationLevel || 'BACHELOR',
        experience: job.experience ? String(job.experience) : '1',
        jobType: job.employmentType || 'FULL_TIME',
        vacancies: job.vacancies ? String(job.vacancies) : '1',
        expirationDate: job.expiresAt || '',
        jobLevel: job.jobLevel || 'MIDDLE',
        description: job.description || '',
        requirements: job.requirements || '',
        location: job.location || '',
    }));

    const handleChange = (field: string, value: string | string[]) => {
        console.log(value) 
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.location ||
            !formData.expirationDate ||
            !formData.description ||
            !formData.tags.length ||
            !formData.industry
        ) {
            console.log(formData.title , formData.location , formData.expirationDate , formData.description , formData.tags.length, formData.industry)
            toast.error('Please fill in all required fields...');
            return;
        }

        const payload: Record<string, unknown> = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            industryIds: [Number(formData.industry)],
            salaryMin: Number(formData.minSalary) || 0,
            salaryMax: Number(formData.maxSalary) || 0,
            educationLevel: formData.education,
            jobLevel: formData.jobLevel,
            status: 'OPEN',
            experience: Number(formData.experience) || 0,
            employmentType: formData.jobType,
            expiresAt: formData.expirationDate,
            isUpdateExpires: true, // THÊM DÒNG NÀY ĐỂ BACKEND CHỊU UPDATE NGÀY HẾT HẠN
            tags: formData.tags,
            isFeatured: false,
            isHighlighted: false,
            jobRole: formData.role,
            requirements: formData.requirements,
            vacancies: Number(formData.vacancies) || 1,
            salaryType: formData.salaryType,
        };

        updateJob(
            { id, payload },
            {
                onSuccess: () => navigate(`/employer/my-jobs/${id}`),
            }
        );
    };

    return (
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('title', e.target.value)
                        }
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-900'>
                        Location *
                    </label>
                    <Input
                        type='text'
                        required
                        placeholder='e.g. Ho Chi Minh City'
                        value={formData.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('location', e.target.value)
                        }
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-900'>
                        Tags / Skills *
                    </label>
                    <TagsInput
                        value={formData.tags}
                        onChange={(newTags) => handleChange('tags', newTags)}
                        placeholder='e.g. React, Nodejs, TypeScript (Press Enter)'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-900'>
                        Job Role
                    </label>
                    <CustomDropdown
                        options={roleOptions}
                        value={formData.role}
                        onChange={(val: string) => handleChange('role', val)}
                    />
                </div>
            </div>

            <div className='mt-4'>
                <h3 className='text-sm font-bold text-gray-900 mb-4'>Salary</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col gap-2'>
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
                                ) => handleChange('minSalary', e.target.value)}
                            />
                            <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium'>
                                USD
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
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
                                ) => handleChange('maxSalary', e.target.value)}
                            />
                            <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium'>
                                USD
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
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
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Education Level
                        </label>
                        <CustomDropdown
                            options={educationOptions}
                            value={formData.education}
                            onChange={(val: string) =>
                                handleChange('education', val)
                            }
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
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
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Employment Type
                        </label>
                        <CustomDropdown
                            options={jobTypeOptions}
                            value={formData.jobType}
                            onChange={(val: string) =>
                                handleChange('jobType', val)
                            }
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Industry *
                        </label>
                        <CustomDropdown
                            options={industryOptions}
                            value={formData.industry}
                            onChange={(val: string) =>
                                handleChange('industry', val)
                            }
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
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
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Expiration Date *
                        </label>
                        <CustomDatePicker
                            placeholder='dd/mm/yyyy'
                            onChange={(date) => {
                                handleChange('expirationDate', formatISO(date));
                            }}
                            selected={parseDate(formData.expirationDate)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
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

            <div className='mt-4 pt-6 border-t border-gray-100'>
                <h3 className='text-sm font-bold text-gray-900 mb-4'>
                    Description & Requirements
                </h3>

                <div className='mb-6 flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-900'>
                        Job Description *
                    </label>
                    <RichTextEditor
                        placeholder='Add your job description...'
                        value={formData.description}
                        onChange={(val) => handleChange('description', val)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-900'>
                        Job Requirements
                    </label>
                    <RichTextEditor
                        placeholder='Add your job requirements...'
                        value={formData.requirements}
                        onChange={(val) => handleChange('requirements', val)}
                    />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-100'>
                <button
                    type='button'
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50'
                >
                    <X size={18} /> Cancel
                </button>
                <button
                    type='submit'
                    disabled={isUpdating}
                    className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 disabled:opacity-50'
                >
                    {isUpdating ? (
                        <Loader2 size={18} className='animate-spin' />
                    ) : (
                        <Save size={18} />
                    )}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default function EditJobPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: industries = [] } = useIndustries();
    const industryOptions = industries.map((ind) => ({
        label: ind.name,
        value: String(ind.id),
    }));

    const {
        data: job,
        isLoading: isFetching,
        isError,
    } = useJobForEdit(id) as {
        data: JobDetail | undefined;
        isLoading: boolean;
        isError: boolean;
    };
    
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob() as {
        mutate: UpdateJobMutationFn;
        isPending: boolean;
    };

    const handleCancel = () => navigate(`/employer/my-jobs/${id}`);

    if (isFetching) {
        return (
            <div className='flex flex-col items-center justify-center min-h-100'>
                <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-4' />
                <p className='text-gray-500 font-medium'>
                    Loading job details...
                </p>
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className='flex flex-col items-center justify-center min-h-100'>
                <p className='text-red-500 font-medium mb-4'>
                    Failed to load job details for editing.
                </p>
                <button
                    onClick={() => navigate('/employer/my-jobs')}
                    className='px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors'
                >
                    Back to My Jobs
                </button>
            </div>
        );
    }

    return (
        <div className='w-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-16'>
            <button
                onClick={handleCancel}
                disabled={isUpdating}
                className='group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6 disabled:opacity-50'
            >
                <ArrowLeft
                    size={16}
                    className='transition-transform group-hover:-translate-x-1'
                />
                Back to Job Details
            </button>

            <div className='mb-8 border-b border-gray-100 pb-4'>
                <h1 className='text-2xl font-bold text-gray-900'>Edit Job</h1>
            </div>

            <JobFormInner
                key={job.id || id}
                job={job}
                id={id || ''}
                isUpdating={isUpdating}
                industryOptions={industryOptions}
                updateJob={updateJob}
                handleCancel={handleCancel}
            />
        </div>
    );
}