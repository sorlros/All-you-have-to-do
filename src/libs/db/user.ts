"use server";

import { db } from "../prisma/db";

export interface UserInfoProps {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export const createUser = async (userInfo: UserInfoProps) => {
  // console.log("받아온 userInfo", userInfo);
  if (!userInfo) {
    throw new Error("유저 정보가 없습니다.");
  }

  const { email, displayName, uid } = userInfo;

  let user;

  try {
    user = await db.user.findUnique({
      where: {
        uid,
      },
    });
    if (user) {
      return console.log("이미 계정이 존재해서 생성x");
    } else {
      user = await db.user.create({
        data: {
          uid,
          email,
          name: displayName,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  return user;
};
