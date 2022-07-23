import * as trpc from "@trpc/server";
import { Context } from "../context";

export const authRouter = trpc.router<Context>();

export default authRouter;
