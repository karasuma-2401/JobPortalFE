import { privateApi } from '../api/api';

export const NotificationService = {
    getNotifications: async () => {
        const response = await privateApi.get('/notifications');
        return response.data;
    },

    saveDeviceToken: async (token: string) => {
        const response = await privateApi.post('/notifications', null, {
            params: { fcmToken: token },
        });
        return response.data;
    },

    markAsRead: async (id: number) => {
        const response = await privateApi.patch(`/notifications/${id}/read`);
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await privateApi.patch('/notifications/read-all');
        return response.data;
    },

    // MỚI: Xóa 1 thông báo
    deleteNotification: async (id: number) => {
        const response = await privateApi.delete(`/notifications/${id}`);
        return response.data;
    },

    // MỚI: Xóa tất cả thông báo
    deleteAllNotifications: async () => {
        const response = await privateApi.delete('/notifications/delete-all');
        return response.data;
    },
};
