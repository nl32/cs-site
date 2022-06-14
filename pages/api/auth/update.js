import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

/**
 * @param {import("next").NextApiRequest} req api request
 * @param {import("next").NextApiResponse} res api response
 */
export default async function update(req, res) {
  const { name, username, email, id } = req.body;
  const oId = new ObjectId(id);
  const dbClient = await clientPromise;
  await dbClient.connect();
  const users = dbClient.db().collection("users");
  const result = await users.findOneAndUpdate(
    { _id: oId },
    { $set: { name: name, username: username, email: email } }
  );
  if (result.ok) {
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
}
