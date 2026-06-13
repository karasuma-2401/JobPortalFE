import { useEffect, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { getToken, onMessage } from 'firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';

import { messaging } from '../../firebase/firebase';
import { NotificationContext } from './NotificationContext';
import useAuth from '../auth/useAuth';
import { NotificationService } from '../../services/notificationService';
import {
    useNotificationsData,
    useSaveDeviceToken,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
    useDeleteAllNotifications,
} from '../../hooks/useNotifications';

import type { NotificationItem } from '../../types/notification';

const VAPID_KEY =
    'BC55ci3KpI1JNkfzS7BJvzADUS2mGa1L4iOrOKjLPHA_UIpyRZf3ammewT-Pjy6fk2ZQ4kg1K569DOtu3I0-tbo';

export function NotificationProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { data: notifications = [] } = useNotificationsData(!!user);

    const { mutate: saveToken } = useSaveDeviceToken();
    const { mutate: markAsReadMutation } = useMarkAsRead();
    const { mutate: markAllAsReadMutation } = useMarkAllAsRead();
    const { mutate: deleteMutation } = useDeleteNotification();
    const { mutate: deleteAllMutation } = useDeleteAllNotifications();

    const prevUserRef = useRef<typeof user>(null);

    useEffect(() => {
        const wasLoggedIn = Boolean(prevUserRef.current);
        const isLoggedOut = !user && wasLoggedIn;

        if (isLoggedOut) {
            NotificationService.cleanupOnLogout()
                .then(() => {
                    console.log('Device tokens cleaned up on logout');
                })
                .catch((error) => {
                    console.warn('Error during logout cleanup:', error);
                });
        }

        if (!user) {
            queryClient.setQueryData(['notifications'], []);
        }

        prevUserRef.current = user;
    }, [user, queryClient]);

    useEffect(() => {
        if (!user) return;

        const setupFCM = async () => {
            try {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    try {
                        const registration =
                            await navigator.serviceWorker.register(
                                '/firebase-messaging-sw.js'
                            );

                        const token = await getToken(messaging, {
                            vapidKey: VAPID_KEY,
                            serviceWorkerRegistration: registration,
                        });

                        if (token) {
                            console.log('FCM Token generated successfully');
                            saveToken(token);
                        }
                    } catch (serviceWorkerError) {
                        console.warn(
                            'Service Worker registration failed:',
                            serviceWorkerError
                        );
                    }
                } else if (permission === 'denied') {
                    console.log('Notification permission denied by user');
                }
            } catch (error) {
                console.error('FCM setup failed:', error);
            }
        };

        setupFCM();
        const unsubscribe = onMessage(messaging, (payload) => {
            const newNotification: NotificationItem = {
                id: Date.now(),
                title: payload.notification?.title ?? 'New Notification',
                message: payload.notification?.body ?? '',
                icon: payload.notification?.icon || payload.notification?.image,
                targetUrl: (payload.data?.url as string) || undefined,
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
                action: newNotification.targetUrl
                    ? {
                          label: 'Open',
                          onClick: () =>
                              window.open(newNotification.targetUrl, '_self'),
                      }
                    : undefined,
            });
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, saveToken]);

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
