/* eslint-disable @typescript-eslint/no-explicit-any */
import thread from "../../assets/thread.png";
import guide from "../../assets/guides.png";
import { X } from "lucide-react";
import { Context } from "@/Contexts/Context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

function CreatePostModal() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { setIsModalOpen } = useSafeContext();
  const toggleModal = () => setIsModalOpen((prev: any) => !prev);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 100 }}
      className={`w-screen h-screen fixed inset-0 items-center justify-center bg-slate-300/50 z-10 flex`}
      // onClick={toggleModal}
    >
      <div className="flex flex-col px-8 py-5 rounded-md bg-white border-2 border-black dark:bg-darkk">
        <div className="flex justify-end">
          <X onClick={toggleModal} className="cursor-pointer" />
        </div>
        <div className="font-sofia text-center mb-5">Create Post</div>
        <div className="flex gap-6 justify-center mb-5">
          <NavLink to="create-thread" onClick={toggleModal}>
            <div className="bg-[#E9E9E9] rounded-lg flex flex-col gap-2 p-4 items-center cursor-pointer hover:font-bold dark:bg-darkk dark:border dark:border-[#510FB1]">
              <img src={thread} alt="" className="w-12" />
              <p className="font-sofia">Thread Post</p>
            </div>
          </NavLink>
          <NavLink to="create-guide" onClick={toggleModal}>
            <div className="bg-[#E9E9E9] rounded-lg flex flex-col gap-3 py-4 px-[19px] items-center cursor-pointer hover:font-bold dark:bg-darkk dark:border dark:border-[#510FB1]">
              <img src={guide} alt="" className="w-12" />
              <p className="font-sofia">Guide Post</p>
            </div>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
}

export default CreatePostModal;
