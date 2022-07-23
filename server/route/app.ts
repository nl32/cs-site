import * as trpc from "@trpc/server";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { postRouter } from "./post";
import { Context } from "../context";
export default trpc
  .router<Context>()
  .merge("auth.", authRouter)
  .merge("post.", postRouter)
  .merge("user.", userRouter);
