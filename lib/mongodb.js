import { MongoClient } from "mongodb";
const url = process.env.DB_URI;
const options = {};
let client;
/** @type {MongoClient} */
let clientPromise;
const db = "mhscs";
if (!url) {
  throw new Error("Please enter url");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
}

/**
 * @type {MongoClient} promise for db access
 */
export default clientPromise;
