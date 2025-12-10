// import React from "react";
import profpic from "../../assets/rizzking.svg";
import { Ellipsis } from "lucide-react";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useEffect, useState } from "react";
interface Props {
  // likes: number;
  // dislikes: number;
  // replies: number;
  commenter: `0x${string}`;
  content: string;
  date: string;
}

const Comment = ({ content, commenter, date }: Props) => {
  // console.log("rahhhhh");
  const { getProfile } = useCentriumHooks();
  const [commentMaker, setCommentMaker] = useState("");
  useEffect(() => {
    async function fetchData() {
      const commenterProfile = await getProfile(commenter);
      const result = commenterProfile?.username ?? "Unknown User";
      setCommentMaker(result);
    }
    fetchData();
  });
  return (
    <div className="flex flex-col gap-5 mb-5 pb-3 border-b-2 border-slate-300 dark:border-borderr">
      <div className="flex justify-between items-end">
        <div className="flex gap-2  items-center">
          <img src={profpic} alt="" />
          <div className="flex flex-col">
            <span className="font-sofia font-semibold">{commentMaker}</span>
            <span className="text-xs font-light">{date}</span>
          </div>
        </div>
        <Ellipsis />
      </div>
      <p className="display-text">{content}</p>
      {/* <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1">
            <ThumbsUp size={"20px"} />
            <span className="font-sofia text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown size={"20px"} />
            <span className="font-sofia text-sm">{dislikes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={"20px"} />
            <span className="font-sofia text-sm">{replies}</span>
          </div>
        </div>
        <div className="font-semibold">Reply</div>
      </div> */}
    </div>
  );
};

export default Comment;
