import * as trpc from "@trpc/server";
import { z } from "zod";
import argon2 from "argon2";
import { signUpSchema } from "../../lib/validation/auth";
import { Context } from "../context";
import { getUser } from "../../lib/user";

export const userRouter = trpc
  .router<Context>()
  .mutation("signup", {
    input: signUpSchema,
    async resolve({ input, ctx }) {
      const { username, email, password } = input;

      const exists = await ctx.prisma.users.findFirst({
        where: { email }
      });
      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User alreadu exists for this email."
        });
      }

      const result = await ctx.prisma.users.create({
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
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email
      };
    }
  })
  .mutation("update", {
    input: z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email()
    }),
    resolve: async ({ input, ctx }) => {
      const { name, username, email } = input;
      const updateUser = await ctx.prisma.users.update({
        where: {
          id: ctx.session?.id as string
        },
        data: {
          name: name,
          email: email,
          username: username
        }
      });
      return updateUser;
    }
  })
  .query("get", {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      return await getUser(input.id);
    }
  });

export default userRouter;
