// import React from "react";
import WriteComment from "./WriteComment";
import { ChevronDown } from "lucide-react";
import Comment from "./Comment";
import { useMemo } from "react";
import React from "react";

// import FallbackLoading from "../FallbackLoading";

export interface CommentProps {
  commenter: `0x${string}`;
  content: string;
  timestamp: bigint;
}
interface Props {
  comments: CommentProps[];
  setCommentsReload: () => void;
}
const CommentSection = ({ comments, setCommentsReload }: Props) => {
  // console.log("Comment Section")
  const commentsNum = useMemo(() => {
    return comments.length;
  }, [comments.length]);

  const sorted = useMemo(() => {
    return comments.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [comments]);

  return (
    <div className="hidden gap-5 py-5 px-3 lg:flex flex-col sticky top-0 h-screen overflow-y-scroll bg-white">
      {/* {!comments && <FallbackLoading />} */}
      <h1 className="font-sofia font-semibold px-3 py-3 border-b-2 border-slate-300 w-full">
        {commentsNum} {commentsNum === 1 ? "Comment" : "Comments"}
      </h1>
      <WriteComment setCommentsReload={setCommentsReload} />
      <div className="flex gap-3 items-center">
        <h1 className="font-sofia text-sm">Most Relevant</h1>
        <ChevronDown />
      </div>
      <div>
        {sorted.map((comment, i) => (
          <Comment
            key={i}
            content={comment.content}
            commenter={comment.commenter}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CommentSection);
