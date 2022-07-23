import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/context";
import appRouter from "../../../server/route/app";

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
});
