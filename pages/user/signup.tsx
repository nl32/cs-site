/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { trpc } from "../../utils/trpc";
export default function signup(props: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signup = trpc.useMutation("user.signup");
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    signup.mutate({
      username: username,
      email: email,
      password: password
    });
    router.push("/user/login");
  };
  return (
    <>
      <div>
        <form action="" onSubmit={handleSignup}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Create account" />
        </form>
      </div>
    </>
  );
}
