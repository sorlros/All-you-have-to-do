import { NextApiRequest, NextApiResponse } from "next";
import { sendFCMNotification } from "./send-fcm";

const setCOOPHeader =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    return handler(req, res);
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { message } = req.body;
    await sendFCMNotification(message)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => console.log(error));
  } else {
    res.status(405).end();
  }
};

export default setCOOPHeader(handler);
