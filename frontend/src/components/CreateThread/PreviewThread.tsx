// import React from 'react'
import { Context } from "@/Contexts/createPostContext";
import { useContext } from "react";
import DOMpurify from "dompurify";
import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
// import { Button } from "../ui/button";
function PreviewThread() {
  const { truncateAddress, formatDate, estTime } = useCentriumHooks();
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProfile = useSelector((state: any) => state.userProfile);
  const { post, title } = useSafeContext();
  const safepost = DOMpurify.sanitize(post);
  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="font-semibold text-2xl md:text-4xl mb-2 px-3 break-words">
        {title}
      </h1>
      <div className="flex gap-3 px-3 items-center">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400 font-semibold">
              {userProfile.username}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm">
              {truncateAddress(userProfile.walletAddress)}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>{formatDate(Date.now() / 1000)}</span>
            <Dot />
            <span>{estTime(safepost)} minute read</span>
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "4px",
          backgroundColor: "#fff",
        }}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: safepost }}
      />
    </div>
  );
}

export default PreviewThread;
