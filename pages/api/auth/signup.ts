import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
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
