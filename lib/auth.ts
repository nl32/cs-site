import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "./db";
import { loginSchema } from "./validation/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "urmom@gmail.com"
        },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.users.findFirst({
          where: { email: creds.email }
        });

        if (!user) {
          return null;
        }
        const isValidPassword = await verify(
          user.hashedPassword,
          creds.password
        );
        if (!isValidPassword) return null;
        return {
          id: user.id,
          email: user.email,
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    }
  },
  jwt: {
    secret: (process.env.JWT_SECRET as string) || "",
    maxAge: 15 * 24 * 60 * 60
  },
  pages: {
    signIn: "/user/login",
    newUser: "/user/signup"
  }
};
