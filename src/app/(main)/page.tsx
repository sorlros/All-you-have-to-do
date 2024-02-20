"use client";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { FcTodoList } from "react-icons/fc";
import Lists from "./(_components)/lists";
import { useEffect, useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const headingFont = localFont({
  src: "../../../public/Fredoka/static/Fredoka-Medium.ttf",
});

const contentFont = localFont({
  src: "../../../public/Oxygen/Fredoka/static/Fredoka-Regular.ttf",
});

const MainPage = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  
  const pageTitles = [
    { title: "주방", content: ["재료 손질하기", "정리정돈 하기"] },
    { title: "운동", content: ["스쿼트 3세트", "푸쉬업 5세트", "런닝 10분하기"] },
    { title: "목표", content: ["매일 오후 7시 운동하기", "영양제 먹을 시간", "은행 가기", "집정리 하기"] },
    { title: "지출", content: ["전공서적 구매하기", "계좌 내역 확인하기", "커피 2잔 구매하기"] }
  ];

  const handleClick = (index: number) => {
    setPageIndex(index);
    // 페이지가 변경될 때마다 체크리스트 초기화
    setCheckedItems(new Array(pageTitles[index].content.length).fill(false));
  }

  const handleToggleCheckbox = (index: number) => {
    setCheckedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  useEffect(() => {
    console.log(pageIndex)
  })
  

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
        <div className={cn("flex space-x-4 w-full h-3/4 rounded-xl border-2 border-slate-200", contentFont.className)}>
          <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
            <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
              <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
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
                    {/* <input 
                      type="checkbox" 
                      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      checked={checkedItems[index]}
                      onClick={() => handleToggleCheckbox(index)}
                    /> */}
                    <Checkbox id={`${pageIndex}-check`}/>
                    <Label htmlFor={`${pageIndex}-check`}>{item}</Label>
                  </div>
                  <hr className="w-full h-1 mt-4"/> 
                </div>
              ))
            }
          </article>
          <article className="w-1/4 h-9/10 bg-white rounded-xl p-3">ddd</article>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
