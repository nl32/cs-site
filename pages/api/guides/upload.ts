import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from "next";
export default withIronSessionApiRoute(upload, ironOptions);
async function upload(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    if (req.method === "POST") {
      const { title, desc, file, tags } = req.body;
      const user = req.session.user;
      const post = await prisma.posts.create({
        data: {
          author: user.id,
          title: title,
          description: desc,
          date: Date.now(),
          tags: tags,
          file: file,
        },
      });
      res.statusCode = 201;
      res.statusMessage = "Post Created";
      res.send({ ok: true });
    }
  }
}
