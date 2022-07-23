/* eslint-disable react-hooks/rules-of-hooks */
import Profile from "../../components/Profile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { requireAuth } from "../../lib/requireAuth";
import { getUser } from "../../lib/user";
import { trpc } from "../../utils/trpc";
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
export default function profile() {
  const router = useRouter();
  const { data } = useSession();
  const userQuery = trpc.useQuery(["user.get", { id: data?.id as string }]);
  return (
    <div>
      <Profile user={userQuery.data} />
      <Link href="/user/settings">Settings</Link>
    </div>
  );
}
