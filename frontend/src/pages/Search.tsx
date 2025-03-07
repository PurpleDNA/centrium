// import React from 'react'
import Connect from "@/components/Search/Connect";
import RecTags from "@/components/Search/RecTags";
import Following from "@/components/Home/Following";
import Creators from "@/components/Search/Creators";
import { motion } from "motion/react";

function Search() {
  return (
    <div className="flex w-full">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="w-2/3 flex flex-col gap-5"
      >
        <div className="w-full bg-white sticky top-0 pt-5 flex justify-center">
          <input
            type="text"
            placeholder="Search for anything..."
            className="px-3 w-[70%] py-2 border-2 rounded-md  border-gray-700 mx-auto"
          />
        </div>
        <div className="border-t-2 border-slate-300 px-5 py-5">
          <RecTags />
        </div>
        <div className="border-y-2 border-slate-300 px-5 py-5">
          <Creators />
        </div>
        <div>
          <Following />
        </div>
      </motion.div>
      <div className="w-1/3">
        <Connect />
      </div>
    </div>
  );
}

export default Search;
