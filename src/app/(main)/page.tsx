"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./(logged)/user-page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { Toaster } from "sonner";
import Swal from "sweetalert2";

const Page = () => {
  const firebaseApps = getApps();
  const firebaseApp =
    firebaseApps.length === 0 ? initializeApp(firebaseConfig) : firebaseApps[0];
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    const messaging = getMessaging(firebaseApp);
  }

  const auth = getAuth();

  useEffect(() => {
    // console.log("NOTI", Notification.permission);
    const getAlert = function () {
      if (Notification.permission === "granted") {
        return console.log("granted");
      } else {
        Swal.fire({
          //message, callback
          text: "이 웹사이트는 알람기능을 사용하기 위해 사용자의 동의가 필요합니다.",
          showCancelButton: true,
          allowOutsideClick: false,
        }).then(async function (result) {
          if (result.isConfirmed) {
            let permission = await Notification.requestPermission();
            if (permission === "granted") {
              console.log("granted");
            } else {
              console.log("denied");
            }
          } else return;
        });
      }
    };
    getAlert();
  }, []);

  // const NotificationText = () => {
  //   const sendMessage = () => {
  //     const title = "All you have to do!";
  //     const body = "웹의 알람 기능을 사용하기 위해 권한 수락이 필요합니다.";
  //     const icon = "/images/logo.png";
  //     const options = { body, icon };

  //     const notific = new Notification(title, options);
  //   };

  //   const handleClick = async () => {
  //     const result = await Notification.requestPermission();

  //     if (result === "granted") {
  //       sendMessage();
  //     } else {
  //       return console.log("알림 권한을 얻지 못했습니다.");
  //     }
  //   };
  //   return <button onClick={handleClick}>알림 보내기</button>;
  // };

  // const handleClick2 = () => {
  //   const messaging = getMessaging(firebaseApp);
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);
  //     // ...
  //   });
  // };

  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <Toaster />
        <Title auth={auth} />
        {auth.currentUser === null ? <ExamplePage /> : <UserPage auth={auth} />}
      </div>
    </main>
  );
};

export default Page;
