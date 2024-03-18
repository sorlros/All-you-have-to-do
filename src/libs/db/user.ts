"use server";

import { db } from "../prisma/db";

export interface UserInfoProps {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export const createUser = async (userInfo: UserInfoProps, token: string) => {
  // console.log("받아온 userInfo", userInfo);
  if (!userInfo) {
    throw new Error("유저 정보가 없습니다.");
  }

  if (!token) {
    throw new Error("토큰이 유효하지 않습니다.");
  }

  if (typeof token !== "string") {
    throw new Error("토큰이 유효하지 않습니다.")
  }

  const { email, displayName, uid } = userInfo;

  let user;

  try {
    if (email && displayName && uid) {
      user = await db.user.findUnique({
        where: {
          uid,
        },
      });
      if (user) {
        return console.log("이미 계정이 존재해서 생성x")
      } else {
        user = await db.user.create({
          data: {
            uid,
            name: displayName,
            token,
            email
          }
        })
        console.log("유저 생성완료")
      }
    } 
  } catch (error) {
    console.error(error);
  }
  return user;
};
