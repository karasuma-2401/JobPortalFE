import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyCPB9PUYtOFNqihxhCfG_oWTMZn5s8VlMs',
    authDomain: 'job-portal-fe.firebaseapp.com',
    projectId: 'job-portal-fe',
    storageBucket: 'job-portal-fe.firebasestorage.app',
    messagingSenderId: '1078599347629',
    appId: '1:1078599347629:web:2457a5533b6bf1b8b14524',
    measurementId: 'G-38N3HW8GF1',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
