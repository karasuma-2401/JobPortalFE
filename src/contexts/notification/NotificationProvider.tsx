import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { getToken, onMessage } from 'firebase/messaging';

import { messaging } from '../../firebase/firebase.ts';
import { NotificationContext } from './NotificationContext';

import type { NotificationItem } from '../../types/notification.ts';

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    const registration = await navigator.serviceWorker.register(
                        '/firebase-messaging-sw.js'
                    );

                    const token = await getToken(messaging, {
                        vapidKey:
                            'BC55ci3KpI1JNkfzS7BJvzADUS2mGa1L4iOrOKjLPHA_UIpyRZf3ammewT-Pjy6fk2ZQ4kg1K569DOtu3I0-tbo',
                        serviceWorkerRegistration: registration,
                    });

                    console.log('FCM Token:', token);
                }
            } catch (error) {
                console.error(error);
            }
        };

        requestPermission();

        const unsubscribe = onMessage(messaging, (payload) => {
            const newNotification: NotificationItem = {
                id: payload.messageId ?? crypto.randomUUID(),
                title: payload.notification?.title ?? 'New Notification',
                body: payload.notification?.body ?? '',
                isRead: false,
                createdAt: new Date(),
            };

            setNotifications((prev) => [newNotification, ...prev]);

            toast.info(newNotification.title, {
                description: newNotification.body,
                duration: 5000,
                position: 'top-right',
            });
        });

        return () => unsubscribe();
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({
                ...n,
                isRead: true,
            }))
        );
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
