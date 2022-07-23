import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"]
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
