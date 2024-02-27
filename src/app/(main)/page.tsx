"use client";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { FcTodoList } from "react-icons/fc";
import Lists from "./(_components)/lists";
import { useEffect, useId, useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image';
import { Poppins } from "next/font/google";

import { getMessaging, getToken } from 'firebase/messaging'; // 변경된 부분
import firebase, {initializeApp} from 'firebase/app';
// import dotenv from "dotenv"
// import getConfig from 'next/config';

// dotenv.config();
// const { env } = getConfig();

const headingFont = localFont({
  src: "../../../public/Fredoka/static/Fredoka-Medium.ttf",
});

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

const pageTitles = [
  { title: "주방", content: ["재료 손질하기", "정리정돈 하기"] },
  { title: "운동", content: ["스쿼트 3세트", "푸쉬업 5세트", "런닝 10분하기"] },
  { title: "목표", content: ["매일 오후 7시 운동하기", "영양제 먹을 시간", "은행 가기", "집정리 하기"] },
  { title: "지출", content: ["전공서적 구매하기", "계좌 내역 확인하기", "커피 2잔 구매하기"] }
];

const Page = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);

  const id = useId();

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log("허가를 받지 못했습니다.")
      }
  })}
  
  useEffect(() => {
    requestPermission();
    
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        console.log("토큰존재", currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
        }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }, [])

    
  

  useEffect(() => {
    const initialCheckedItems: boolean[][] = [];
    pageTitles.forEach((page) => {
      const pageCheckedItems = new Array(page.content.length).fill(false);
      initialCheckedItems.push(pageCheckedItems);
    });
    setCheckedItems(initialCheckedItems);
  }, [setCheckedItems]);

  const handleClick = (index: number) => {
    setPageIndex(index);
  }

  const playSound = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[pageIndex][index] = !newCheckedItems[pageIndex][index];
    setCheckedItems(newCheckedItems);
    let audioFile = checkedItems[pageIndex][index] ? "/tap-notification-180637.mp3" : "/pop-39222.mp3";
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <header>
          <Header />
        </header>
        <div className={cn("flex justify-center mt-4 mb-4", headingFont.className)}>
          <h1 className="text-4xl">
            <div className="text-6xl">All you</div>
            <br /> 
            <div className="flex items-center ml-24 -mt-6">have to <h2 className="ml-2 text-purple-600">do</h2> <FcTodoList className="text-4xl ml-3" />
            </div>
          </h1>
        </div>
        <div className={cn("flex space-x-4 w-full h-3/4 rounded-xl border-2 border-slate-200", poppins.className)}>
          <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
            <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
              <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl"></div>
              <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
              <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
              <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
            </div>
            <Lists onClick={(index) => handleClick(index)}/>
          </article>
          <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
            <FcAcceptDatabase size="50px" />
            <h1 className="text-xl">{pageTitles[pageIndex].title}</h1>
            {
              pageTitles[pageIndex].content.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-start space-x-2 mb-5 mt-5">
                    <Checkbox
                      id={`${id}-${index}`} 
                      checked={checkedItems[pageIndex] && checkedItems[pageIndex][index]}
                      onClick={() => playSound(index)}
                      className="mr-3"
                    />
                    <Label id={`${id}-${index}`}>{item}</Label>
                  </div>
                  <hr className="w-full h-1 mt-4"/> 
                </div>
              ))
            }
          </article>
          <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
            <Image
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              src={`/images/main-${pageIndex}.jpeg`}
              alt="image"
              priority
              fill
              sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
            />
          </article>
        </div>
      </div>
    </main>
  );
};

export default Page;
