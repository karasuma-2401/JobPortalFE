import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { NotificationService } from '../services/notificationService';
import { DeviceTokenService } from '../services/deviceTokenService';
import type { NotificationItem } from '../types/notification';

export const useNotificationsData = (enabled = true) => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const response = await NotificationService.getNotifications();
            const safeResponse = response as unknown as Record<string, unknown>;
            return (safeResponse.data as NotificationItem[]) || [];
        },
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        enabled,
    });
};

export const useSaveDeviceToken = () => {
    return useMutation({
        mutationFn: (token: string) =>
            NotificationService.saveDeviceToken(token),
        onError: (error) => {
            console.error('Failed to save FCM token:', error);
            toast.error('Failed to enable push notifications');
        },
        onSuccess: () => {
            console.log('Device token saved successfully');
        },
    });
};

export const useMarkAsRead = () => {
    return useMutation({
        mutationFn: (id: number) => NotificationService.markAsRead(id),
        onError: () => toast.error('Failed to mark notification as read.'),
    });
};

export const useMarkAllAsRead = () => {
    return useMutation({
        mutationFn: () => NotificationService.markAllAsRead(),
        onError: () => toast.error('Failed to mark all notifications as read.'),
    });
};

export const useDeleteNotification = () => {
    return useMutation({
        mutationFn: (id: number) => NotificationService.deleteNotification(id),
        onError: () => toast.error('Failed to delete notification.'),
    });
};

export const useDeleteAllNotifications = () => {
    return useMutation({
        mutationFn: () => NotificationService.deleteAllNotifications(),
        onError: () => toast.error('Failed to delete all notifications.'),
    });
};

export const useDeviceTokens = (enabled = true) => {
    return useQuery({
        queryKey: ['deviceTokens'],
        queryFn: () => DeviceTokenService.getDeviceTokens(),
        staleTime: 1000 * 60 * 10,
        enabled,
    });
};

export const useRegisterDeviceToken = () => {
    return useMutation({
        mutationFn: (token: string) =>
            DeviceTokenService.registerDeviceToken(token),
        onError: (error) => {
            console.error('Failed to register device token:', error);
            toast.error('Failed to register device for notifications');
        },
    });
};

export const useUnregisterDeviceToken = () => {
    return useMutation({
        mutationFn: (token: string) =>
            DeviceTokenService.unregisterDeviceToken(token),
        onError: (error) => {
            console.error('Failed to unregister device token:', error);
            toast.error('Failed to unregister device');
        },
        onSuccess: () => {
            toast.success('Device unregistered successfully');
        },
    });
};

export const useUnregisterAllDeviceTokens = () => {
    return useMutation({
        mutationFn: () => DeviceTokenService.unregisterAllDeviceTokens(),
        onError: (error) => {
            console.error('Failed to unregister all device tokens:', error);
            toast.error('Failed to unregister all devices');
        },
    });
};
