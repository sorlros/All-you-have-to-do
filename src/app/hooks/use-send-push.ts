import axios from "axios";

interface SendPushProps {
  uid: string;
  content: string;
  image: string;
  time: string;
}

//수정할것
const useSendPush = () => {
  const sendPush = async ({ uid, content, image, time }: SendPushProps) => {
    const message = {
      data: {
        uid,
        content,
        image: "/images/logo.png",
        time,
      },
    };
    // const url = `${window?.location?.origin}/api/send-fcm`;
    // console.log("url", url);

    axios.request({
      method: "POST",
      // url: window?.location?.origin + "api/send-fcm",
      url: `${window?.location?.origin}/api/send-fcm`,
      data: { message },
    });
  };

  return sendPush;
};

export default useSendPush;
