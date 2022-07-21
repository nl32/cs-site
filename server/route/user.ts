import * as trpc from "@trpc/server";
import { z } from "zod";
import argon2 from "argon2";
import { prisma } from "../../lib/db";

export const userRouter = trpc.router().mutation("signup", {
  input: z.object({
    username: z.string().min(3).max(12),
    email: z.string().email(),
    password: z.string().min(5).max(32)
  }),
  async resolve({ input }) {
    const { username, email, password } = input;
    const result = await prisma.users.create({
      data: {
        email: email,
        username: username,
        hashedPassword: await argon2.hash(password),
        name: "",
        verified: false,
        admin: false,
        officer: false
      }
    });
    return result;
  }
});

export default userRouter;
