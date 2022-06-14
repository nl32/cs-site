import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrap}>
        <NavBar />
        <>{children}</>
      </div>
      <Footer />
    </div>
  );
}
