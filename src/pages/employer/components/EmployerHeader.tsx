import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Phone, Briefcase, User, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import sulkyunggu from '../../../assets/sulkyunggu.jpg';
import ComboBox, { type OptionType } from '../../../components/ui/ComboBox';
import NotificationBell from '../../../components/ui/NotificationBell';
import useAuth from '../../../contexts/auth/useAuth';

const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Find Candidate', path: '/employer/find-candidates' },
    { name: 'Dashboard', path: '/employer/dashboard' },
    { name: 'My Jobs', path: '/employer/my-jobs' },
    { name: 'Applications', path: '/employer/applications' },
];

const languages = [
    { label: 'English', value: 'english' },
    { label: 'Vietnamese', value: 'vietnamese' },
];

export default function EmployerHeader() {
    const [language, setLanguage] = useState<OptionType>(languages[0]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

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

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully!');
        navigate('/login', { replace: true });
    };

    return (
        <header className='h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0'>
            <Link
                to='/employer/dashboard'
                className='flex items-center gap-2 text-xl font-bold text-gray-900'
            >
                <div className='text-primary-600'>
                    <Briefcase size={28} />
                </div>
                MyJob
            </Link>

            <nav className='hidden lg:flex items-center gap-8 h-full'>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `text-sm font-medium h-full flex items-center border-b-2 transition-colors ${
                                isActive
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 border-transparent hover:text-primary-600'
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>

            <div className='flex items-center gap-6'>
                <div className='hidden xl:flex items-center gap-6 text-sm text-gray-600 border-r border-gray-200 pr-6'>
                    <div className='flex items-center gap-2'>
                        <Phone size={16} />
                        <span>+1-202-555-0178</span>
                    </div>
                    <div className='w-36'>
                        <ComboBox
                            options={languages}
                            value={language}
                            onChange={setLanguage}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <NotificationBell />

                    <Link
                        to='/employer/post-job'
                        className='px-5 py-2 text-sm font-semibold text-primary-600 border border-primary-200 rounded-md hover:bg-primary-50 transition-colors'
                    >
                        Post A Jobs
                    </Link>

                    <div className='relative' ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className='w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white hover:ring-2 hover:ring-primary-100 transition-all focus:outline-none'
                        >
                            <img
                                src={sulkyunggu}
                                alt='Avatar'
                                className='w-full h-full object-cover'
                            />
                        </button>

                        {isProfileOpen && (
                            <div className='absolute right-0 top-12 z-50 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 animate-in fade-in zoom-in-95'>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        navigate('/employer/profile');
                                    }}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors'
                                >
                                    <User size={16} /> Profile
                                </button>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        navigate('/employer/settings');
                                    }}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors'
                                >
                                    <Settings size={16} /> Settings
                                </button>
                                <div className='border-t border-gray-100 my-1'></div>
                                <button
                                    onClick={handleLogout}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors'
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
