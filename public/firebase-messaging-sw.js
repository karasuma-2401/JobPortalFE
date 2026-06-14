importScripts(
    'https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js'
);

importScripts(
    'https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
    apiKey: 'AIzaSyBqO6cl0NJq37f_s_4_9KkswGajpBcveS8',
    authDomain: 'jobportal-application.firebaseapp.com',
    projectId: 'jobportal-application',
    storageBucket: 'jobportal-application.firebasestorage.app',
    messagingSenderId: '749328981590',
    appId: '1:749328981590:web:e60fbe8170d7dc65c0e5f7',
    measurementId: 'G-EHW86C12R3',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Background Message:', payload);

    self.registration.showNotification(
        payload.notification?.title || 'Notification',
        {
            body: payload.notification?.body,
            icon: '/favicon.ico',
        }
    );
});
