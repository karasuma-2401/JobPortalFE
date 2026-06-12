import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { getToken, onMessage } from 'firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';

import { messaging } from '../../firebase/firebase';
import { NotificationContext } from './NotificationContext';
import {
    useNotificationsData,
    useSaveDeviceToken,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
    useDeleteAllNotifications,
} from '../../hooks/useNotifications';

import type { NotificationItem } from '../../types/notification';

export function NotificationProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { data: notifications = [] } = useNotificationsData();

    const { mutate: saveToken } = useSaveDeviceToken();
    const { mutate: markAsReadMutation } = useMarkAsRead();
    const { mutate: markAllAsReadMutation } = useMarkAllAsRead();
    const { mutate: deleteMutation } = useDeleteNotification();
    const { mutate: deleteAllMutation } = useDeleteAllNotifications();

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

                    if (token) {
                        saveToken(token);
                    }
                }
            } catch (error) {
                console.error('FCM Token generation failed:', error);
            }
        };

        requestPermission();

        const unsubscribe = onMessage(messaging, (payload) => {
            const newNotification: NotificationItem = {
                id: Date.now(),
                title: payload.notification?.title ?? 'New Notification',
                message: payload.notification?.body ?? '',
                isRead: false,
                createdAt: new Date().toISOString(),
            };

            queryClient.setQueryData(
                ['notifications'],
                (oldData: NotificationItem[] | undefined) => {
                    return [newNotification, ...(oldData || [])];
                }
            );

            toast.info(newNotification.title, {
                description: newNotification.message,
                duration: 5000,
                position: 'top-right',
            });
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAsRead = (id: number) => {
        queryClient.setQueryData(
            ['notifications'],
            (oldData: NotificationItem[] | undefined) => {
                if (!oldData) return [];
                return oldData.map((n) =>
                    n.id === id ? { ...n, isRead: true } : n
                );
            }
        );
        markAsReadMutation(id);
    };

    const markAllAsRead = () => {
        queryClient.setQueryData(
            ['notifications'],
            (oldData: NotificationItem[] | undefined) => {
                if (!oldData) return [];
                return oldData.map((n) => ({ ...n, isRead: true }));
            }
        );
        markAllAsReadMutation();
    };

    const deleteNotification = (id: number) => {
        queryClient.setQueryData(
            ['notifications'],
            (oldData: NotificationItem[] | undefined) => {
                if (!oldData) return [];
                return oldData.filter((n) => n.id !== id);
            }
        );
        deleteMutation(id);
    };

    const deleteAllNotifications = () => {
        queryClient.setQueryData(['notifications'], () => []);
        deleteAllMutation();
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead,
                deleteNotification,
                deleteAllNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
