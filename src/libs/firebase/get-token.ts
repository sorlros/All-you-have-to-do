import { getMessaging, getToken } from "firebase/messaging";

export const verifyToken = () => {
  // const app = initializeApp(firebaseConfig);
  const messaging = getMessaging();

  getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("토큰존재", currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one.",
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};
