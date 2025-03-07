import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
function GuideContent() {
  const guideTitle = JSON.parse(localStorage.getItem("guideTitle") ?? "");
  const guideDesc = JSON.parse(localStorage.getItem("guideDesc") ?? "");
  const safesteps = JSON.parse(localStorage.getItem("safesteps") ?? "");
  const guideTags = JSON.parse(localStorage.getItem("guideTags") ?? "");

  return (
    <div className="w-full flex flex-col gap-7 pb-3 border-b border-slate-300">
      <h1 className="font-semibold text-5xl mb-4 px-3 break-words font-sofia">
        {guideTitle}
      </h1>
      <p className="px-3">{guideDesc}</p>
      <div className="flex gap-3 px-3 items-center pb-7 border-b-2 border-slate-300">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400">
              The Rizz King
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm">
              walletAddy
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>31 July 2024</span>
            <Dot />
            <span>4 minute read</span>
          </div>
        </div>
      </div>
      <div>
        {safesteps.map((safestep: [number, string], i: number) => (
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
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: safestep[1] }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="tags flex gap-1 md:gap-3 px-5">
        {guideTags.map((tag: string) => (
          <span className="rounded-md font-sofia text-xs bg-[#ECECEC] p-1 inline w-auto text-black">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GuideContent;
