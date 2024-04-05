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
    throw new Error("토큰이 유효하지 않습니다.");
  }

  const { email, displayName, uid } = userInfo;

  try {
    if (email && displayName && uid) {
      const existingUser = await db.user.findUnique({
        where: {
          uid,
        },
      });
      if (existingUser) {
        return;
      } else {
        const user = await db.user.create({
          data: {
            uid,
            name: displayName,
            token,
            email,
          },
        });

        if (user) {
          const titles = await db.title.createMany({
            data: [
              { name: "주방", uid, token },
              { name: "운동", uid, token },
              { name: "목표", uid, token },
              { name: "지출", uid, token },
              { name: "기타", uid, token },
            ],
          });
          console.log("titles 생성완료", titles);
          return user;
        } else {
          console.log("user생성 오류");
        }
        console.log("유저 생성완료");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
