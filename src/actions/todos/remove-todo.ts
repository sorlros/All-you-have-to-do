"use server";

import { db } from "@/libs/prisma/db";

export const removeTodo = async (lastItem: string, uid: string) => {
  console.log("serveritem", lastItem, uid);
  try {
    await db.todo.delete({
      where: {
        uid,
        content: lastItem,
      },
    });
    console.log("todo 제거 완료");
  } catch (error) {
    console.error("error", error);
    throw new Error("todo 제거 실패");
  }
};
