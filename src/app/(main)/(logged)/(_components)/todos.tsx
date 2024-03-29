"use client";

import { addTodo } from "@/actions/todos/add-todo";
import { getTitleWithTodos } from "@/actions/todos/get-title-with-todos";
import { removeTodo } from "@/actions/todos/remove-todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TitleWithTodos, TitlesWithTodos } from "@/libs/type";
import { useEffect, useId, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";

// TODO: state를 전체의 값을 불러오는 것으로 다시 변경 하고 불러와지는 값들의 순서를 db에서 재정립할지 정하기.
// 불러온 전체의 값에서 동적으로 데이터들을 출력하는것으로 server 컴포넌트 사용 최소화할 것
interface TodosProps {
  data: TitleWithTodos;
  pageIndex: number;
  userInfo: {
    token: string;
    uid: string;
  };
}

const Todos = ({ data: prevPageData, pageIndex, userInfo }: TodosProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [pageData, setPageData] = useState<TitleWithTodos>({
    title: {
      name: "",
      todos: [""],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titleWithTodos = await getTitleWithTodos(uid, pageIndex);

        if (titleWithTodos) {
          setPageData(titleWithTodos);
        }
        console.log("AAA", titleWithTodos);
      } catch (error) {
        console.log("페이지 변경중 오류 발생", error);
      }
    };
    fetchData();
  }, [pageIndex]);

  useEffect(() => {
    console.log("prevData", prevPageData);
    const initialCheckedItems: boolean[] = [];
    if (pageData) {
      const todos = pageData.title.todos;
      // console.log("todos", todos);
      if (todos.length > 0 && todos !== undefined) {
        const titleCheckedItems: boolean[] = new Array(todos.length).fill(
          false,
        );
        initialCheckedItems.push(...titleCheckedItems);
        setCheckedItems(initialCheckedItems);
      } else {
        return;
      }
    }
  }, [pageData]);

  const id = useId();
  const { token, uid } = userInfo;

  const playSound = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    let audioFile = checkedItems[index]
      ? "/tap-notification-180637.mp3"
      : "/pop-39222.mp3";
    const audio = new Audio(audioFile);
    audio.play();
  };

  const onBlur = async (
    event: React.FocusEvent<HTMLInputElement>,
    index: number,
  ) => {
    try {
      const title = pageData.title.name;
      const exTodo = pageData.title.todos[index];
      const newValue = event.target.value;

      const newPageData = { ...pageData };
      const newTodos = [...newPageData.title.todos];
      const lastItemIndex = newTodos.length - 1;
      newTodos[lastItemIndex] = newValue;

      newPageData.title.todos = newTodos;

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
      const newTodos = [...newPageData.title.todos];

      if (newTodos.length > 0 && newTodos[newTodos.length - 1] === "") {
        newTodos.splice(index, 1);
        setPageData({
          // ...newPageData,
          title: {
            name: newPageData.title.name,
            todos: newTodos,
          },
        });
        return null;
      }

      const willDeleteTodo = newTodos[index];
      // console.log("text", willDeleteTodo);

      newTodos.splice(index, 1);

      setPageData({
        title: {
          name: newPageData.title.name,
          todos: newTodos,
        },
      });

      await removeTodo(willDeleteTodo, uid);
      toast.success("Todo 제거가 완료되었습니다.");
    } catch (error) {
      console.error("todo 제거 오류");
      toast.error("Todo 제거에 실패했습니다.");
    }
  };

  return (
    <>
      {pageData.title &&
        pageData.title.todos.map((todo, index) => (
          <div key={`key-${index}-${id}`}>
            {/* <Suspense fallback={<Spinner />}> */}

            <div className="flex w-full h-[30px] justify-start space-x-2 mb-5 mt-5">
              <Checkbox
                id={`${id}-${index}`}
                checked={checkedItems[index]}
                onClick={() => playSound(index)}
                className="flex mr-3 items-center justify-center"
              />
              <Label id={`${id}-${index}`} className="w-full">
                <Input
                  defaultValue={todo}
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
            {/* </Suspense> */}
          </div>
        ))}
    </>
  );
};

export default Todos;
