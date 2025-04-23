import { FC, useEffect, useRef, useState } from "react";
import rizzKing from "../../assets/rizzking.svg";
import { Bookmark, Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HandleClickEvent extends React.MouseEvent<HTMLElement> {
  currentTarget: EventTarget & HTMLElement;
}
interface Props {
  username: string;
  date: string;
  title: string;
  desc: string;
  demo: string;
  duration: number;
  postType: string;
  tags: string[];
  userAddr: string;
  postHash?: string;
  isGuide: boolean;
}

const FeedPost: FC<Props> = ({
  username,
  date,
  title,
  demo,
  desc,
  duration,
  postType,
  tags,
  userAddr,
  postHash,
  isGuide,
}) => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const postRef = useRef(null);
  const [localTags, setLocalTags] = useState<string[]>([]);

  useEffect(() => {
    if (tags.length > 3) {
      const trunc = tags.slice(0, 3);
      setLocalTags([...trunc, "   .......   "]);
    } else {
      setLocalTags(tags);
    }
  }, [tags, tags.length]);

  const handleClick = (e: HandleClickEvent) => {
    if (e.currentTarget === profileRef.current) {
      navigate(`/profile/${userAddr}`);
    } else if (e.currentTarget === postRef.current) {
      if (isGuide) {
        navigate(`/guide/${postHash}`);
      } else {
        navigate(`/post/${postHash}`);
      }
    }
  };
  return (
    <div
      ref={postRef}
      onClick={(e) => handleClick(e)}
      className="w-full rounded-lg md:w-full flex flex-col gap-6 cursor-pointer hover:bg-slate-100 transition-all duration-300 pb-0 p-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            ref={profileRef}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            className=" w-12 h-12"
            src={rizzKing}
            alt="user profile picture"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-black font-sofia ">{username}</p>
            <p className="text-slate-800 text-sm">{date}</p>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="">
            <img src={postType} alt="your points" />
          </div>
          <Ellipsis />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold font-sofia text-2xl">{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: desc ? desc : demo }} />
        {/* <p className="font-poppins">{demo}</p> */}
      </div>
      <div className="'w-full flex justify-between">
        <div className="tags flex gap-3 md:gap-5 flex-wrap">
          {localTags.map((tag, index) => (
            <span
              key={index}
              className="rounded-lg font-sofia text-xs bg-[#ECECEC] p-1 text-black font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 md:gap-5 items-center shrink-0">
          <p className="font-poppins text-sm text-gray-600">
            {duration} min read
          </p>
          <Bookmark />
        </div>
      </div>
      <div>
        <hr className="w-full border-slate-300 border-b-2" />
      </div>
    </div>
  );
};

export default FeedPost;
