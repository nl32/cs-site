/* eslint-disable react-hooks/rules-of-hooks */
import { useState, FormEvent } from "react";
import TagBox from "../../components/TagBox";
import { trpc } from "../../utils/trpc";

//TODO rewrite form with react-form-hook instead of controlled state
export default function upload(props: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<Blob>();
  const uploadMutation = trpc.useMutation("post.upload");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(file);
    const reader = new FileReader();
    if (file) reader.readAsBinaryString(file);
    reader.addEventListener("load", (event) => {
      const vibe = reader.result as string;
      uploadMutation.mutate({
        title: title,
        desc: desc,
        file: vibe,
        tags: tags
      });
    });
  };
  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <p>Upload new guides here</p>
      <p>Guide files must be uploaded in .md format</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          id="title"
        />
        <label htmlFor="description">description:</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          name="description"
          id="description"
        />
        <label htmlFor="postFile">Post File: </label>
        <input type="file" onChange={handleChange} name="post" id="postFile" />
        <TagBox tags={tags} setTags={setTags} />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}
