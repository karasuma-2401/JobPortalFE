import { getToken } from 'firebase/messaging';
import { firebaseConfig, messaging } from './firebase';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const getServiceWorkerUrl = (): string => {
    const config = new URLSearchParams(firebaseConfig);

    return `/firebase-messaging-sw.js?${config.toString()}`;
};

export async function registerDeviceToken(): Promise<string | null> {
    if (
        !('Notification' in window) ||
        !('serviceWorker' in navigator) ||
        !VAPID_KEY
    ) {
        return null;
    }

    try {
        const permission =
            Notification.permission === 'granted'
                ? 'granted'
                : await Notification.requestPermission();
        console.log(permission)
        if (permission !== 'granted') {
            return null;
        }

        const serviceWorkerRegistration =
            await navigator.serviceWorker.register(getServiceWorkerUrl());
        console.log(VAPID_KEY) 
        return await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration,
        });
    } catch (error) {
        console.warn('Unable to get Firebase device token:', error);
        return null;
    }
}
