import NavBar from "./NavBar";
export default function Layout({ children }) {
  const testList = [{ title: "error", description: "there is an error" }];
  return (
    <>
      <NavBar />
      <> {children} </>
    </>
  );
}
