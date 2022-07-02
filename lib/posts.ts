import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postsDirectory = path.join(process.cwd(), "posts");
import { prisma } from "./db";
export async function getAllPostIds() {
  const posts = await prisma.posts.findMany({
    select: {
      id: true,
    },
  });
  const ids = posts.map((x) => {
    return {
      params: {
        id: x.id,
      },
    };
  });
  console.log(ids);
  return ids;
}
export async function getPostData(id: string) {
  const post = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
  const matterResult = matter(post.file);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const user = await prisma.users.findUnique({ where: { id: post.author } });
  return {
    id,
    title: post.title,
    desc: post.description,
    date: post.date,
    tags: post.tags,
    author: user.name,
    published: post.published,
    contentHtml,
  };
}
export async function getAllPostsData() {
  const posts = await prisma.posts.findMany();
  return posts;
}
export async function getAllPublishedPosts() {
  const posts = await prisma.posts.findMany({
    where: {
      published: true,
    },
  });
  return posts;
}
