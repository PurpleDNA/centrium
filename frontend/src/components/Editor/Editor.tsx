import { useContext, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "@/Contexts/Context";

function Editor() {
  const quillref = useRef(null)
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useSafeContext must be used within a ContextProvider');
    }
    return context;
  };
  const {post,setPost} = useSafeContext()
  // const htmlContent = quillref.root.innerHTML;
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ["image", "link"],
    ["blockquote", "code-block"],
    ["clean"],
    ];
  const modules = {
    toolbar: toolbarOptions,
  };
  return (
    <div>
      <ReactQuill
        ref={quillref}
        theme="snow"
        value={post}
        onChange={setPost}
        modules={modules}
      />
    </div>
  );
}

export default Editor;
