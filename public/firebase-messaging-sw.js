// importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js');

importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
);
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
//   authDomain: "all-you-have-to-do.firebaseapp.com",
//   projectId: "all-you-have-to-do",
//   storageBucket: "all-you-have-to-do.appspot.com",
//   messagingSenderId: "28080972325",
//   appId: "1:28080972325:web:2968ca49bf317747a195cc",
//   measurementId: "G-QTMJX6MW8L",
// };

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
  authDomain: "all-you-have-to-do.firebaseapp.com",
  projectId: "all-you-have-to-do",
  storageBucket: "all-you-have-to-do.appspot.com",
  messagingSenderId: "28080972325",
  appId: "1:28080972325:web:2968ca49bf317747a195cc",
  measurementId: "G-QTMJX6MW8L",
});

const messaging = getMessaging(firebaseApp);

messaging.onBackgroundMessage();

// const app = firebase.initializeApp(firebaseConfig);

// firebase.messaging().onBackgroundMessage((payload) => {
//   return self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//   });
// });

// const messaging = getMessaging(firebaseConfig);

// firebase-messaging-sw.js

// Empty service worker script that only handles messaging events
// self.addEventListener('push', function(event) {
//   // Handle push notifications here
//   const notification = event.data.json();
//   self.registration.showNotification(notification.title, notification);
// });

// self.addEventListener('notificationclick', function(event) {
//   // Handle notification clicks here
//   const notification = event.notification;
//   notification.close();
//   // Add your custom click handling logic here
// });
