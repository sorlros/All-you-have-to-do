"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./user/page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { Toaster } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
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

  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <Toaster />
        <Title />
        <ExamplePage />
      </div>
    </main>
  );
};

export default Page;
