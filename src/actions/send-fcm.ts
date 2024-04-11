"use server";

import { db } from "@/libs/prisma/db";
import admin from "firebase-admin";
import { getMessaging } from "firebase/messaging";
// 나중에 api 호출할 때 함께 전달할 데이터
interface NotificationData {
  data: {
    uid: string;
    content: string;
    image: string;
    time: string;
  };
}

// interface Message {
//   uid: string;
//   pageIndex: number;
// }

const serviceAccount = require("/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const sendFCMNotification = async ({ data }: NotificationData) => {
  try {
    let tokenList: Array<string> = [];
    const user = await db.user.findUnique({
      where: {
        uid: data.uid,
      },
      select: {
        token: true,
      },
    });

    if (user) {
      tokenList = user.token;
    } else {
      return;
    }

    const message = {
      ...data,
      tokens: tokenList,
    };

    const response = await admin.messaging().sendMulticast(message);
    // getMessaging().sendMulticast(message)
    console.log("SUCCESS");
    console.log("RESPONSE", response);
    return response;
  } catch (error) {
    console.error("FCM 푸시 알림 실패");
  }
};
