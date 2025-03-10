// import React from "react";
import WriteComment from "./WriteComment";
import { ChevronDown } from "lucide-react";
import Comment from "./Comment";
const CommentSection = () => {
  return (
    <div className="hidden gap-5 py-5 px-3 lg:flex flex-col sticky top-0 h-screen overflow-y-scroll bg-white">
      <h1 className="font-sofia font-semibold px-3 py-3 border-b-2 border-slate-300 w-full">
        {3} Comments
      </h1>
      <WriteComment />
      <div className="flex gap-3 items-center">
        <h1 className="font-sofia text-sm">Most Relevant</h1>
        <ChevronDown />
      </div>
      <div>
        <Comment likes={32} dislikes={4} replies={8} />
        <Comment likes={32} dislikes={4} replies={8} />
        <Comment likes={32} dislikes={4} replies={8} />
      </div>
    </div>
  );
};

export default CommentSection;
