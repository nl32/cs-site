import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import React from "react";
export default function Layout({children}:{children:React.ReactNode}) {
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
