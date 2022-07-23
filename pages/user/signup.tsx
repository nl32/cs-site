/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUp, signUpSchema } from "../../lib/validation/auth";

export default function signup(props: any) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema)
  });
  const { mutateAsync } = trpc.useMutation("user.signup");
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push("/");
      }
    },
    [mutateAsync, router]
  );

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">username:</label>
          <input type="text" id="" {...register("username")} />
          <br />
          <label htmlFor="email">email:</label>
          <input type="email" id="" {...register("email")} />
          <br />
          <label htmlFor="password">password:</label>
          <input type="password" id="" {...register("password")} />
          <br />
          <input type="submit" value="Create account" />
        </form>
      </div>
    </>
  );
}
