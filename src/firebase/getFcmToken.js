// fcm.js
import {getToken} from "firebase/messaging";
import {messaging} from "./firebaseConfig";

export const getFcmToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("Notification permission denied");
            return null;
        }

        const token = await getToken(messaging, {
            vapidKey: "BLoi8IfQWZTz-yiJfuuaI-u7XT4_bP3_-3R_A1UX7K8pavPRxP5EcPipbPrZcDDnljA1V99jWdN7lKWYmsVk3rw",
        });

        if (!token) {
            console.warn("FCM token not returned");
            return null;
        }

        console.log("FCM Token:", token);
        return token;
    } catch (err) {
        console.error("Error getting FCM token:", err);
        return null;
    }
};
