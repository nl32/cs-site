import { NextApiRequest, NextApiResponse } from "next";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, username, email, id } = req.body;
  const updateUser = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      username: username,
    },
  });
  if (updateUser) {
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
}
