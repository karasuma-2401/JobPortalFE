import { useState } from 'react';
import AppliedJobItem, { type AppliedJobItemProps } from './AppliedJobItem';
import DashboardPagination from '../../../../components/ui/DashboardPagination';

const mockAppliedJobs: Omit<AppliedJobItemProps, 'isSelected' | 'onSelect'>[] =
    [
        {
            id: '1',
            logo: 'https://logo.clearbit.com/upwork.com',
            role: 'Networking Engineer',
            type: 'Remote',
            location: 'Washington',
            salary: '$50k-80k/month',
            dateApplied: 'Feb 2, 2019 19:28',
            status: 'Active',
        },
        {
            id: '2',
            logo: 'https://logo.clearbit.com/dribbble.com',
            role: 'Product Designer',
            type: 'Full Time',
            location: 'Dhaka',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 7, 2019 23:26',
            status: 'Active',
        },
        {
            id: '3',
            logo: 'https://logo.clearbit.com/apple.com',
            role: 'Junior Graphic Designer',
            type: 'Temporary',
            location: 'Brazil',
            salary: '$50k-80k/month',
            dateApplied: 'Feb 2, 2019 19:28',
            status: 'Active',
        },
        {
            id: '4',
            logo: 'https://logo.clearbit.com/microsoft.com',
            role: 'Visual Designer',
            type: 'Contract Base',
            location: 'Wisconsin',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 7, 2019 23:26',
            status: 'Active',
        },
        {
            id: '5',
            logo: 'https://logo.clearbit.com/twitter.com',
            role: 'Marketing Officer',
            type: 'Full Time',
            location: 'United States',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 4, 2019 21:42',
            status: 'Active',
        },
        {
            id: '6',
            logo: 'https://logo.clearbit.com/facebook.com',
            role: 'UI/UX Designer',
            type: 'Full Time',
            location: 'North Dakota',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 30, 2019 07:52',
            status: 'Active',
        },
        {
            id: '7',
            logo: 'https://logo.clearbit.com/slack.com',
            role: 'Software Engineer',
            type: 'Full Time',
            location: 'New York',
            salary: '$50k-80k/month',
            dateApplied: 'Dec 30, 2019 05:18',
            status: 'Active',
        },
        {
            id: '8',
            logo: 'https://logo.clearbit.com/reddit.com',
            role: 'Front End Developer',
            type: 'Full Time',
            location: 'Michigan',
            salary: '$50k-80k/month',
            dateApplied: 'Mar 20, 2019 23:14',
            status: 'Active',
        },
    ];

export default function AppliedJobsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='space-y-6 text-left animate-fade-in pb-8'>
            <div className='flex items-center gap-2 pb-2'>
                <h1 className='text-[18px] font-bold text-gray-900'>
                    Applied Jobs
                </h1>
                <span className='text-[15px] font-medium text-gray-400'>
                    (589)
                </span>
            </div>

            <div className='space-y-4'>
                <div className='flex items-center px-6 py-3.5 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 tracking-wider'>
                    <div className='flex-1'>JOBS</div>
                    <div className='w-[180px]'>DATE APPLIED</div>
                    <div className='w-[120px]'>STATUS</div>
                    <div className='w-[140px] text-center'>ACTION</div>
                </div>

                <div className='flex flex-col gap-3'>
                    {mockAppliedJobs.map((job) => (
                        <AppliedJobItem
                            key={job.id}
                            {...job}
                            isSelected={selectedJobId === job.id}
                            onSelect={() => setSelectedJobId(job.id)}
                        />
                    ))}
                </div>
            </div>

            <DashboardPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
