import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    Bell,
    Settings,
    LogOut,
} from 'lucide-react';
import useAuth from '../../contexts/auth/useAuth';

export default function DashboardSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        {
            path: '/jobseeker/DashBoard/overview',
            label: 'Overview',
            icon: <LayoutDashboard size={22} />,
        },
        {
            path: '/jobseeker/DashBoard/applied',
            label: 'Applied Jobs',
            icon: <Briefcase size={22} />,
        },
        {
            path: '/jobseeker/DashBoard/favorites',
            label: 'Favorite Jobs',
            icon: <Bookmark size={22} />,
        },
        {
            path: '/jobseeker/DashBoard/jobalerts',
            label: 'Job Alert',
            icon: <Bell size={22} />,
            badge: '09',
        },
        {
            path: '/jobseeker/DashBoard/settings',
            label: 'Settings',
            icon: <Settings size={22} />,
        },
    ];

    return (
        <div className='w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between shrink-0'>
            <div className='flex flex-col w-full pt-4'>
                <span className='px-6 text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-3 block text-left'>
                    Candidate Dashboard
                </span>
                <nav className='flex flex-col w-full'>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-6 py-3.5 text-[15px] font-medium transition-all border-l-[3px] ${
                                    isActive
                                        ? 'bg-blue-50/50 border-primary-500 text-primary-500'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'
                                }`}
                            >
                                <div className='flex items-center gap-3'>
                                    <span
                                        className={
                                            isActive
                                                ? 'text-primary-500'
                                                : 'text-gray-400'
                                        }
                                    >
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </div>
                                {item.badge && (
                                    <span
                                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                            isActive
                                                ? 'bg-white text-primary-500'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className='p-4 border-t border-gray-50'>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login', { replace: true });
                    }}
                    className='flex items-center gap-3 w-full px-4 py-3 text-[15px] font-medium text-gray-500 hover:text-danger-500 hover:bg-red-50/50 rounded-lg transition-all'
                >
                    <LogOut
                        size={22}
                        className='text-gray-400 hover:text-danger-500'
                    />
                    Log-out
                </button>
            </div>
        </div>
    );
}
