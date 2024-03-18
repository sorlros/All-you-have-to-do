"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./(logged)/user-page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";
import { verifyToken } from "@/libs/firebase/get-token";
import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
// import "@/libs/firebase/fcm"

// getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const Page = () => { 
  const [token, setToken] = useState<string>("");
  // const messaging = getMessaging();

  const firebaseApps = getApps();
    const firebaseApp = firebaseApps.length === 0 ? initializeApp(firebaseConfig) : firebaseApps[0];
    if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
      const messaging = getMessaging(firebaseApp);
    }

    const auth = getAuth();

    useEffect(() => {
      const getPermission = async () => {
        let permission = await Notification.requestPermission();
          if (permission === "granted" && auth) {
            const getToken = await verifyToken();
              if (getToken) {
                console.log("token", getToken)
                setToken(getToken);
              } else {
                setToken("");
              }
          }
      }
      getPermission();
    }, [])

    useEffect(() => {
      console.log("currentUser", auth.currentUser);
    }, [])

  
  // useEffect(() => {
  //   const myButton = document.querySelector("button");
  //   myButton.addEventListener("click", async () => {
  //     let permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         console.log("Notification permission granted. Requesting for token.");
  //         let token = await messaging.getToken({
  //           vapidKey: "<YOUR_PUBLIC_VAPID_KEY_HERE>",
  //         });
  //         // do something with the FCM token
  //       } else {
  //         console.log("Notification permission denied");
  //         // Handle denied permission
  //       }
  //   });
  // })
  
  // onMessage(messaging, (payload) => {
  //   console.log('Message received. ', payload);
  //   // ...
  // });

  const sendMessage = () => {
    const title = "All you have to do!";
    const body = "웹의 알람 기능을 사용하기 위해 권한 수락이 필요합니다.";
    // const icon = "/images/logo.png";
    const options = { body };

    new Notification(title, options);
  };

  const handleClick = async () => {
      sendMessage();
  };

  const handleClick2 = () => {
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
    
  };

  return (
    <main className="bg-slate-100 w-full h-full">
      <button onClick={handleClick}>push</button>
      <button onClick={handleClick2}>포그라운드 알림</button>
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <Title auth={auth} token={token} />
        {auth.currentUser === null ? <ExamplePage /> : <UserPage />}
      </div>
    </main>
  );
};

export default Page;

const NotificationText = () => {
  const sendMessage = () => {
    const title = "All you have to do!";
    const body = "웹의 알람 기능을 사용하기 위해 권한 수락이 필요합니다.";
    const icon = "/images/logo.png";
    const options = { body, icon };

    const notific = new Notification(title, options);
  };

  const handleClick = async () => {
    const result = await Notification.requestPermission();

    if (result === "granted") {
      sendMessage();
    } else {
      return console.log("알림 권한을 얻지 못했습니다.");
    }
  };

  return <button onClick={handleClick}>알림 보내기</button>;
};
