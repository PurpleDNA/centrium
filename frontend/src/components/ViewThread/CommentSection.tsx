// import React from "react";
import WriteComment from "./WriteComment";
import { ChevronDown } from "lucide-react";
import Comment from "./Comment";
import { useMemo } from "react";
import React from "react";
import { X } from "lucide-react";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";

// import FallbackLoading from "../FallbackLoading";

export interface CommentProps {
  commenter: `0x${string}`;
  content: string;
  timestamp: bigint;
}
interface Props {
  comments: CommentProps[];
  setCommentsReload: () => void;
  setShowComments: () => void;
}
const CommentSection = ({
  comments,
  setCommentsReload,
  setShowComments,
}: Props) => {
  // console.log("Comment Section")
  const { formatDate } = useCentriumHooks();
  const commentsNum = useMemo(() => {
    return comments.length;
  }, [comments.length]);

  const sorted = useMemo(() => {
    return comments.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [comments]);

  return (
    <div className="gap-5 pb-5 px-3 flex flex-col fixed lg:sticky bottom-0 lg:top-0 lg:bottom-0 h-[80%] rounded-t-3xl lg:rounded-t-none border-t-2 lg:border-t-0 border-[#3800A7] lg:h-screen overflow-y-scroll bg-white dark:bg-darkk dark:border-borderr">
      {/* {!comments && <FallbackLoading />} */}
      <div className="flex justify-between items-center sticky top-0 bg-white pt-5 dark:bg-darkk">
        <h1 className="font-sofia font-semibold px-3 py-3 border-b-2 border-slate-300 w-full dark:border-borderr">
          {commentsNum} {commentsNum === 1 ? "Comment" : "Comments"}
        </h1>
        <X onClick={setShowComments} className="lg:hidden" />
      </div>
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
            date={formatDate(Number(comment.timestamp))}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CommentSection);
