import styles from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.item}>
        <li>© 2022</li>
        <li>
          <Link href="https://github.com/nl32/cs-site">
            <a>
              <Image
                src="/../public/Github-Mark-32px.png"
                width="32px"
                height="32px"
              />
            </a>
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
