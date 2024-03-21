"use server";

import { db } from "@/libs/prisma/db";

interface GetTodos {
  uid: string;
  token?: string;
}

export const getTodos = async ({ uid, token }: GetTodos) => {
  try {
    const usersWithData = await db.user.findUnique({
      where: {
        uid,
      },
      include: {
        titles: {
          include: {
            todos: true,
          },
        },
      },
    });
    console.log("data", usersWithData);
    return usersWithData;
  } catch (error) {
    console.error("유저의 todos 정보를 불러오지 못했습니다.", error);
    throw error;
  }
};
