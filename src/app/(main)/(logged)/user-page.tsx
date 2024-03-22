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
import { db } from "@/libs/prisma/db";
import { getTodos } from "@/actions/todos/get-todos";
import useTokenStore from "@/app/hooks/use-token-store";
import { addTodo } from "@/actions/todos/add-todo";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

interface userPageProps {
  auth: Auth;
}

const UserPage = ({ auth }: userPageProps) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);
  const [content, setContent] = useState<string[]>();
  const [isEditing, setIsEditing] = useState(false);
  const [pageData, setPageData] = useState<
    Array<{ title: string; content: string[] }>
  >([
    {
      title: "",
      content: [""],
    },
  ]);

  const { token, uid, setUid } = useTokenStore();

  const id = useId();
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  if (auth.currentUser === null) {
    router.push("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUid(auth.currentUser?.uid as string);
        // const uid = auth.currentUser?.uid as string;
        const data = await getTodos({ uid, token });
        const initialCheckedItems: boolean[][] = [];

        data?.titles.forEach((title) => {
          const titleCheckedItems = new Array(title.todos.length).fill(false);
          initialCheckedItems.push(titleCheckedItems);
        });
        setCheckedItems(initialCheckedItems);

        const transformedData = data?.titles.map((title) => ({
          title: title.name,
          content: title.todos.map((todo) => todo.content),
        }));

        if (transformedData !== undefined) {
          setPageData(transformedData);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, [auth.currentUser?.uid, token]);

  // useEffect(() => {
  //   const initialCheckedItems: boolean[][] = [];
  //   pageTitles.forEach((page) => {
  //     const pageCheckedItems = new Array(page.content.length).fill(false);
  //     initialCheckedItems.push(pageCheckedItems);
  //   });
  //   setCheckedItems(initialCheckedItems);
  // }, [setCheckedItems]);

  // useEffect(() => {
  //   setContent(pageData[pageIndex].content);
  //   // console.log("page index", pageIndex);

  //   // console.log("asdasd", content);
  // }, [pageIndex, setPageIndex, content]);

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
    // const newContent = [...(content || [])];
    // newContent.push("");
    // setContent(newContent);
    // console.log(content);
    const exContent = pageData[pageIndex].content;
    exContent.push("");
    router.refresh();
  };

  const onChangeValue = (index: number) => {
    pageData[pageIndex].content[index];
  };

  const enableEditing = () => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) => {
    const title = pageData[pageIndex].title;
    const exTodo = pageData[pageIndex].content[index];

    try {
      const newValue = event.target.value;
      await addTodo({ title, newValue, exTodo, token, uid });
    } catch (error) {
      console.error("todo 생성오류");
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
            {pageData[pageIndex].title}
          </h1>
          <button onClick={handlePlusClick}>
            <LuCopyPlus size={25} className="flex justify-end mt-2" />
          </button>
        </div>

        <form action="" ref={formRef}>
          {pageData[pageIndex].content.map((item, index) => (
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
                    defaultValue={item}
                    className="text-md"
                    onClick={enableEditing}
                    onBlur={onBlur(index)}
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
