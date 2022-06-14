import styles from "../styles/Footer.module.css";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.item}>
        <li>© 2022</li>
        <li>
          <Link href="https://github.com/nl32/cs-site">
            <a>gh</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>contact</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
