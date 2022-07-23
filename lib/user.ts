import { prisma } from "./db";
export async function getUser(id: string) {
  const user = await prisma.users.findUnique({
    where: {
      id: id
    }
  });
  return {
    username: user?.username,
    email: user?.email,
    id: id,
    name: user?.name
  };
}
