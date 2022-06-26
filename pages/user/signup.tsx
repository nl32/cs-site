/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((x) => router.push("/login"));
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
