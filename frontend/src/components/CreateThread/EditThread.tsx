import Editor from "../Editor/Editor";
import { motion } from "motion/react";
import {ChangeEvent, useContext} from "react"
import { Context } from "@/Contexts/Context";

function EditThread() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useSafeContext must be used within a ContextProvider');
    }
    return context;
  };
  const {title,setTitle} = useSafeContext()

  const handleTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value)
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full"
    >
      <textarea
        className="text-5xl font-semibold mb-16 px-6 w-full"
        placeholder="Title..."
        value={title}
        onChange={(e) => handleTitle(e)}
        rows={3}
      />
      <div className="w-full">
        <Editor />
      </div>
    </motion.div>
  );
}

export default EditThread;
