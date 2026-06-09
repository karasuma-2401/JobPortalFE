import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';
import { useJobDetail } from '../../../../hooks/useJobDetail';
import { useUpdateJob } from '../../../../hooks/useUpdateJob';
import type { JobDetail } from '../../../../types/jobPost';

type UpdateJobMutationFn = (
    variables: { id: string; payload: Record<string, unknown> },
    options?: { onSuccess?: () => void }
) => void;

interface JobFormInnerProps {
    job: JobDetail;
    id: string;
    isUpdating: boolean;
    updateJob: UpdateJobMutationFn;
    handleCancel: () => void;
}
function JobFormInner({
    job,
    id,
    isUpdating,
    updateJob,
    handleCancel,
}: JobFormInnerProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => ({
        title: job.title || '',
        employmentType: job.employmentType || 'FULL_TIME',
        location: job.location || '',
        salaryMin: job.salaryMin || 0,
        salaryMax: job.salaryMax || 0,
        experience: job.experience || 0,
        description: job.description || '',
        requirements: job.requirements || '',
        benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : '',
        skills: Array.isArray(job.skills) ? job.skills.join(', ') : '',
    }));

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        if (
            name === 'salaryMin' ||
            name === 'salaryMax' ||
            name === 'experience'
        ) {
            setFormData((prev) => ({
                ...prev,
                [name]: value === '' ? 0 : Number(value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: Record<string, unknown> = {
            ...formData,
            benefits: formData.benefits
                .split('\n')
                .map((item) => item.trim())
                .filter((item) => item !== ''),
            skills: formData.skills
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item !== ''),
            educationLevel: 'BACHELOR',
            jobLevel: 'MIDDLE',
            status: 'OPEN',
        };

        updateJob(
            { id, payload },
            {
                onSuccess: () => navigate(`/employer/my-jobs/${id}`),
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8'
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Job Title
                    </label>
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Employment Type
                    </label>
                    <select
                        name='employmentType'
                        value={formData.employmentType}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-gray-900'
                    >
                        <option value='FULL_TIME'>Full Time</option>
                        <option value='PART_TIME'>Part Time</option>
                        <option value='INTERNSHIP'>Internship</option>
                        <option value='CONTRACT'>Contract</option>
                        <option value='TEMPORARY'>Temporary</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Location
                    </label>
                    <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Min Salary (USD)
                    </label>
                    <input
                        type='number'
                        name='salaryMin'
                        min='0'
                        value={formData.salaryMin}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Max Salary (USD)
                    </label>
                    <input
                        type='number'
                        name='salaryMax'
                        min='0'
                        value={formData.salaryMax}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Experience Required (Years)
                    </label>
                    <input
                        type='number'
                        name='experience'
                        min='0'
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Required Skills (Comma separated)
                    </label>
                    <input
                        type='text'
                        name='skills'
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder='e.g. React, Node.js, TypeScript'
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Job Description
                    </label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-gray-600 leading-relaxed'
                    />
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Requirements (One per line)
                    </label>
                    <textarea
                        name='requirements'
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={5}
                        required
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-gray-600 leading-relaxed'
                    />
                </div>
                <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm font-bold text-gray-900'>
                        Benefits (One per line)
                    </label>
                    <textarea
                        name='benefits'
                        value={formData.benefits}
                        onChange={handleChange}
                        rows={4}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-gray-600 leading-relaxed'
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
    const {
        data: job,
        isLoading: isFetching,
        isError,
    } = useJobDetail(id) as {
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
        <div className='w-full max-w-4xl mx-auto animate-in fade-in duration-500 pb-16'>
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

            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    Edit Job Posting
                </h1>
                <p className='text-gray-500'>
                    Update the information for this job listing.
                </p>
            </div>
            <JobFormInner
                job={job}
                id={id || ''}
                isUpdating={isUpdating}
                updateJob={updateJob}
                handleCancel={handleCancel}
            />
        </div>
    );
}
