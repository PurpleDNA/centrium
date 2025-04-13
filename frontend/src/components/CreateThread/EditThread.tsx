import Editor from "../Editor/Editor";
import { motion } from "motion/react";
import {
  //  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "@/Contexts/createPostContext";
// import { Button } from "../ui/button";

function EditThread() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { title, setTitle } = useSafeContext();
  const [localTitle, setLocalTitle] = useState<string>(title);

  useEffect(() => {
    const send = setTimeout(() => {
      console.log("sending");
      setTitle(localTitle);
    }, 600);
    return () => clearTimeout(send);
  }, [localTitle, setTitle]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full"
    >
      <textarea
        className="text-2xl md:text-4xl font-semibold mb-5 px-6 w-full"
        placeholder="Title..."
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        rows={3}
      />
      <div className="w-full">
        <Editor />
      </div>
    </motion.div>
  );
}

export default EditThread;
