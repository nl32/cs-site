import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Tag.module.css";
export default function Tag({ list, setList, name }:{list:string[],setList:Dispatch<SetStateAction<string[]>>,name:string}) {
  function handleClick() {
    setList(list.filter((x) => x !== name));
    console.log("button clicked");
  }
  return (
    <span className={styles.parent}>
      <span className={styles.tag}>
        <button type="button" onClick={handleClick}>
          X
        </button>
        {name}
      </span>
    </span>
  );
}
