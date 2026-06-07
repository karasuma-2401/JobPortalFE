import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    PlusCircle,
    Briefcase,
    Bookmark,
    CreditCard,
    Settings,
    LogOut,
} from 'lucide-react';

const navItems = [
    { name: 'Overview', path: '/employer/dashboard', icon: LayoutDashboard },
    { name: 'Employers Profile', path: '/employer/profile', icon: User },
    { name: 'Post a Job', path: '/employer/post-job', icon: PlusCircle },
    { name: 'My Jobs', path: '/employer/my-jobs', icon: Briefcase },
    {
        name: 'Saved Candidate',
        path: '/employer/saved-candidates',
        icon: Bookmark,
    },
    {
        name: 'Plans & Billing',
        path: '/employer/plans-billing',
        icon: CreditCard,
    },
    { name: 'Settings', path: '/employer/settings', icon: Settings },
];

export default function EmployerSidebar() {
    return (
        <aside className='w-64 h-screen bg-white border-r border-gray-200 flex-col hidden md:flex'>
            <div className='p-6'>
                <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
                    Employers Dashboard
                </h3>
            </div>
            <div className='flex-1 overflow-y-auto px-3'>
                <ul className='flex flex-col gap-1'>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/employer/dashboard'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500 border-l-4 border-transparent'
                                    }`
                                }
                            >
                                <item.icon size={18} />
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='p-4 border-t border-gray-200'>
                <button className='flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-danger-500 transition-colors w-full'>
                    <LogOut size={18} />
                    Log-out
                </button>
            </div>
        </aside>
    );
}
