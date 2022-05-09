import { Collection } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { createUser } from "../../../lib/user";
/**
 * @param {import("next").NextApiRequest} req api request
 * @param {import("next").NextApiResponse} res api response
 */
export default async function signup(req, res) {
  const { username, email, password } = req.body;
  if (req.method === "POST") {
    const dbClient = await clientPromise;
    await dbClient.connect();
    const db = dbClient.db();
    /** @type {Collection} */
    const users = db.collection("users");
    const result = (
      await users.insertOne(await createUser(username, password, email))
    ).acknowledged;
    dbClient.close();
    if (result) {
      res.statusCode = 201;
      res.statusMessage = "User Created";
    } else {
      res.statusCode = 406;
    }
  } else {
    res.statusCode = 501;
  }
  res.send();
}
