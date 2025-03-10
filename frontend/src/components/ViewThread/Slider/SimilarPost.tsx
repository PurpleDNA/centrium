import { FC } from "react";
import rizzKing from "../../../assets/rizzking.svg";

interface Props {
  username: string;
  date: string;
  title: string;
  demo?: string;
  duration: number;
  postType: string;
}

const SimilarPost: FC<Props> = ({
  username,
  date,
  title,
  demo,
  duration,
  postType,
}) => {
  return (
    <div className=" mx-auto w-[310px]  rounded-lg -z-10 flex flex-col border border-[#002873B2] gap-6 cursor-pointer hover:bg-slate-100 transition-all duration-300 pb-0 p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            className=" w-12 h-12"
            src={rizzKing}
            alt="user profile picture"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-black font-sofia ">{username}</p>
            <p className="text-slate-800 text-sm">{date}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <img src={postType} alt="your points" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold font-sofia text-base">{title}</h3>
        <p className="font-poppins text-sm">{demo}</p>
      </div>
      <div className="'w-full flex justify-between">
        <div className="tags flex gap-3 md:gap-5">
          <span className="rounded-lg font-sofia text-xs bg-[#ECECEC] p-1 text-black">
            Web3
          </span>
          <span className="rounded-lg font-sofia text-xs bg-[#ECECEC] p-1 text-black">
            Aidrop
          </span>
          <span className="rounded-lg font-sofia text-xs bg-[#ECECEC] p-1 text-black">
            Hamster
          </span>
        </div>
        <div className="flex gap-2 md:gap-5 items-center">
          <p className="font-poppins text-xs text-gray-600">
            {duration} min read
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimilarPost;
