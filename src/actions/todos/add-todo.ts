"use server";

import { db } from "@/libs/prisma/db";

interface AddTodoProps {
  title: string;
  exTodo: string | undefined;
  newValue: string;
  token: string;
  uid: string;
}

export const addTodo = async ({
  title,
  exTodo,
  newValue,
  token,
  uid,
}: AddTodoProps) => {
  try {
    const titleInfo = await db.title.findFirst({
      where: {
        name: title,
        uid,
      },
    });

    if (!titleInfo) {
      throw new Error(`타이틀 '${title}'을(를) 찾을 수 없습니다.`);
    }

    if (exTodo !== undefined && titleInfo) {
      const existingTodo = await db.todo.findFirst({
        where: {
          content: exTodo,
          titleId: titleInfo.id,
        },
      });

      // exTodo가 존재하므로 업데이트
    } else if (exTodo === undefined && titleInfo) {
      // todo 생성
      const newTodo = await db.todo.create({
        data: {
          uid,
          token,
          content: newValue,
          titleId: titleInfo.id,
          //scheduleId 추가 혹은 옵셔널 체크
        },
      });
    }
  } catch (error) {
    throw new Error("todo생성 오류발생");
  }
};
