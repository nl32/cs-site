import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/LoginButton.module.css";
export default function LoginButton() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [text, setText] = useState("");
  useEffect(() => {
    setText(user && user.username ? "logout" : "login");
  }, [user]);
  return (
    <button
      className={styles.button}
      onClick={async (e) => {
        e.preventDefault();
        if (user.username) {
          mutateUser(await axios.post("/api/auth/logout"), false);
          router.push("/logout");
        } else {
          router.push("/login");
        }
      }}
    >
      {text}
    </button>
  );
}
