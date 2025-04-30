// import React from "react";
// import { Button } from "../../components/LandingPage/Buttons";
import { useState } from "react";
import rizzKing from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import fire from "../../assets/trendy_fire.png"
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../features/exploreSlice";

function Connect() {
  const [following, setFollowing] = useState<number[]>([]);
  const navigate = useNavigate();
  const handleFollowing = (num: number) => {
    if (!following.includes(num)) {
      setFollowing((prev) => [...prev, num]);
    } else {
      setFollowing((prev) => prev.filter((value) => value !== num));
    }
  };

  return (
    <div className="hidden border-l-2 border-l-slate-300 lg:flex flex-col gap-8 w-full scrollbar-hide sticky top-0 h-screen overflow-y-scroll py-5 px-3 dark:border-borderr">
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-sofia">Trending Tags</h2>
        <div className="flex flex-wrap gap-1">
          {trendTags.map((tag, num) => (
            <button
              key={num}
              onClick={() => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
              className={` text-sm mb-[6px] rounded-3xl font-sofia  px-4 py-2 inline w-auto bg-cyann border-2 border-slate-100 cursor-pointer transition-all duration-100 dark:bg-slate-900 dark:border-0`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <p className="font-semibold text-lg font-sofia">Suggested Creators</p>
        {creators.map((creator, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src={creator.picture} alt="" />
              <p>{creator.username}</p>
            </div>
            <Button
              className="bg-[#3800A7] hover:bg-[#1e0846] dark:bg-slate-900 dark:text-white dark:hover:bg-[#510FB1]"
              onClick={() => handleFollowing(index)}
            >
              {following.includes(index) ? "Following" : "Follow"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const trendTags = [
  "Airdrop",
  "Web3",
  "Hamster",
  "Galxe",
  "Memefi",
  "Tokens",
  "ICP",
  "BNB",
  "Blockchain",
  "Fire Drop",
];

const creators = [
  {
    username: "Maroofu",
    picture: rizzKing,
  },
  {
    username: "The Rizz King",
    picture: rizzKing,
  },
  {
    username: "The Rizz King",
    picture: rizzKing,
  },
  {
    username: "The Rizz King",
    picture: rizzKing,
  },
  {
    username: "The Rizz King",
    picture: rizzKing,
  },
];
export default Connect;
