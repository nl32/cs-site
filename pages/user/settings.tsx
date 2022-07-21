/* eslint-disable react-hooks/rules-of-hooks */
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from "../../lib/user";
export default function settings(props:any) {
  const { user } = props;
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const router = useRouter();
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/auth/update", {
        name: name,
        username: username,
        email: email,
        id: user.id
      })
      .then((res) => {
        if (res.data.ok) {
          router.push("/user/profile");
        }
      });
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
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: await getUser(req.session.user ? req.session.user.id : "")
      }
    };
  },
  ironOptions
);
