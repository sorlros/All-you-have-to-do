import { NextApiResponse, NextApiRequest } from "next";

const setCOOPHeader =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    return handler(req, res);
  };

export default setCOOPHeader;
