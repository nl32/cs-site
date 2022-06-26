import { prisma } from "./db";
export async function getUser(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return {
    username: user.username,
    email: user.email,
    id: id,
    name: user.name,
  };
}
