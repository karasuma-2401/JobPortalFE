importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyCPB9PUYtOFNqihxhCfG_oWTMZn5s8VlMs",
  authDomain: "job-portal-fe.firebaseapp.com",
  projectId: "job-portal-fe",
  storageBucket: "job-portal-fe.firebasestorage.app",
  messagingSenderId: "1078599347629",
  appId: "1:1078599347629:web:2457a5533b6bf1b8b14524",
  measurementId: "G-38N3HW8GF1",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
