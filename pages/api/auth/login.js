import argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import clientPromise from "../../../lib/mongodb";
export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const dbClient = await clientPromise;
  dbClient.connect();
  const { email, password } = req.body;
  const dbUser = await dbClient
    .db()
    .collection("users")
    .findOne({ email: email });
  console.log(email);
  console.debug(password);
  if (dbUser && (await argon2.verify(dbUser.hashedPassword, password))) {
    req.session.user = {
      username: dbUser.username,
      email: dbUser.email,
      _id: dbUser._id,
      name: dbUser.name,
    };
    dbClient.close();
    await req.session.save();
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
}, ironOptions);
