/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ILogin, loginSchema } from "../lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
export default function login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema)
  });
  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", { ...data, callbackUrl: "/user/profile" });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input type="email" {...register("email")} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" {...register("password")} />
      </label>
      <input type="submit" value="login" />
    </form>
  );
}
