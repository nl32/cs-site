import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
export default function Post({ postData }) {
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
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
