import { privateApi } from '../api/api';
import type { NotificationItem } from '../types/notification';
import { DeviceTokenService } from './deviceTokenService';

export const NotificationService = {
    getNotifications: async (): Promise<NotificationItem[]> => {
        const response = await privateApi.get('/notifications');
        return response.data || [];
    },

    saveDeviceToken: async (token: string): Promise<void> => {
        try {
            return await DeviceTokenService.registerDeviceToken(token);
        } catch (error) {
            console.error('Failed to save device token:', error);
            throw error;
        }
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
    cleanupOnLogout: async (): Promise<void> => {
        try {
            await DeviceTokenService.unregisterAllDeviceTokens();
        } catch (error) {
            console.warn('Failed to cleanup device tokens on logout:', error);
        }
    },
};
