import { getMessaging, onMessage } from "firebase/messaging";

export const receiveMessage = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
};
