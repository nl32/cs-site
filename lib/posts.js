import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
const postsDirectory = path.join(process.cwd(), "posts");

export async function getAllPostIds() {
  const dbClient = await clientPromise;
  dbClient.connect();
  const posts = dbClient.db().collection("posts");
  const cursor = await posts.find();
  const list = [];
  await cursor.forEach((item) => {
    if (item == null) {
      return;
    }
    list.push({ params: { id: item._id.toString() } });
  });
  return list;
}
export async function getPostData(id) {
  const dbClient = await clientPromise;
  await dbClient.connect();
  const posts = dbClient.db().collection("posts");
  const o_id = new ObjectId(id);
  const post = await posts.findOne({ _id: o_id });
  const matterResult = matter(post.file);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    title: post.title,
    desc: post.desc,
    date: post.date,
    tags: post.tags,
    contentHtml,
  };
}
export async function getAllPostsData() {
  const dbClient = await clientPromise;
  await dbClient.connect();
  const posts = dbClient.db().collection("posts");
  let allPostsData = [];
  const cursor = posts.find();
  await cursor.forEach((doc) => {
    const matterResult = matter(doc.file);
    allPostsData.push({
      id: doc._id.toString(),
      author: doc.author,
      title: doc.title,
      desc: doc.desc,
      date: doc.date,
      tags: doc.tags,
      file: doc.file,
    });
  });
  return allPostsData;
}
