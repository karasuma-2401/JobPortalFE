import { useEffect, useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { onMessage } from 'firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';

import { messaging } from '../../lib/firebase';
import { registerDeviceToken } from '../../lib/fcm';
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

async function showSystemNotification(payload: {
    title: string;
    body: string;
    icon?: string;
    image?: string;
    url?: string;
}) {
    if (
        typeof window === 'undefined' ||
        !('Notification' in window) ||
        Notification.permission !== 'granted'
    ) {
        return;
    }

    const options: NotificationOptions = {
        body: payload.body,
        icon: payload.icon || payload.image || '/favicon.ico',
        data: {
            url: payload.url,
        },
    };

    try {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(payload.title, options);
            return;
        }

        new Notification(payload.title, options);
    } catch (error) {
        console.warn('Unable to show system notification:', error);
    }
}

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
                const token = await registerDeviceToken();

                if (token) {
                    saveToken(token);
                }
            } catch (error) {
                console.error('FCM setup failed:', error);
            }
        };

        setupFCM();
        const unsubscribe = onMessage(messaging, (payload) => {
            const title = payload.notification?.title ?? 'New Notification';
            const message = payload.notification?.body ?? '';
            const icon = payload.notification?.icon;
            const image = payload.notification?.image;
            const targetUrl = (payload.data?.url as string) || undefined;

            void showSystemNotification({
                title,
                body: message,
                icon,
                image,
                url: targetUrl,
            });

            const newNotification: NotificationItem = {
                id: Date.now(),
                title,
                message,
                icon: icon || image,
                targetUrl,
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
    }, [queryClient, saveToken, user]);

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
