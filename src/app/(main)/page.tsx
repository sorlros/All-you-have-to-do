"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/messaging";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./(logged)/user-page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const Page = () => {
  const auth = getAuth();

  const sendMessage = () => {
    const title = "타이틀";
    const body = "바디";
    // const icon = "";
    const options = { body };

    new Notification(title, options);
  };

  const btnClickHandler = async () => {
    try {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        sendMessage();
      } else {
        console.log("알림 권한이 거부되었습니다.");
      }
    } catch (error) {
      console.error("알림 권한을 요청하는 동안 오류가 발생했습니다.", error);
    }
  };

  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <Title auth={auth} />
        {auth.currentUser === null ? <ExamplePage /> : <UserPage />}
      </div>
    </main>
  );
};

export default Page;
