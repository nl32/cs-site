import Link from "next/link";
import { getAllPostsData } from "../../lib/posts";
export default function index({ allPostsData }) {
  return (
    <>
      <p>Browse blog posts here:</p>
      <section>
        <h2>Blog Posts:</h2>
        <ul>
          {allPostsData.map(({ id, date, desc, title }) => (
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
  const allPostsData = await getAllPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
