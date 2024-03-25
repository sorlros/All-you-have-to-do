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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Auth } from "firebase/auth";
import { getTodos } from "@/actions/todos/get-todos";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { addTodo } from "@/actions/todos/add-todo";
import { TitleWithTodos } from "@/libs/type";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

interface userPageProps {
  auth: Auth;
}

const UserPage = ({ auth }: userPageProps) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);

  const [pageData, setPageData] = useState<TitleWithTodos>({
    titles: [
      {
        name: "",
        todos: [{ content: "" }],
      },
    ],
  });

  const { token, setUid, setToken } = useTokenWithUidStore();

  const id = useId();
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  if (auth.currentUser === null) {
    router.push("/");
  }

  const uid = auth.currentUser?.uid as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await verifyToken();
        setUid(auth.currentUser?.uid as string);

        // const uid = auth.currentUser?.uid as string;
        const userData = await getTodos({ uid, token });
        setPageData(userData);
        // console.log("data", userData);
        const initialCheckedItems: boolean[][] = [];

        userData?.titles.forEach((title) => {
          const titleCheckedItems = new Array(title.todos.length).fill(false);
          initialCheckedItems.push(titleCheckedItems);
        });
        setCheckedItems(initialCheckedItems);
      } catch (error) {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, [auth.currentUser?.uid, token]);

  useEffect(() => {
    console.log(uid);
  }, [uid]);

  const handleClick = async (index: number) => {
    setPageIndex(index);
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
    const newPageData = { ...pageData }; // pageData의 복사본을 만듭니다.
    const newTodos = [...newPageData.titles[pageIndex].todos]; // 해당 페이지의 할 일 목록의 복사본을 만듭니다.
    newTodos.push({
      content: "",
    }); // 빈 할 일을 추가합니다.
    newPageData.titles[pageIndex].todos = newTodos; // 새로운 할 일 목록을 페이지 데이터에 할당합니다.
    setPageData(newPageData); // 변경된 페이지 데이터를 상태에 업데이트합니다.
  };

  const onChangeValue = (index: number) => {
    pageData.titles[pageIndex].todos[index];
  };

  const enableEditing = () => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) => {
    try {
      const title = pageData.titles[pageIndex].name;
      const exTodo = pageData.titles[pageIndex].todos[index].content;
      const newValue = event.target.value;

      console.log("재료", { title, newValue, exTodo, token, uid });
      await addTodo({ title, newValue, exTodo, token, uid });
    } catch (error) {
      console.error("todo 생성오류", error);
    }
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
            {pageData.titles[pageIndex].name}
          </h1>
          <button onClick={handlePlusClick}>
            <LuCopyPlus size={25} className="flex justify-end mt-2" />
          </button>
        </div>

        <form action="" ref={formRef}>
          {pageData.titles[pageIndex].todos.map((todo, index) => (
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
                  <Input
                    ref={inputRef}
                    defaultValue={todo.content}
                    className="text-md"
                    onClick={enableEditing}
                    onBlur={(event) => onBlur(event, index)}
                  />
                </Label>
              </div>
              <hr className="w-full h-1 mt-4" />
            </div>
          ))}
        </form>
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
