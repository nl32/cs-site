import Link from "next/link";
import LoginButton from "./LoginButton";
import styles from "../styles/NavBar.module.css";
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.link}>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/about">
            <a>about</a>
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/contact">
            <a>contact</a>
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/guides">
            <a>guides</a>
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/user/profile">
            <a>profile</a>
          </Link>
        </li>
        <li>
          <LoginButton className={styles.login} />
        </li>
      </ul>
    </nav>
  );
}
