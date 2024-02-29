// 나중에 api 호출할 때 함께 전달할 데이터
interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  }
}

const admin = require("firebase-admin");

const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount = require("/serviceAccountKey.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 토큰 불러오기
  // 앞서 푸시 권한과 함께 발급받아 저장해둔 토큰들을 모조리 불러온다. 
  // 본인에게 익숙한 방법으로 저장하고 불러오면 된다.
  // 내 경우 firestore에 저장하고 불러오도록 했다.
  let tokenList: Array<string> = []
  const docRef = doc(db, "subscribe", "tokens");
  
  await getDoc(docRef).then((doc) => {
    tokenList = doc?.data()?.list;
  });
  
  if (tokenList.length === 0) return;

  // 푸시 데이터
  // api 호출할 때 받아올 데이터와 방금 불러온 토큰
  const notificationData = {
    ...data,
    tokens: tokenList
  }

  // 푸시 발송
  // sendMulticast()는 여러개의 토큰으로 푸시를 전송한다.
  // 외에도 단일 토큰에 발송하는 등의 다양한 메소드 존재
  const res = await admin
    .messaging()
    .sendMulticast(notificationData);

  return res;
};