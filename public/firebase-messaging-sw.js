importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
  authDomain: "all-you-have-to-do.firebaseapp.com",
  projectId: "all-you-have-to-do",
  storageBucket: "all-you-have-to-do.appspot.com",
  messagingSenderId: "28080972325",
  appId: "1:28080972325:web:2968ca49bf317747a195cc",
  measurementId: "G-QTMJX6MW8L",
});

const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  // 받은 푸시 데이터를 처리해 알림으로 띄우는 내용
});

self.addEventListener("notificationclick", {
  // 띄운 알림창을 클릭했을 때 처리할 내용
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/images/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
//   const messaging = getMessaging(firebaseApp);

//   messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };

//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// }
// if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
//   const messaging = getMessaging(firebaseApp);

//   messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };

//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// }

// if (window.registration) {
//   // registration 속성이 존재할 때만 실행되는 코드
// }

// self.addEventListener("install", function (e) {
//   console.log("fcm sw install..");
//   self.skipWaiting();
// });

// self.addEventListener("activate", function (e) {
//   console.log("fcm sw activate..");
// });

// self.addEventListener("push", function (e) {
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image, // 웹 푸시 이미지는 icon
//     tag: resultData.tag,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

// // if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
// //   const messaging = getMessaging(firebaseApp);
// // }

// const messaging = firebase.messaging();

// // messaging.onBackgroundMessage();

// // const app = firebase.initializeApp(firebaseConfig);

// // firebase.messaging().onBackgroundMessage((payload) => {
// //   return self.registration.showNotification(payload.notification.title, {
// //     body: payload.notification.body,
// //   });
// // });

// // const messaging = getMessaging(firebaseConfig);

// // firebase-messaging-sw.js

// // Empty service worker script that only handles messaging events
// // self.addEventListener("push", function (event) {
// //   // Handle push notifications here
// //   const notification = event.data.json();
// //   self.registration.showNotification(notification.title, notification);
// // });

// // self.addEventListener("notificationclick", function (event) {
// //   // Handle notification clicks here
// //   const notification = event.notification;
// //   notification.close();
// //   // Add your custom click handling logic here
// // });
