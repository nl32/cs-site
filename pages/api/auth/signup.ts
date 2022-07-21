import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, email, password } = req.body;
  if (req.method === "POST") {
    const result = await prisma.users.create({
      data: {
        email: email,
        username: username,
        hashedPassword: await argon2.hash(password),
        name: "",
        verified: false,
        admin: false,
        officer: false,
      },
    });
    if (result) {
      res.statusCode = 201;
      res.statusMessage = "User Created";
    } else {
      res.statusCode = 406;
    }
  } else {
    res.statusCode = 501;
  }
  res.send({ ok: true });
}
