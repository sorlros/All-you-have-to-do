import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();

const app = express();

// CORS 설정

const corsOptions = {
  origin: [
    // "https://us-central1-all-you-have-to-do.cloudfunctions.net/sendNotification",
    "https://us-central1-all-you-have-to-do.cloudfunctions.net",
    /firebase\.com$/,
    "http://localhost:3000",
  ], // 허용할 도메인 또는 정규 표현식의 목록
};
app.use(cors(corsOptions));

// 클라이언트로 메시지 전송
app.post("/sendNotification", async (req, res) => {
  try {
    const { data, token } = req.body;

    // const message = {
    //   notification: {
    //     title: data.title,
    //     body: data.body,
    //   },
    // };

    let message = {
      data: {
        title: data.title,
        body: data.body,
        image: data.image,
        time: data.time,
      },
      token: token,
    };

    // 클라이언트로 메시지 전송
    const response = await admin.messaging().send(message);

    if (response) {
      console.log("메세지 전송완료");
    }

    console.log("Notification sent successfully:", response);
    res.send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Error sending notification");
  }
});

export const sendNotification = functions.https.onRequest(app);
