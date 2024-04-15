import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { message } = req.body;
      console.log("POST");
    }

    if (req.method === "GET") {
      console.log("GET");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
