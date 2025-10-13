import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./pages/auth/AuthContext";
import {RecoilRoot} from "recoil";
import {getMessaging} from "firebase/messaging";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
        console.log("Service Worker registered", registration);
        const messaging = getMessaging();
        messaging.useServiceWorker(registration); // Only for older firebase-compat
    })
    .catch((err) => console.log("Service Worker registration failed", err));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <RecoilRoot>
            <AuthProvider>
                <App />
            </AuthProvider>
        </RecoilRoot>
    </BrowserRouter>
);
