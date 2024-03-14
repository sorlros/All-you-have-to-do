"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import "firebase/compat/messaging";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./(logged)/user-page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";
import "../../../public/firebase-messaging-sw";
import { verifyToken } from "@/libs/firebase/get-token";
import { useEffect, useState } from "react";

getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const Page = () => { 
  const [token, setToken] = useState<string>("");
  const auth = getAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const initialToken = await verifyToken();
      if (initialToken) {
        setToken(initialToken);
      } else {
        setToken("");
      }
    };
    fetchToken();
  }, []);

  const sendMessage = () => {
    const title = "All you have to do!";
    const body = "웹의 알람 기능을 사용하기 위해 권한 수락이 필요합니다.";
    const icon = "/images/logo.png";
    const options = { body, icon };

    new Notification(title, options);
  };

  const handleClick = async () => {
    const result = await Notification.requestPermission();

    if (result === "granted") {
      sendMessage();
    } else {
      return console.log("알림 권한을 얻지 못했습니다.");
    }
  };

  return (
    <main className="bg-slate-100 w-full h-full">
      <button onClick={handleClick}>push</button>
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
