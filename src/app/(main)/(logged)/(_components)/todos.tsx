"use client";

import { addTodo } from "@/actions/todos/add-todo";
import { removeTodo } from "@/actions/todos/remove-todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TitleWithTodos } from "@/libs/type";
import { useEffect, useId, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";

interface TodosProps {
  data: TitleWithTodos;
  pageIndex: number;
  userInfo: {
    token: string;
    uid: string;
  };
}

const Todos = ({ data: prevPageData, pageIndex, userInfo }: TodosProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);
  const [pageData, setPageData] = useState<TitleWithTodos>(prevPageData);

  useEffect(() => {
    console.log("asd", pageData);
  }, []);

  const id = useId();
  const { token, uid } = userInfo;

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
    <>
      {pageData.titles[pageIndex] &&
        pageData.titles[pageIndex].todos.map((todo, index) => (
          <div key={`key-${index}-${id}`}>
            {/* <Suspense fallback={<Spinner />}> */}

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
            {/* </Suspense> */}
          </div>
        ))}
    </>
  );
};

export default Todos;
