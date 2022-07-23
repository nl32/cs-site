import styles from "../styles/Profile.module.css";
export default function profile({ user }: any) {
  return (
    <div className={styles.container}>
      <div></div>
      <div>Username: {user?.username ? user.username : ""}</div>
      <div>Email: {user?.email}</div>
      <div>Name: {user?.name ? user.name : ""}</div>
    </div>
  );
}
