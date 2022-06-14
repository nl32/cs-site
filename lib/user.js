import argon2 from "argon2";
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
export async function createUser(username, password, email) {
  const hash = await argon2.hash(password);
  return {
    username: username,
    hashedPassword: hash,
    email: email,
  };
}
export async function getUser(id) {
  const dbClient = await clientPromise;
  await dbClient.connect();
  const users = dbClient.db().collection("users");
  const user = await users.findOne({ _id: new ObjectId(id) });
  return {
    username: user.username,
    email: user.email,
    _id: id,
    name: user.name ? user.name : "",
  };
}
