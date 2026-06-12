import { privateApi } from '../api/api';
import type { NotificationItem } from '../types/notification';

export const NotificationService = {
    getNotifications: async (): Promise<NotificationItem[]> => {
        return await privateApi.get('/notifications');
    },
    saveDeviceToken: async (token: string): Promise<void> => {
        return await privateApi.post('/notifications', null, {
            params: { fcmToken: token },
        });
    },
    markAsRead: async (id: number): Promise<void> => {
        return await privateApi.patch(`/notifications/${id}/read`);
    },
    markAllAsRead: async (): Promise<void> => {
        return await privateApi.patch('/notifications/read-all');
    },
    deleteNotification: async (id: number): Promise<void> => {
        return await privateApi.delete(`/notifications/${id}`);
    },
    deleteAllNotifications: async (): Promise<void> => {
        return await privateApi.delete('/notifications/delete-all');
    },
};
