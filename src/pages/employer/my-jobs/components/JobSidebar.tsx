<<<<<<< HEAD
import { Users, TrendingUp } from 'lucide-react';
=======
import { Users, Eye } from 'lucide-react';
>>>>>>> 2b40f7ee0efb7bb1452c559ef226fafc4a3b7498

interface JobSidebarProps {
    applications: number;
    skills: string[];
    onViewApplications: () => void;
    // onPromote: () => void;
}

export default function JobSidebar({
    applications,
    skills,
    onViewApplications,
    // onPromote,
}: JobSidebarProps) {
    return (
        <div className='lg:col-span-1 flex flex-col gap-6'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                <h3 className='text-base font-bold text-gray-900 mb-6'>
                    Job Overview
                </h3>
                <div className='flex flex-col gap-6 mb-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 text-gray-500'>
                            <div className='w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center'>
                                <Users size={18} />
                            </div>
                            <span className='font-medium'>Applications</span>
                        </div>
                        <span className='font-bold text-gray-900'>
                            {applications}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onViewApplications}
                    className='w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-colors'
                >
                    View All Applications
                </button>
            </div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                <h3 className='text-base font-bold text-gray-900 mb-4'>
                    Required Skills
                </h3>
                <div className='flex flex-wrap gap-2'>
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className='px-3 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg border border-gray-200'
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* <div className='bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-md p-6 text-white relative overflow-hidden'>
                <div className='relative z-10'>
                    <div className='w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm mb-4'>
                        <TrendingUp size={24} className='text-white' />
                    </div>
                    <h3 className='text-lg font-bold mb-2'>
                        Want more applicants?
                    </h3>
                    <p className='text-blue-100 text-sm mb-6 leading-relaxed'>
                        Promote this job to reach up to 5x more qualified
                        candidates in your area.
                    </p>
                    <button
                        onClick={onPromote}
                        className='w-full py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm'
                    >
                        Promote Job Now
                    </button>
                </div>
                <div className='absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl'></div>
                <div className='absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl'></div>
            </div> */}
        </div>
    );
}
