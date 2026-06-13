export interface NotificationItem {
    id: number;
    title: string;
    message: string;
    isRead: boolean;
    targetUrl?: string;
    icon?: string;
    createdAt: string;
}

export interface NotificationContextType {
    notifications: NotificationItem[];
    unreadCount: number;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: number) => void;
    deleteAllNotifications: () => void;
}
