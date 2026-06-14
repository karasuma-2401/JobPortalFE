importScripts(
    'https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js'
);
importScripts(
    'https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js'
);

const params = new URL(self.location.href).searchParams;
const firebaseConfig = {
    apiKey: params.get('apiKey'),
    authDomain: params.get('authDomain'),
    projectId: params.get('projectId'),
    storageBucket: params.get('storageBucket'),
    messagingSenderId: params.get('messagingSenderId'),
    appId: params.get('appId'),
    measurementId: params.get('measurementId'),
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(
        payload.notification?.title || 'Notification',
        {
            body: payload.notification?.body,
            icon: payload.notification?.icon || '/favicon.ico',
            data: {
                url: payload.data?.url,
            },
        }
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const targetUrl = event.notification.data?.url;
    if (targetUrl) {
        event.waitUntil(clients.openWindow(targetUrl));
    }
});
