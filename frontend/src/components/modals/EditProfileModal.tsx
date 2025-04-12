// import React from 'react'

import { X } from "lucide-react";
import ProfPic from "../../assets/rizzking.svg";
import { useContext } from "react";
import { Context } from "../../Contexts/Context";
import { Button } from "../ui/button";
import { motion } from "motion/react";

// // interface props {
// //   className: string;
// }
function EditProfileModal() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isEditProfileOpen, setIsEditProfileOpen } = useSafeContext();
  return (
    <div
      className={`${
        isEditProfileOpen ? "flex" : "hidden"
      } w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, x: 100 }}
        className=" bg-white p-5 rounded-sm flex flex-col gap-3"
      >
        <div className="flex justify-end w-full">
          <h1 className="font-bold font-sofia text-base mx-auto pl-6">
            Edit Profile
          </h1>
          <div
            className=" cursor-pointer"
            onClick={() => setIsEditProfileOpen(false)}
          >
            <X />
          </div>
        </div>
        <div className="relative w-full items-center flex justify-center">
          <img src={ProfPic} alt="" className="w-20" />
          <img
            src="/assets/camera.png"
            alt=""
            className="w-10 absolute cursor-pointer"
          />
        </div>
        <div className="w-full">
          <form action="" className="flex flex-col gap-5">
            <div className="bg-[#F1F1F1] flex flex-col px-4 py-2 rounded-md">
              <label htmlFor="name" className="text-[#CDCDCD] text-xs ml-1">
                Name
              </label>
              <input
                placeholder="Enter Username"
                type="text"
                id="name"
                name="about"
                className="w-72 md:w-96 bg-[#F1F1F1] p-1 outline-none font-sofia"
              />
            </div>
            <div className="bg-[#F1F1F1] flex flex-col px-4 py-2 rounded-md">
              <label htmlFor="about" className="text-[#CDCDCD] text-xs ml-1">
                About Me
              </label>
              <textarea
                placeholder="Enter bio"
                id="about"
                name="about"
                rows={3}
                className="w-72 md:w-96 bg-[#F1F1F1] p-1 outline-none font-sofia"
              />
            </div>
            <div className="flex justify-end w-full">
              <Button
                onClick={() => setIsEditProfileOpen(true)}
                className="bg-white border-2 border-[#501FB1] rounded-md w-max text-black text-xs hover:bg-[#501FB1] transition-all hover:text-white"
                type="submit"
              >
                {" "}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
        <div></div>
      </motion.div>
    </div>
  );
}

export default EditProfileModal;
