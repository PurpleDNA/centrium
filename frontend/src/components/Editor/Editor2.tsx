import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import { Context } from "@/Contexts/createGuideContext";

interface Props {
  editorIndex: number;
}

function Editor({ editorIndex }: Props) {
  const quillref = useRef(null);
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };

  const { steps, setSteps } = useSafeContext();
  const [localSteps, setLocalSteps] = useState(steps);

  const handleSteps = (event: string, value: number) => {
    setLocalSteps((prev) =>
      prev.map((step, i) => {
        if (i === value) {
          return [steps?.[editorIndex]?.[0], event];
        } else {
          return step;
        }
      })
    );
  };

  useEffect(() => {
    const send = setTimeout(() => {
      console.log("sending");
      setSteps(localSteps);
    }, 600);
    return () => clearTimeout(send);
  }, [localSteps, setSteps]);

  const toolbarOptions = [["image"]];
  const modules = {
    toolbar: toolbarOptions,
  };
  return (
    <div className="editor-wrapper">
      <ReactQuill
        ref={quillref}
        theme="snow"
        value={localSteps?.[editorIndex]?.[1]}
        onChange={(e) => handleSteps(e, editorIndex)}
        modules={modules}
      />
    </div>
  );
}

export default Editor;
