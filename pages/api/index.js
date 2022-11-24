import { NextApiRequest, NextApiResponse } from "next";

export default (req, res) => {
  res.status(200).json({ name: "John Doe" });
}
