// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getMessaging} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1z6P1BKzotRj9TgNpLVT3CnejpT0Gffc",
    authDomain: "testingprject-56b11-1b6dc.firebaseapp.com",
    projectId: "testingprject-56b11-1b6dc",
    storageBucket: "testingprject-56b11-1b6dc.firebasestorage.app",
    messagingSenderId: "111743099645",
    appId: "1:111743099645:web:f0b2be8791f9c9a824d494",
    measurementId: "G-K0VX7663TP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
