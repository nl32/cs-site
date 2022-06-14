export default function profile({ user }) {
  return (
    <div>
      <div></div>
      <div>Username: {user.username ? user.username:""}</div>
      <div>Email: {user.email}</div>
      <div>Name: {user.name ? user.name : ""}</div>
    </div>
  );
}
