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
import { TitleWithTodos } from "@/libs/type";
import { removeTodo } from "@/actions/todos/remove-todo";
import { toast } from "sonner";

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
  const userInfo = { token, uid };

  const id = useId();

  // const formRef = useRef<ElementRef<"form">>(null);
  // const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await verifyToken();
        if (token) {
          setToken(token);
        }
        console.log("token", token);
        setUid(auth.currentUser?.uid as string);

        // const uid = auth.currentUser?.uid as string;
        const userData = await getTodos({ uid, token });
        // setPageData(userData);
        // console.log("data", userData);
        const initialCheckedItems: boolean[][] = [];
        const todos = userData.titles[0].todos;

        if (todos.length > 0) {
          userData?.titles.forEach((title) => {
            const titleCheckedItems = new Array(title.todos.length).fill(false);
            initialCheckedItems.push(titleCheckedItems);
          });
          setCheckedItems(initialCheckedItems);
        } else {
          return;
        }

        setPageData(userData);
        console.log("1111111111111111111");
      } catch (error) {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = async (index: number) => {
    try {
      const userData = await getTodos({ uid, token });
      await setPageData(userData);

      setPageIndex(index);
      console.log("pageData", pageData.titles);
    } catch (error) {
      console.log("페이지 변경중 오류 발생", error);
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
    const newPageData = { ...pageData };
    const newTodos = [...newPageData.titles[pageIndex].todos];
    // console.log("newTodos", newTodos);

    try {
      if (newTodos.length > 0 && newTodos[newTodos.length - 1].content === "") {
        return toast.error("이미 생성된 메모가 공백 상태입니다.");
      } else {
        newTodos.push({
          content: "",
        });
        newPageData.titles[pageIndex].todos = newTodos;
        setPageData(newPageData);

        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const onBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) => {
    try {
      const title = pageData.titles[pageIndex].name;
      const exTodo = pageData.titles[pageIndex].todos[index].content;
      const newValue = event.target.value;

      const newPageData = { ...pageData };
      const newTodos = [...newPageData.titles[pageIndex].todos];
      const lastItemIndex = newTodos.length - 1;
      newTodos[lastItemIndex].content = newValue;

      newPageData.titles[pageIndex].todos = newTodos;

      // console.log("재료", { title, newValue, exTodo, token, uid });

      const afterTodo = await addTodo({ title, newValue, exTodo, token, uid });
      setPageData(newPageData);
      toast.success(afterTodo?.message);
    } catch (error) {
      // console.error("todo 생성오류", error);
      toast.error("Todo 생성에 실패했습니다.");
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const newPageData = { ...pageData };
      const newTodos = [...newPageData.titles[pageIndex].todos];

      if (newTodos.length > 0 && newTodos[newTodos.length - 1].content === "") {
        newTodos.splice(index, 1);
        setPageData({
          ...newPageData,
          titles: [
            {
              ...newPageData.titles[pageIndex],
              todos: newTodos,
            },
          ],
        });
        return null;
      }

      const willDeleteTodo = newTodos[index].content;
      // console.log("text", willDeleteTodo);

      newTodos.splice(index, 1);

      setPageData({
        ...newPageData,
        titles: [
          {
            ...newPageData.titles[pageIndex],
            todos: newTodos,
          },
        ],
      });

      await removeTodo(willDeleteTodo, uid);
      toast.success("Todo 제거가 완료되었습니다.");
    } catch (error) {
      console.error("todo 제거 오류");
      toast.error("Todo 제거에 실패했습니다.");
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
        <Lists onClick={(index) => handlePageChange(index)} />
        {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
      </article>
      <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
        <div className="flex justify-between -ml-2">
          <FcAcceptDatabase size="50px" />
          <h1 className="flex-1 text-2xl items-center ml-2 mt-2">
            {pageData.titles[pageIndex] && pageData.titles[pageIndex].name}
          </h1>
          <button onClick={handlePlusClick}>
            <LuCopyPlus size={25} className="flex justify-end mt-2" />
          </button>
        </div>

        <Suspense fallback={<Spinner />}>
          {pageData.titles[pageIndex] &&
            pageData.titles[pageIndex].todos.map((todo, index) => (
              <div key={`key-${index}-${id}`}>
                <div className="flex w-full h-[30px] justify-start space-x-2 mb-5 mt-5">
                  <Checkbox
                    id={`${id}-${index}`}
                    checked={
                      checkedItems[pageIndex] && checkedItems[pageIndex][index]
                    }
                    onClick={() => playSound(index)}
                    className="flex mr-3 items-center justify-center"
                  />
                  <Label id={`${id}-${index}`} className="w-full">
                    <Input
                      defaultValue={todo.content}
                      // !== null ? todo.content : ""
                      className="text-md"
                      // onClick={(event, index) => enableEditing(index)}
                      onBlur={(event) => onBlur(event, index)}
                    />
                  </Label>
                  <div
                    className="flex justify-end items-center cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineClose />
                  </div>
                </div>

                <hr className="w-full h-1 mt-4" />
              </div>
            ))}
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
