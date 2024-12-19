// import React from "react";
import profpic from "../../assets/rizzking.svg";
import { Ellipsis, ThumbsDown, ThumbsUp, MessageCircle } from "lucide-react";
interface Props {
  likes: number;
  dislikes: number;
  replies: number;
}

const Comment = ({ likes, dislikes, replies }: Props) => {
  return (
    <div className="flex flex-col gap-5 mb-5 pb-3 border-b-2 border-slate-300">
      <div className="flex justify-between items-end">
        <div className="flex gap-2  items-center">
          <img src={profpic} alt="" />
          <div className="flex flex-col">
            <span className="font-sofia">The Rizz King</span>
            <span className="text-xs font-light">1 day ago</span>
          </div>
        </div>
        <Ellipsis />
      </div>
      <p>
        Beyond security, scalability, and regulation, decentralized networks
        face other potential issues, such as the environmental impact of
        energy-intensive mining and the steep learning curve that makes them
        challenging for average users. These risks emphasize the importance of
        informed choices when entering decentralized spaces.
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1">
            <ThumbsUp />
            <span className="font-sofia text-lg">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown />
            <span className="font-sofia text-lg">{dislikes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle />
            <span className="font-sofia text-lg">{replies}</span>
          </div>
        </div>
        <div className="font-semibold">Reply</div>
      </div>
    </div>
  );
};

export default Comment;
