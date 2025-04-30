// import React from 'react'
import { Context } from "@/Contexts/createGuideContext";
import { useContext } from "react";
import DOMpurify from "dompurify";
import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
function PreviewGuide() {
  const { truncateAddress, formatDate } = useCentriumHooks();
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { guideTitle, guideDesc, steps } = useSafeContext();
  const safesteps = steps.map((step) => [step[0], DOMpurify.sanitize(step[1])]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProfile = useSelector((state: any) => state.userProfile);
  return (
    <div className="w-full flex flex-col gap-7">
      <h1 className="font-semibold md:text-4xl text-2xl md:mb-4 px-3 break-words font-sofia">
        {guideTitle}
      </h1>
      <p className="px-3">{guideDesc}</p>
      <div className="flex gap-3 px-3 items-center pb-7 border-b-2 border-slate-300 dark:border-borderr">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400">
              {userProfile.username}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm dark:bg-slate-900">
              {truncateAddress(userProfile.walletAddress)}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>
              {" "}
              <span>{formatDate(Date.now() / 1000)}</span>
            </span>
            <Dot />
            {/* <span>            <span>{estTime(safesteps)} minute read</span></span> */}
          </div>
        </div>
      </div>
      <div>
        {safesteps.map((safestep, i) => (
          <div
            key={i}
            className="px-4 pt-1 pb-4 w-4/5 flex flex-col gap-3 mx-auto border border-[#3800A7] rounded-md mb-5"
          >
            <div className="flex gap-2 items-start py-2">
              <div className="w-max  rounded-sm px-1 bg-slate-300 text-sm font-sofia text-[#FA9631] mt-[0.375rem]">
                {i + 1}
              </div>
              {typeof safestep[1] === "string" && (
                <div
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                  className="w-full text-clip"
                  dangerouslySetInnerHTML={{ __html: safestep[1] }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewGuide;
