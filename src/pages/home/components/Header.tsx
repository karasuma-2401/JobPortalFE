import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search} from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Logo from '../../../components/Logo';
import useAuth from '../../../contexts/auth/useAuth';
import { getDefaultAuthenticatedRoute } from '../../../contexts/auth/auth-utils';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/find-job', label: 'Find Job' },
    { path: '/find-employers', label: 'Employers' },
    // { path: "/candicates", label: "Candicates" },
    // { path: "/pricing", label: "Pricing Plans" },
    // { path: "/customer", label: "Customer Supports" },
];

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const dashboardRoute = getDefaultAuthenticatedRoute(user);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > 150 && latest > previous) {
            setHidden(true);
        } else setHidden(false);
    });
    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full border-b border-gray-100 bg-bg-white sticky top-0 z-50'
        >
            <div className='hidden lg:flex justify-between items-center py-2 px-8 bg-gray-50 text-sm text-gray-500 border-gray-100'>
                <nav className='flex items-center gap-6'>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `py-2 border-b-2 transition-colors ${
                                    isActive
                                        ? 'border-primary-500 text-primary-500 font-medium'
                                        : 'border-transparent text-gray-500 hover:text-primary-500'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
        
            </div>

            <div className='flex justify-between items-center py-4 px-8'>
                <Logo className='flex items-center gap-2 text-2xl font-bold text-gray-900' />
                <div className='hidden lg:flex items-center border border-gray-100 rounded-md px-6 py-2 w-1/3 gap-4'>
                    <Search className='text-primary-500' size={28} />
                    <input
                        type='text'
                        placeholder='Job title, keyword, company'
                        className='flex-1 w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400'
                    />
                </div>
                <div className='flex items-center gap-4'>
                    
                    <Link to={isAuthenticated ? dashboardRoute : '/login'}>
                        <Button
                            variant='social'
                            className='px-6 py-2 border-primary-100 text-primary-500 hover:bg-primary-50'
                        >
                            {isAuthenticated ? 'Dashboard' : 'Sign In'}
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
