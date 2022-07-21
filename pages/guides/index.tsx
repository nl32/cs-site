import Link from "next/link";
import { getAllPublishedPosts } from "../../lib/posts";
export default function index({ allPostsData }:any) {
  return (
    <>
      <p>
        <Link href="/guides/upload">
          <a>upload post</a>
        </Link>
      </p>
      <p>Browse blog posts here:</p>
      <section>
        <h2>Blog Posts:</h2>
        <ul>
          {allPostsData.map(({ id, date, desc, title }:{id:string,date:number,desc:string,title:string}) => (
            <li key={id}>
              <Link href={`/guides/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {desc}
              <br />
              {new Date(date).toLocaleDateString("en-us")}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
export async function getStaticProps() {
  const allPostsData = await getAllPublishedPosts();
  return {
    props: {
      allPostsData
    }
  };
}
