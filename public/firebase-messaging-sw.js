// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyB1z6P1BKzotRj9TgNpLVT3CnejpT0Gffc",
    authDomain: "testingprject-56b11-1b6dc.firebaseapp.com",
    projectId: "testingprject-56b11-1b6dc",
    storageBucket: "testingprject-56b11-1b6dc.firebasestorage.app",
    messagingSenderId: "111743099645",
    appId: "1:111743099645:web:f0b2be8791f9c9a824d494",
});
const messaging = firebase.messaging();
