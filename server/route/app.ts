import * as trpc from "@trpc/server";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { postRouter } from "./post";
export default trpc
  .router()
  .merge("auth.", authRouter)
  .merge("post.", postRouter)
  .merge("user.", userRouter);
