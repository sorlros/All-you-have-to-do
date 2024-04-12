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
});

const messaging = firebase.messaging();
messaging
  .getToken({
    vapidKey:
      "BCj13Blch9Y6RxMwcSniqVtp37yQRmiV2-JcNd91tyo9kc3AJpenwQPUBz1SZA8K-TwbJcJr8c1Cxt1gGBg0pMo",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("기기 등록 성공");
    } else {
      console.log(
        "No registration token available. Request permission to generate one.",
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

  if (admin.messaging.data) {
    console.log("데이터 전송", admin.messaging.data)
  } else {
    console.log("데이터 못받음")
  }


self.addEventListener("push", function (event) {
  console.log("123123");
  if (event.data.json().notification) {
    const data = event.data.json().data;
    const options = {
      body: data.content,
      icon: data.image,
      image: data.image,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  // 띄운 알림창을 클릭했을 때 처리할 내용
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const data = messaging.payload;
  console.log(data)
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/images/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});