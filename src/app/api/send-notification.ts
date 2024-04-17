// 클라이언트 앱 코드
import axios from "axios";

// Firebase Functions을 호출하여 백엔드 작업 수행

interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}
const sendNotificationToBackend = async ({ data, token }: NotificationData) => {
  try {
    const response = await axios.post(
      "https://us-central1-all-you-have-to-do.cloudfunctions.net/sendNotification",
      { data, token },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      //   },
      // }
    );
    console.log("Response from backend:", response.data);
  } catch (error) {
    console.error("Error sending notification to backend:", error);
  }
};

export default sendNotificationToBackend;
