import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  result: Array<string>;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json({ result: ["test1", "test2"] });
}
