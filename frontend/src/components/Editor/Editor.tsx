import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "@/Contexts/createPostContext";
import "./editor.css";

function Editor() {
  const quillref = useRef(null);
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { post, setPost } = useSafeContext();
  const [localPost, setLocalPost] = useState<string>(post);
  // const htmlContent = quillref.root.innerHTML;
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["image", "link"],
    ["blockquote", "code-block"],
    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    const send = setTimeout(() => {
      console.log("sending");
      setPost(localPost);
    }, 600);
    return () => clearTimeout(send);
  }, [localPost, setPost]);

  return (
    <div>
      <ReactQuill
        ref={quillref}
        theme="snow"
        value={localPost}
        onChange={(e) => setLocalPost(e)}
        modules={modules}
        placeholder="Write your text here"
      />
    </div>
  );
}

export default Editor;
