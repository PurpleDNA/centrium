// import React from "react";
// import { Button } from "../../components/LandingPage/Buttons";
import { useEffect, useRef, useState } from "react";
import rizzKing from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import fire from "../../assets/trendy_fire.png"
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../features/exploreSlice";

function Connect() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState<number[]>([]);

  const handleFollowing = (num: number) => {
    if (!following.includes(num)) {
      setFollowing((prev) => [...prev, num]);
    } else {
      setFollowing((prev) => prev.filter((value) => value !== num));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (inputRef) {
          if (event.key === "Enter" && inputRef.current) {
            if (inputRef.current.value) {
              console.log("trigger button pressed");
              navigate(
                `/search?tag=${encodeURIComponent(
                  inputRef.current.value.toLowerCase().replace(/\s+/g, "-")
                )}`
              );
            } else return;
          }
        }
      };
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [navigate]);

  return (
    <div className="hidden border-l-2 border-l-slate-300 dark:border-borderr lg:flex flex-col gap-8 w-full scrollbar-hide sticky top-0 h-screen overflow-y-scroll px-3">
      <div className="w-full bg-white sticky top-0 pt-5 dark:bg-darkk">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for anything..."
          className="px-3 py-2 w-full border-2 rounded-md  border-gray-700 mx-auto md:mx-0 dark:bg-darkk"
        />
      </div>
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-lg font-semibold font-sofia">Trending Tags</h2>
        <div className="flex flex-wrap gap-1">
          {trendTags.map((tag, num) => (
            <button
              key={num}
              onClick={() => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
              className={` text-sm mb-[6px] rounded-3xl font-sofia  px-4 py-2 inline w-auto bg-cyann border-2 border-slate-100 dark:border-0 cursor-pointer transition-all duration-100 dark:bg-slate-900`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg font-sofia">
          Recommended Tags For You
        </h2>
        <div className="flex flex-col gap-4">
          {recTags.map((rectag, i) => (
            <div key={i} className="flex flex-col cursor-pointer">
              <p className="text-sm text-slate-600 font-sofia">
                Trending in {rectag.trending}
              </p>
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{rectag.username}</h2>
                <span className="text-slate-600">{rectag.postNo} posts</span>
              </div>
            </div>
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

const recTags = [
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
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
