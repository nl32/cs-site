import { useState } from "react";
import Tag from "./Tag";
import styles from "../styles/TagBox.module.css";
export default function TagBox({ tags, setTags }) {
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!tags.includes(tag)) {
              tags.push(tag);
              setTag("");
              setError("");
            } else {
              setError("Tag already selected");
            }
          }
        }}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.tags}>
        {tags.map((x) => {
          return <Tag key={x} name={x} list={tags} setList={setTags} />;
        })}
      </div>
    </div>
  );
}
