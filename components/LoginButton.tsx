import axios from "axios";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/LoginButton.module.css";
import { signOut, useSession } from "next-auth/react";
export default function LoginButton(props: any) {
  const { data } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  useEffect(() => {
    setText(data && data.id ? "logout" : "login");
  }, [data]);
  return (
    <button
      className={styles.button}
      onClick={async (e) => {
        e.preventDefault();
        if (data?.id) {
          signOut();
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
