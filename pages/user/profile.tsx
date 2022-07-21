/* eslint-disable react-hooks/rules-of-hooks */
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { getUser } from "../../lib/user";
import Profile from "../../components/Profile";
import Link from "next/link";
import { useRouter } from "next/router";
export default function profile({ user }) {
  const router = useRouter();
  if (!user) {
    router.push("/login");
    return <></>;
  }
  return (
    <div>
      <Profile user={user} />
      <Link href="/user/settings">Settings</Link>
    </div>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user ? await getUser(req.session.user.id) : null;
    return {
      props: {
        user: user,
      },
    };
  },
  ironOptions
);
