import NavBar from "./NavBar";
import ToastManager from "./toast/ToastManager";
export default function Layout({ children }) {
  const testList = [{ title: "error", description: "there is an error" }];
  return (
    <>
      <NavBar />
      <> {children} </>
    </>
  );
}
