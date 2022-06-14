import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <span className={styles.pageContainer}>
      <span className={styles.contentWrap}>
        <NavBar />
        <>{children}</>
      </span>
      <Footer />
    </span>
  );
}
