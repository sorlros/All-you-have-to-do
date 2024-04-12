"use server";

import { db } from "@/libs/prisma/db";
import admin from "firebase-admin";
import { MessagePayload, getMessaging } from "firebase/messaging";
// 나중에 api 호출할 때 함께 전달할 데이터
// interface NotificationData {
//   data: {
//     uid: string;
//     content: string;
//     image: string;
//     time: string;
//   };
// }

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    icon: string;
  };
}

interface UserData {
  uid: string;
}

const serviceAccount = require("/serviceAccountKey.json");
let firebaseApp: admin.app.App;

const initializeFirebaseApp = () => {
  if (!admin.apps.length) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    firebaseApp = admin.app(); // 이미 초기화된 앱을 재사용합니다.
  }
};

export const sendFCMNotification = async (
  { data }: NotificationData,
  uid: string,
) => {
  try {
    initializeFirebaseApp();

    let tokenList: Array<string> = [];
    const user = await db.user.findUnique({
      where: {
        uid,
      },
      select: {
        token: true,
      },
    });

    if (user) {
      tokenList = user.token;
      // console.log("토큰 리스트", tokenList);
    } else {
      return;
    }

    const message = {
      ...data,
      tokens: tokenList,
    };

    const response = await admin.messaging().sendMulticast(message);
    // getMessaging().sendMulticast(message)

    // console.log("RESPONSE", response);
    // if (response) {
    //   console.log("response error", response.responses[0].error);
    // }
    return response;
  } catch (error) {
    console.error("FCM 푸시 알림 실패");
    console.error(error);
  }
};
