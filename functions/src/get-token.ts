import { getMessaging, getToken } from "firebase/messaging";

export const getTokenAtServer = () => {
  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      "BCj13Blch9Y6RxMwcSniqVtp37yQRmiV2-JcNd91tyo9kc3AJpenwQPUBz1SZA8K-TwbJcJr8c1Cxt1gGBg0pMo",
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log("currentToken", currentToken);
        return currentToken;
      } else {
        // Show permission request UI
        return console.log(
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
