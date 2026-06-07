import { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../../contexts/notification/useNotification';

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllAsRead } =
        useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='relative' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors outline-none'
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className='absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full animate-in zoom-in'>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className='absolute right-0 mt-2 w-87.5 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden'>
                    <div className='p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50'>
                        <h3 className='font-bold text-gray-900'>
                            Notifications
                        </h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className='text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors'
                            >
                                <Check size={14} /> Mark all as read
                            </button>
                        )}
                    </div>

                    <div className='max-h-100 overflow-y-auto'>
                        {notifications.length === 0 ? (
                            <div className='p-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2'>
                                <Bell size={32} className='text-gray-300' />
                                <p>No new notifications.</p>
                            </div>
                        ) : (
                            <ul className='divide-y divide-gray-50'>
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        onClick={() =>
                                            markAsRead(notification.id)
                                        }
                                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 ${
                                            notification.isRead
                                                ? 'opacity-60'
                                                : 'bg-blue-50/30'
                                        }`}
                                    >
                                        <div className='mt-0.5 shrink-0'>
                                            <CheckCircle2
                                                size={18}
                                                className={
                                                    notification.isRead
                                                        ? 'text-gray-400'
                                                        : 'text-blue-500'
                                                }
                                            />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p
                                                className={`text-sm truncate ${
                                                    notification.isRead
                                                        ? 'text-gray-600'
                                                        : 'text-gray-900 font-bold'
                                                }`}
                                            >
                                                {notification.title}
                                            </p>
                                            <p className='text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed'>
                                                {notification.body}
                                            </p>
                                            <span className='text-[10px] text-gray-400 mt-2 block font-medium'>
                                                {notification.createdAt?.toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
