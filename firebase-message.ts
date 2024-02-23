// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
  authDomain: "all-you-have-to-do.firebaseapp.com",
  projectId: "all-you-have-to-do",
  storageBucket: "all-you-have-to-do.appspot.com",
  messagingSenderId: "28080972325",
  appId: "1:28080972325:web:76fd6789726f2923a195cc",
  measurementId: "G-Z6CGMEE9RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
// const messaging = firebase.messaging()
// export function requestPermission() {
//   void Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       messaging
//         .getToken({ vapidKey: process.env.NEXT_APP_FIREBASE_VAPID_KEY })
//         .then((token: string) => {
//           console.log(`푸시 토큰 발급 완료 : ${token}`)
//         })
//         .catch((err) => {
//           console.log('푸시 토큰 가져오는 중에 에러 발생')
//         })
//     } else if (permission === 'denied') {
//       console.log('푸시 권한 차단')
//     }
//   })
// }