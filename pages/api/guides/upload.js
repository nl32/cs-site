import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import clientPromise from "../../../lib/mongodb";
import fs from "fs";
export default withIronSessionApiRoute(upload, ironOptions);
/**
 * @param {import("next").NextApiRequest} req api request
 * @param {import("next").NextApiResponse} res api response
 */
async function upload(req, res) {
  if (req.session.user) {
    if (req.method === "POST") {
      const { title, desc, file, tags } = req.body;
      const user = req.session.user;
      const dbClient = await clientPromise;
      dbClient.connect();
      const posts = dbClient.db().collection("posts");
      console.log(file);
      const newPost = {
        author: user._id,
        title: title,
        desc: desc,
        date: Date.now(),
        tags: tags,
        file: file,
      };
      await posts.insertOne(newPost);
      res.statusCode = 201;
      res.statusMessage = "Post Created";
      res.send();
    }
  }
}
