"use client";

import { cn } from "@/libs/utils";
import { Poppins } from "next/font/google";
import Lists from "../(_components)/lists";
import { FcAcceptDatabase } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Suspense, useEffect, useId, useState } from "react";
import { Spinner } from "@/components/spinner";
import { verifyToken } from "@/libs/firebase/get-token";
import { LuCopyPlus } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Auth } from "firebase/auth";
import { db } from "@/libs/prisma/db";
import { getTodos } from "@/actions/todos/get-todos";
import useTokenStore from "@/app/hooks/use-token-store";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

const pageTitles = [
  { title: "주방", content: ["재료 손질하기", "정리정돈 하기"] },
  { title: "운동", content: ["스쿼트 3세트", "푸쉬업 5세트", "런닝 10분하기"] },
  {
    title: "목표",
    content: [
      "매일 오후 7시 운동하기",
      "영양제 먹을 시간",
      "은행 가기",
      "집정리 하기",
    ],
  },
  {
    title: "지출",
    content: ["전공서적 구매하기", "계좌 내역 확인하기", "커피 2잔 구매하기"],
  },
  {
    title: "기타",
    content: [],
  },
];

interface userPageProps {
  auth: Auth;
}

const UserPage = ({ auth }: userPageProps) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);
  const [content, setContent] = useState<string[]>();

  const { token, setToken } = useTokenStore();

  const id = useId();
  const router = useRouter();

  if (auth.currentUser === null) {
    router.push("/");
  }

  useEffect(() => {
    const uid = auth.currentUser?.uid as string;
    const fetchData = async () => {
      if (uid) {
        const data = await getTodos({ uid, token });
        // toto: 반환받은 data 저장소에 저장 하고 후에 뿌려주기
      }
    };
  }, []);

  useEffect(() => {
    const initialCheckedItems: boolean[][] = [];
    pageTitles.forEach((page) => {
      const pageCheckedItems = new Array(page.content.length).fill(false);
      initialCheckedItems.push(pageCheckedItems);
    });
    setCheckedItems(initialCheckedItems);
  }, [setCheckedItems]);

  useEffect(() => {
    setContent(pageTitles[pageIndex].content);
    // console.log("page index", pageIndex);
    // console.log("asdasd", content);
  }, [pageIndex, setPageIndex, content]);

  const handleClick = async (index: number) => {
    setPageIndex(index);

    setContent(pageTitles[index].content);

    const uid = auth.currentUser?.uid as string;
    if (uid) {
      const data = await getTodos({ uid, token });
      console.log("asdasd", data);
      setContent();
    }
  };

  const playSound = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[pageIndex][index] = !newCheckedItems[pageIndex][index];
    setCheckedItems(newCheckedItems);
    let audioFile = checkedItems[pageIndex][index]
      ? "/tap-notification-180637.mp3"
      : "/pop-39222.mp3";
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handlePlusClick = () => {
    const newContent = [...(content || [])];
    newContent.push("");
    setContent(newContent);
    console.log(content);
  };

  return (
    <div
      className={cn(
        "flex space-x-4 w-full h-3/4 rounded-xl",
        poppins.className,
      )}
    >
      <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
        <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
        </div>
        <Lists onClick={(index) => handleClick(index)} />
        {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
      </article>
      <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
        <div className="flex justify-between -ml-2">
          <FcAcceptDatabase size="50px" />
          <h1 className="flex-1 text-2xl items-center ml-2 mt-2">
            {pageTitles[pageIndex].title}
          </h1>
          <button onClick={handlePlusClick}>
            <LuCopyPlus size={25} className="flex justify-end mt-2" />
          </button>
        </div>
        {pageTitles[pageIndex].content.map((item, index) => (
          <div key={index}>
            <div className="flex w-full h-[30px] justify-start space-x-2 mb-5 mt-5">
              <Checkbox
                id={`${id}-${index}`}
                checked={
                  checkedItems[pageIndex] && checkedItems[pageIndex][index]
                }
                onClick={() => playSound(index)}
                className="flex mr-3 items-center justify-center"
              />
              <Label id={`${id}-${index}`}>
                <Input value={item} className="text-md" onChange={() => {}} />
              </Label>
            </div>
            <hr className="w-full h-1 mt-4" />
          </div>
        ))}
        {/* TODO: content추가를 위한 +버튼 만들기 해당 버튼은 클릭시 해당 pageTitles의 content에 "" 빈문자열 데이터를 추가하며 setContent를 통해서도 빈문자열 데이터가 추가되어야한다. 해당 input태그 클릭시 수정이 가능해야하며 setContent로 해당 데이터를 변경하게 코드 생성. 이후 제거버튼(해당 index값을 이용)도 구현 */}
      </article>
      <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
        <Suspense fallback={<Spinner />}>
          <Image
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            src={`/images/main-${pageIndex}.jpeg`}
            alt="image"
            priority
            fill
            sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
          />
        </Suspense>
      </article>
    </div>
  );
};

export default UserPage;
