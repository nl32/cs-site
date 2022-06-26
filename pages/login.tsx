/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutateUser } = useUser();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        mutateUser();
        router.push("/user/profile");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </label>
      <input type="submit" value="login" />
    </form>
  );
}
