import { useState, useRef, useEffect } from 'react';
import {
    Search,
    LogOut,
    Settings,
    User,
    Activity,
    CreditCard,
    ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import avatar from '../../../assets/sulkyunggu.jpg';
import NotificationBell from '../../../components/ui/NotificationBell';
import useAuth from '../../../contexts/auth/useAuth';
const globalSearchData = [
    {
        id: 1,
        type: 'User',
        title: 'Ronald Richards',
        subtitle: 'ronald@example.com',
        icon: User,
        path: '/admin/users',
    },
    {
        id: 2,
        type: 'User',
        title: 'Theresa Webb',
        subtitle: 'theresa@example.com',
        icon: User,
        path: '/admin/users',
    },
    {
        id: 3,
        type: 'Transaction',
        title: 'Payment #INV-492',
        subtitle: '$240.00 from TechCorp',
        icon: CreditCard,
        path: '/admin/payments',
    },
    {
        id: 4,
        type: 'Transaction',
        title: 'Payment #INV-512',
        subtitle: '$1,200.00 from StudioZ',
        icon: CreditCard,
        path: '/admin/payments',
    },
    {
        id: 5,
        type: 'Log',
        title: 'System Security Update',
        subtitle: 'Deployed v2.4.1',
        icon: Activity,
        path: '/admin/audit-logs',
    },
];

export default function AdminTopbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
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
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
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

    const handleNavigate = (path: string) => {
        navigate(path);
        setIsProfileOpen(false);
    };

    const handleSearchSelect = (path: string) => {
        navigate(path);
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    const searchResults = searchQuery
        ? globalSearchData.filter(
              (item) =>
                  item.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  item.subtitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    return (
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50 shrink-0 shadow-sm'>
            <div className='relative w-full max-w-lg' ref={searchRef}>
                <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all'>
                    <Search size={18} className='text-gray-400 shrink-0' />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsSearchOpen(true);
                        }}
                        onFocus={() => searchQuery && setIsSearchOpen(true)}
                        placeholder='Search globally (Transactions, Users, Logs)...'
                        className='bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-700 placeholder:text-gray-400'
                    />
                </div>

                {isSearchOpen && searchQuery && (
                    <div className='absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
                        {searchResults.length > 0 ? (
                            <div className='py-2'>
                                <div className='px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50'>
                                    Search Results ({searchResults.length})
                                </div>
                                <div className='max-h-[60vh] overflow-y-auto'>
                                    {searchResults.map((result) => {
                                        const Icon = result.icon;
                                        return (
                                            <button
                                                key={result.id}
                                                onClick={() =>
                                                    handleSearchSelect(
                                                        result.path
                                                    )
                                                }
                                                className='w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group text-left'
                                            >
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors'>
                                                        <Icon size={14} />
                                                    </div>
                                                    <div>
                                                        <p className='text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors'>
                                                            {result.title}
                                                        </p>
                                                        <p className='text-xs text-gray-500 mt-0.5'>
                                                            <span className='font-medium text-gray-400'>
                                                                {result.type}
                                                            </span>{' '}
                                                            • {result.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    size={16}
                                                    className='text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all -translate-x-2 group-hover:translate-x-0'
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className='p-6 text-center'>
                                <Search
                                    size={32}
                                    className='mx-auto text-gray-300 mb-2'
                                />
                                <p className='text-sm font-bold text-gray-900'>
                                    No results found
                                </p>
                                <p className='text-xs text-gray-500 mt-1'>
                                    We couldn't find anything matching "
                                    {searchQuery}"
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='flex items-center gap-6'>
                <NotificationBell />

                <div className='h-8 w-px bg-gray-200'></div>

                <div
                    className='flex items-center gap-3 relative'
                    ref={profileRef}
                >
                    <div
                        className='flex items-center gap-3 cursor-pointer group'
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className='text-right hidden sm:block'>
                            <p className='text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors'>
                                Super Admin
                            </p>
                            <p className='text-xs text-gray-500'>
                                admin@system.com
                            </p>
                        </div>
                        <img
                            src={avatar}
                            alt='Admin Avatar'
                            className='w-10 h-10 rounded-full border-2 border-gray-100 object-cover'
                        />
                    </div>

                    {isProfileOpen && (
                        <div className='absolute right-0 top-full mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100'>
                            <div className='px-4 py-3 border-b border-gray-100'>
                                <p className='text-sm font-bold text-gray-900'>
                                    Super Admin
                                </p>
                                <p className='text-xs text-gray-500 mt-0.5'>
                                    admin@system.com
                                </p>
                            </div>

                            <div className='py-2'>
                                <button
                                    onClick={() =>
                                        handleNavigate('/admin/settings')
                                    }
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors'
                                >
                                    <Settings size={16} /> Account Settings
                                </button>
                            </div>

                            <div className='border-t border-gray-100 pt-2 pb-1'>
                                <button
                                    onClick={handleLogout}
                                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
