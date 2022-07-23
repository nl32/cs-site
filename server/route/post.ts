import * as trpc from "@trpc/server";
import { z } from "zod";
import { getUser } from "../../lib/user";
import { Context } from "../context";
export const postRouter = trpc.router<Context>().mutation("upload", {
  input: z.object({
    title: z.string(),
    desc: z.string(),
    file: z.string(),
    tags: z.array(z.string())
  }),
  resolve: async ({ input, ctx }) => {
    const { title, desc, file, tags } = input;
    const user = await getUser(ctx.session?.id as string);
    await prisma.posts.create({
      data: {
        author: user.id,
        title: title,
        description: desc,
        date: Date.now(),
        tags: tags,
        file: file,
        published: false
      }
    });
    return {
      status: 201,
      message: "Post Created."
    };
  }
});

export default postRouter;
