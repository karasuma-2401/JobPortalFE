import { Bell, Search, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

export default function CandidateTopBar() {
    const location = useLocation();

    const topNavItems = [
        { label: 'Home', path: '/' },
        { label: 'Find Job', path: '/find-job' },
        { label: 'Find Employers', path: '/employers' },
        // { label: "Dashboard", path: "/candidate/overview" },
        // { label: "Job Alerts", path: "/job-alerts" },
        // { label: "Customer Supports", path: "/support" },
    ];

    return (
        <header className='w-full flex flex-col shrink-0 sticky top-0 z-50 shadow-sm font-sans'>
            <div className='w-full bg-gray-50 border-b border-gray-100 px-8 flex items-center justify-between text-[14px]'>
                <nav className='flex items-center gap-6 h-[46px]'>
                    {topNavItems.map((item) => {
                        const isActive =
                            item.path === '/'
                                ? location.pathname === '/' ||
                                  location.pathname === '/home'
                                : item.label === 'Dashboard'
                                  ? location.pathname.startsWith('/candidate') // Sáng Dashboard cho TẤT CẢ các trang có /candidate (bao gồm cả job alert của sidebar)
                                  : location.pathname.startsWith(item.path); // Trang nào khớp URL trang đó (Ví dụ /job-alerts thì chỉ Job Alerts sáng)

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

                <div className='flex items-center gap-6 text-gray-600'>
                    <div className='flex items-center gap-2'>
                        <Phone size={16} />
                        <span className='font-medium'>+1-202-555-0178</span>
                    </div>
                </div>
            </div>

            <div className='w-full bg-white h-20 px-8 flex items-center justify-between border-b border-b-gray-100'>
                {/* Logo */}
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

                    <button className='rounded-full hover:ring-2 ring-primary-500/20 transition-all cursor-pointer'>
                        <img
                            src='https://i.pravatar.cc/150?img=11'
                            alt='User avatar'
                            className='w-10 h-10 rounded-full object-cover border border-gray-100'
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
