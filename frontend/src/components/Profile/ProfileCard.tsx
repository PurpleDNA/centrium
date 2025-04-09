// import React from 'react'
import { ExternalLink } from "lucide-react";
import ProfPic from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Contexts/Context";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";

interface props {
  profileAddy: `0x${string}`;
  username: string;
  followers: number;
  following: number;
  isFollowing: boolean | null;
  bio?: string;
  profPic?: string;
}

function ProfileCard({
  profileAddy,
  username,
  followers,
  following,
  isFollowing,
}: props) {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profile = useSelector((state: any) => state.userProfile);
  const { follow, unfollow, isInteracting, setIsInteracting } =
    useCentriumHooks();
  const { setIsEditProfileOpen } = useSafeContext();
  const [decoyFws, setDecoyFws] = useState(followers);
  const [decoyIsFing, setDecoyIsFing] = useState(isFollowing);
  console.log(isFollowing);
  const truncAddr = (address: string) => {
    const res = address.slice(0, 6) + "....." + address.slice(-5);
    return res;
  };
  useEffect(() => {
    setDecoyFws(followers);
    setDecoyIsFing(isFollowing);
  }, [followers, isFollowing]);
  return (
    <div className="hidden border-l-2 border-l-slate-300 lg:flex flex-col gap-8 w-full scrollbar-hide sticky top-0 h-screen overflow-y-scroll px-3 mt-5">
      <div className="flex flex-col gap-3 border-b-2 border-b-slate-300 pb-2">
        <div className="flex flex-col gap-3">
          <img src={ProfPic} alt="" className="w-20 rounded-full" />
          <h1 className="font-sofia font-semibold text-base text-black">
            {username ? username : "username"}
          </h1>
          <span className="py-1 w-max px-3 bg-slate-300 rounded-xl text-sm">
            {profile.isAccount ? truncAddr(profileAddy) : "0x000000"}
          </span>
          <div className="flex justify-between w-[80%] text-sm">
            <p className="font-sofia font-semibold">
              {decoyFws}{" "}
              <span className="text-slate-500 font-normal"> Followers</span>
            </p>
            <p className="font-sofia font-semibold">
              {following}{" "}
              <span className="text-slate-500 font-normal"> Following</span>
            </p>
          </div>
        </div>
        <p className="bio w-full text-sm font-poppins">
          King in the north, The commander of rizz. Number 1 Crypto, airdrop and
          shitcoin enthusiast. Creating top guides and intriguing posts
        </p>
        <Button
          disabled={isInteracting}
          onClick={async () => {
            if (profile.walletAddress === profileAddy) {
              setIsEditProfileOpen(true);
            } else {
              if (decoyIsFing === null || decoyIsFing === false) {
                await follow(profileAddy as `0x${string}`);
                setDecoyIsFing(true);
                setDecoyFws((prev) => prev + 1);
                setIsInteracting(false);
              } else {
                await unfollow(profileAddy as `0x${string}`);
                setDecoyIsFing(false);
                setDecoyFws((prev) => prev - 1);
                setIsInteracting(false);
              }
            }
          }}
          className="bg-white border-2 border-[#501FB1] rounded-md w-max text-black text-xs hover:bg-[#501FB1] transition-all hover:text-white"
        >
          {profile.walletAddress === profileAddy
            ? "Edit Profile"
            : decoyIsFing
            ? "Unfollow"
            : "Follow"}
        </Button>
      </div>
      <div className="flex flex-col gap-3 border-b-2 border-b-slate-300 pb-2">
        <div>
          <div className="flex gap-3 w-max items-center">
            <img src="/assets/token.png" alt="" />
            <p className="text-sm font-semibold font-sofia ">Centrium Points</p>
          </div>
          <h1 className="font-bold pl-1 text-5xl font-poppins text-[#3800A7] mt-2">
            700
          </h1>
          <div className="w-full flex justify-between pl-2 items-end">
            <p className="text-sm font-sofia mt-2">
              Rank: <span className="font-semibold">2334</span>
            </p>
            <p className="text-xs text-[#3269F6] font-sofia cursor-pointer">
              view leaderboard <ExternalLink className="inline" size={16} />
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold font-sofia text-base">
          Average Guide Rating
        </h1>
        <p className="text-sm font-poppins">
          Average guide ratings from <strong>200</strong> ratings
        </p>
        <div></div>
      </div>
    </div>
  );
}

export default ProfileCard;
