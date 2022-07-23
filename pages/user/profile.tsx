/* eslint-disable react-hooks/rules-of-hooks */
import Profile from "../../components/Profile";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { requireAuth } from "../../lib/requireAuth";
import { trpc } from "../../utils/trpc";
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
export default function profile() {
  const { data } = useSession();
  const userQuery = trpc.useQuery(["user.get", { id: data?.id as string }]);
  if(userQuery.isLoading){
    return <>Loading.</>
  }
  return (
    <div>
      <Profile user={userQuery.data} />
      <Link href="/user/settings">Settings</Link>
    </div>
  );
}
