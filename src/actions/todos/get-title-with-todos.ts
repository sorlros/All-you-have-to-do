"use server";

import { db } from "@/libs/prisma/db";

export const getTitleWithTodos = async (uid: string, pageIndex: number) => {
  let todos;
  
  let title: string;

  if (pageIndex !== null && pageIndex >= 0 && pageIndex <= 4) {
    switch(pageIndex) {
      case 0: title = "주방"; break;
      case 1: title = "운동"; break;
      case 2: title = "목표"; break;
      case 3: title = "지출"; break;
      case 4: title = "기타"; break;
      default: title = ""; // 처리되지 않은 경우
    }
  } else {
    title = ""; // 유효하지 않은 pageIndex인 경우
  }

  // const titleId = await db.title.findUnique({
  //   where: {
  //     name: title,
  //     uid,
  //   },
  // });
  
  //prisma 수정??
  

  try {
    todos = await db.title.findUnique({
      where: {
        id,
        uid
      },
      include: {
        todos: true,
      },
    })
  }
}