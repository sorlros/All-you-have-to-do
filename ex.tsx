// "use client";

// import { cn } from "@/libs/utils";
// import localFont from "next/font/local";
// import { FcTodoList } from "react-icons/fc";
// import Lists from "./(_components)/lists";
// import { useEffect, useId, useState } from "react";
// import { FcAcceptDatabase } from "react-icons/fc";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import { Poppins } from "next/font/google";

// import { getApps, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import "firebase/compat/messaging";
// import { firebaseConfig } from "@/config/firebase-config";

// import Header from "./(_components)/header";
// import UserPage from "./(logged)/page";

// const headingFont = localFont({
//   src: "../../../public/Fredoka/static/Fredoka-Medium.ttf",
// });

// const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

// const pageTitles = [
//   { title: "주방", content: ["재료 손질하기", "정리정돈 하기"] },
//   { title: "운동", content: ["스쿼트 3세트", "푸쉬업 5세트", "런닝 10분하기"] },
//   {
//     title: "목표",
//     content: [
//       "매일 오후 7시 운동하기",
//       "영양제 먹을 시간",
//       "은행 가기",
//       "집정리 하기",
//     ],
//   },
//   {
//     title: "지출",
//     content: ["전공서적 구매하기", "계좌 내역 확인하기", "커피 2잔 구매하기"],
//   },
// ];

// getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// const Page = () => {
//   const [pageIndex, setPageIndex] = useState<number>(0);
//   const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);

//   const id = useId();
//   const auth = getAuth();

//   useEffect(() => {
//     const initialCheckedItems: boolean[][] = [];
//     pageTitles.forEach((page) => {
//       const pageCheckedItems = new Array(page.content.length).fill(false);
//       initialCheckedItems.push(pageCheckedItems);
//     });
//     setCheckedItems(initialCheckedItems);
//   }, [setCheckedItems]);

//   const handleClick = (index: number) => {
//     setPageIndex(index);
//   };

//   const playSound = (index: number) => {
//     const newCheckedItems = [...checkedItems];
//     newCheckedItems[pageIndex][index] = !newCheckedItems[pageIndex][index];
//     setCheckedItems(newCheckedItems);
//     let audioFile = checkedItems[pageIndex][index]
//       ? "/tap-notification-180637.mp3"
//       : "/pop-39222.mp3";
//     const audio = new Audio(audioFile);
//     audio.play();
//   };

//   const sendMessage = () => {
//     const title = "타이틀";
//     const body = "바디";
//     // const icon = "";
//     const options = { body };

//     new Notification(title, options);
//   };

//   const btnClickHandler = async () => {
//     try {
//       const result = await Notification.requestPermission();
//       if (result === "granted") {
//         sendMessage();
//       } else {
//         console.log("알림 권한이 거부되었습니다.");
//       }
//     } catch (error) {
//       console.error("알림 권한을 요청하는 동안 오류가 발생했습니다.", error);
//     }
//   };

//   return (
//     <main className="bg-slate-100 w-full h-full">
//       <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
//         <header>
//           <Header auth={auth} />
//         </header>
//         <div
//           className={cn("flex justify-center mt-4 mb-4", headingFont.className)}
//         >
//           <h1 className="text-4xl">
//             <div className="text-6xl">All you</div>
//             <br />
//             <div className="flex items-center ml-24 -mt-6">
//               have to
//               <h2 className="ml-2 text-purple-600">do</h2>
//               <FcTodoList className="text-4xl ml-3" />
//             </div>
//           </h1>
//         </div>
//         {auth.currentUser === null ? (
//           <div
//             className={cn(
//               "flex space-x-4 w-full h-3/4 rounded-xl",
//               poppins.className,
//             )}
//           >
//             <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
//               <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
//                 <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
//                 <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
//                 <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
//                 <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
//               </div>
//               <Lists onClick={(index) => handleClick(index)} />
//               {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
//             </article>
//             <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
//               <FcAcceptDatabase size="50px" />
//               <h1 className="text-xl">{pageTitles[pageIndex].title}</h1>
//               {pageTitles[pageIndex].content.map((item, index) => (
//                 <div key={index}>
//                   <div className="flex justify-start space-x-2 mb-5 mt-5">
//                     <Checkbox
//                       id={`${id}-${index}`}
//                       checked={
//                         checkedItems[pageIndex] &&
//                         checkedItems[pageIndex][index]
//                       }
//                       onClick={() => playSound(index)}
//                       className="mr-3"
//                     />
//                     <Label id={`${id}-${index}`}>{item}</Label>
//                   </div>
//                   <hr className="w-full h-1 mt-4" />
//                 </div>
//               ))}
//             </article>
//             <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
//               <Image
//                 className="absolute inset-0 w-full h-full object-cover rounded-xl"
//                 src={`/images/main-${pageIndex}.jpeg`}
//                 alt="image"
//                 priority
//                 fill
//                 sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
//               />
//             </article>
//           </div>
//         ) : (
//           <UserPage />
//         )}
//       </div>
//     </main>
//   );
// };

// export default Page;

// 기존 page
