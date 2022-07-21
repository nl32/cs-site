import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps } from "next";

type postData = {
  id: string;
  title: string;
  desc: string;
  date: number;
  tags: string[];
  author: string;
  contentHtml: string;
};
export default function Post({ postData }: { postData: postData }) {
  const date = new Date();
  date.setTime(postData.date);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      By: {postData.author}
      <br />
      {date.toLocaleDateString()}
      <br />
      Tags:{" "}
      {postData.tags.map((x) => {
        return x + ", ";
      })}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  );
}
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData
    }
  };
};
