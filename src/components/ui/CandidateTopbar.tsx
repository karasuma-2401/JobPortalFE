import { useJobseekerProfile } from '../../hooks/useJobseeker';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';

import Logo from '../Logo';
import NotificationBell from './NotificationBell'; 
import useAuth from '../../contexts/auth/useAuth';


const topNavItems = [
    { label: 'Home', path: '/jobseeker/home' },
    { label: 'Find Job', path: '/jobseeker/find-job' },
    { label: 'Find Employers', path: '/jobseeker/find-employers' },
];

export default function CandidateTopBar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const { user, logout } = useAuth();
    const { data: profile } = useJobseekerProfile();

    const [navKeyword, setNavKeyword] = useState('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (navKeyword.trim()) {
            navigate(`/jobseeker/find-job?keyword=${encodeURIComponent(navKeyword.trim())}`);
            setNavKeyword(''); 
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully!');
        navigate('/login', { replace: true });
    };

    const avatarUrl = `${
        profile?.avatar ||
        user?.avatar ||
        `https://ui-avatars.com/api/?name=${profile?.fullName || user?.name || user?.displayName || 'Candidate'}&background=eff6ff&color=2563eb`
    }`;

    return (
        <header className='w-full flex flex-col shrink-0 sticky top-0 z-50 shadow-sm font-sans bg-white'>
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
                <form 
                    onSubmit={handleNavSearchSubmit} 
                    className='flex items-center border border-gray-200 rounded-lg p-1.5 w-[650px] focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all bg-white shadow-sm'
                >
                    <div className='flex items-center gap-3 flex-1 px-2'>
                        <Search
                            size={20}
                            className='text-primary-500 shrink-0'
                        />
                        <input
                            type='text'
                            placeholder='Job title, keyword'
                            value={navKeyword} 
                            onChange={(e) => setNavKeyword(e.target.value)} 
                            className='w-full outline-none text-[15px] text-gray-700 placeholder:text-gray-400 bg-transparent'
                        />
                    </div>
                    <button type="submit" className="hidden">Search</button>
                </form>

                <div className='flex items-center gap-5'>
                    <NotificationBell />
                    <div className='relative' ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className='w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white hover:ring-2 hover:ring-primary-100 transition-all focus:outline-none flex items-center justify-center'
                        >
                            <img
                                src={avatarUrl}
                                alt='Avatar'
                                className='w-full h-full object-cover'
                            />
                        </button>

                        {isProfileOpen && (
                            <div className='absolute right-0 top-12 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-in fade-in zoom-in-95'>
                                <div className='px-4 py-2 border-b border-gray-100 mb-2'>
                                    <p className='text-sm font-bold text-gray-900 truncate'>
                                        {profile?.fullName || user?.name || 'Candidate'}
                                    </p>
                                    <p className='text-xs text-gray-500 truncate mt-0.5'>
                                        {user?.email || 'No email provided'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        navigate('/jobseeker/DashBoard/settings'); 
                                    }}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                                >
                                    <Settings size={16} /> Settings
                                </button>
                                <div className='border-t border-gray-100 my-2'></div>
                                <button
                                    onClick={handleLogout}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'
                                >
                                    <LogOut size={16} /> Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}