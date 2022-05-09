import Link from "next/link";
import { getAllPostsData } from "../../lib/posts";
export default function index({ allPostsData }) {
  return (
    <>
      <p>Browse blog posts here:</p>
      <section>
        <h2>Blog Posts:</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/guides/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
export async function getStaticProps() {
  const allPostsData = getAllPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
