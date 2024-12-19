// import React from "react";
import profpic from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
const WriteComment = () => {
  return (
    <div className="reply flex flex-col gap-5 border-b-2 border-slate-300 pb-4">
      <div className="flex gap-2  items-center">
        <img src={profpic} alt="" />
        <span className="font-sofia">The Rizz King</span>
      </div>
      <textarea
        placeholder="what are your thoughts..."
        className="w-full px-1 text-sm outline-none overflow-hidden"
        id=""
        rows={5}
      ></textarea>
      <div className="flex justify-end">
        <Button className="bg-[#3800A7]">Submit</Button>
      </div>
    </div>
  );
};

export default WriteComment;
