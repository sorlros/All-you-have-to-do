"use client";

import { cn } from "@/libs/utils";
import { Poppins } from "next/font/google";
import Lists from "../(_components)/lists";
import { FcAcceptDatabase } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ElementRef,
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Spinner } from "@/components/spinner";
import { verifyToken } from "@/libs/firebase/get-token";
import { LuCopyPlus } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Auth } from "firebase/auth";
import { getTodos } from "@/actions/todos/get-todos";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { addTodo } from "@/actions/todos/add-todo";
import { TitleWithTodos, TitlesWithTodos } from "@/libs/type";
import { removeTodo } from "@/actions/todos/remove-todo";
import { toast } from "sonner";
import Todos from "./(_components)/todos";
import { getTitleWithTodos } from "@/actions/todos/get-title-with-todos";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

interface userPageProps {
  auth: Auth;
}

const UserPage = ({ auth }: userPageProps) => {
  const router = useRouter();

  if (auth.currentUser === null) {
    router.push("/");
  }

  const uid = auth.currentUser?.uid as string;

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const [pageData, setPageData] = useState<TitlesWithTodos>({
    titles: [
      { name: "주방", todos: [""] },
      { name: "운동", todos: [""] },
      { name: "목표", todos: [""] },
      { name: "지출", todos: [""] },
      { name: "기타", todos: [""] },
    ],
  });

  const [titleTodos, setTitleTodos] = useState<TitleWithTodos>({
    title: {
      name: "",
      todos: [""],
    },
  });

  const { token, setUid, setToken } = useTokenWithUidStore();
  const userInfo = { token, uid };

  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await verifyToken();
      if (token) {
        setToken(token);
      } else {
        return console.error("토큰 오류");
      }
    };
    getToken();
  }, [uid, setToken]);

  useEffect(() => {
    const uid = auth.currentUser?.uid as string;
    const fetchData = async () => {
      try {
        setUid(auth.currentUser?.uid as string);

        const userData = await getTitleWithTodos(uid, pageIndex);
        if (userData) {
          setTitleTodos(userData);
        }
        // console.log("data", userData);
        const initialCheckedItems: boolean[] = [];
        const todos = userData.title.todos;

        if (todos.length > 0) {
          const titleCheckedItems: boolean[] = new Array(todos.length).fill(
            false,
          );
          initialCheckedItems.push(...titleCheckedItems);
          setCheckedItems(initialCheckedItems);
        } else {
          return;
        }
      } catch (error) {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, [uid, pageIndex]);

  const handlePageChange = (index: number) => {
    setPageIndex(index);
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
        <Lists onClick={(index) => handlePageChange(index)} />
        {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
      </article>
      <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8 relative">
        <div className="flex justify-between -ml-2">
          <FcAcceptDatabase size="50px" />
          <h1 className="flex-1 text-2xl items-center ml-2 mt-2">
            {pageData.titles[pageIndex] && pageData.titles[pageIndex].name}
          </h1>
        </div>

        <Suspense fallback={<Spinner />}>
          <Todos pageIndex={pageIndex} userInfo={userInfo} />
        </Suspense>
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
