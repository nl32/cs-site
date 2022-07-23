/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { requireAuth } from "../../lib/requireAuth";

export default function settings(props: any) {
  const session = useSession();
  const { data } = trpc.useQuery([
    "user.get",
    { id: session.data?.id as string }
  ]);
  const user = data;
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const router = useRouter();
  const update = trpc.useMutation("user.update");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await update.mutateAsync({
      email: email as string,
      username: username as string,
      name: name as string
    });
    router.push("/user/profile");
  };
  return (
    <>
      <Link href="/user/profile">return to profile</Link>
      <h1>User Settings</h1>
      <div className="edit">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            className="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">username:</label>
          <input
            type="text"
            className="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="email">email:</label>
          <input
            type="text"
            className="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input type="submit" value="make changes" />
        </form>
      </div>
    </>
  );
}
