import { Bell, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import useAuth from '../../contexts/auth/useAuth';
import { getDefaultAuthenticatedRoute } from '../../contexts/auth/auth-utils';
import { useJobseekerProfile } from '../../hooks/useJobseeker';

export default function CandidateTopBar() {
    const location = useLocation();

    const { user } = useAuth();
    const { data: profile } = useJobseekerProfile();

    const avatarUrl = `${
        profile?.avatar ||
        user?.avatar ||
        `https://ui-avatars.com/api/?name=${profile?.fullName || user?.name || user?.displayName || 'Candidate'}&background=eff6ff&color=2563eb`
    }`;

    const topNavItems = [
        { label: 'Home', path: '/jobseeker/home' },
        { label: 'Find Job', path: '/jobseeker/find-job' },
        { label: 'Find Employers', path: '/jobseeker/find-employers' },
    ];

    return (
        <header className='w-full flex flex-col shrink-0 sticky top-0 z-50 shadow-sm font-sans'>
            <div className='w-full bg-gray-50 border-b border-gray-100 px-8 flex items-center justify-between text-[14px]'>
                <nav className='flex items-center gap-6 h-[46px]'>
                    {topNavItems.map((item) => {
                        const isActive =
                            item.path === '/'
                                ? location.pathname === '/' || location.pathname === '/home'
                                : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`h-full flex items-center transition-colors ${
                                    isActive
                                        ? 'text-primary-500 border-b-2 border-primary-500 font-medium'
                                        : 'text-gray-500 hover:text-primary-500'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className='flex items-center gap-6 text-gray-600'></div>
            </div>

            <div className='w-full bg-white h-20 px-8 flex items-center justify-between border-b border-b-gray-100'>
                <Logo className='flex items-center gap-2 text-2xl font-bold text-gray-900' />
                
                <div className='flex items-center border border-gray-200 rounded-lg p-1.5 w-[650px] focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all bg-white shadow-sm'>
                    <div className='flex items-center gap-3 flex-1 px-2'>
                        <Search
                            size={20}
                            className='text-primary-500 shrink-0'
                        />
                        <input
                            type='text'
                            placeholder='Job title, keyword, company'
                            className='w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent'
                        />
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <button className='relative p-2 text-gray-600 hover:text-gray-900 transition-colors'>
                        <Bell size={24} />
                        <span className='absolute top-1.5 right-2 w-2.5 h-2.5 bg-danger-500 border-2 border-white rounded-full' />
                    </button>

                    <Link
                        to={getDefaultAuthenticatedRoute(user)}
                        className='rounded-full hover:ring-2 ring-primary-500/20 transition-all cursor-pointer'
                    >
                       
                        <img
                            src={avatarUrl}
                            alt={`${user?.displayName || user?.name || 'User avatar'}`}
                            className='w-10 h-10 rounded-full object-cover border border-gray-100'
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}