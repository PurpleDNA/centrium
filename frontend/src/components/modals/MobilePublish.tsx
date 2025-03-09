// import React from "react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Context } from "@/Contexts/Context";
import DOMpurify from "dompurify";
import { X } from "lucide-react";

function MobilePublish() {
  const [selected, setSelected] = useState<string[]>([]);
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { post, title, setIsPublishOpen } = useSafeContext();
  const safepost = DOMpurify.sanitize(post);

  const publish = () => {
    localStorage.setItem("safepost", JSON.stringify(safepost));
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("tags", JSON.stringify(selected));
  };

  const handleSelected = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected((prev) => prev.filter((value) => value !== tag));
    } else if (!selected.includes(tag)) {
      setSelected((prev) => [...prev, tag]);
    }
  };
  return (
    <div className="w-screen h-screen bg-[#E5E5E5] fixed flex flex-col justify-center inset-0 top-0 left-0 z-50 bg-opacity-90 backdrop-blur-sm p-3">
      <div className="bg-white flex flex-col px-5 p-2">
        <div onClick={() => setIsPublishOpen(false)}>
          <X className="ml-auto w-5 mb-4" />
        </div>
        <div className="w-full">
          <div className="w-full flex gap-3 justify-between pr-1 py-1 border-2 border-gray-200 hover:border-greenn cursor-pointer items-center rounded-md mb-2 bg-slate-100 hover:bg-slate-400">
            <div className="overflow-x-hidden flex gap-1 scrollbar-hide ">
              {selected.length === 0 ? (
                <span className="ml-6 text-sm">Add atleast 3 tags</span>
              ) : (
                selected.map((select, i) => (
                  <span
                    key={i}
                    className="text-[11px] rounded-3xl font-sofia px-2 py-1 w-max bg-[#E8E7EA] border-2 border-slate-100 flex justify-between items-center gap-1"
                  >
                    {select}
                    {/* <FontAwesomeIcon className="hover:bg-white rounded-full "  onClick={() => handleSelected(select)} icon={faXmark} /> */}
                  </span>
                ))
              )}
            </div>
            <div className="">
              <Plus
                // onClick={() => handleSelected("clear")}
                className="w-6 h-6 border rounded-full border-dblue p-1 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <div
            className={`w-full bg-[#ECECEC] border-2 border-slate-200 hover:border-greenn  flex-col gap-2 p-2 flex mb-3`}
          >
            <div className="grid grid-cols-3 text-[12px] gap-1">
              {tags.map((tag, i) =>
                selected.includes(tag) ? (
                  <p
                    onClick={() => handleSelected(tag)}
                    key={i}
                    className="break-words cursor-pointer text-[#0000004D]"
                  >
                    {tag}
                  </p>
                ) : (
                  <p
                    onClick={() => handleSelected(tag)}
                    key={i}
                    className="break-words cursor-pointer"
                  >
                    {tag}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-around mt-5">
        <Button
          onClick={publish}
          className="w-1/3 bg-[#3800A7] hover:bg-[#1e0846]"
        >
          Publish
        </Button>
        <Button className="w-1/3 bg-white border border-[#3800A7] text-black hover:bg-[#1e0846] hover:text-white">
          Save to drafts
        </Button>
      </div>
    </div>
  );
}

const tags = [
  "BNB",
  "NFT",
  "Airdrop",
  "Cryptocurrency",
  "Token",
  "Cloud",
  "Chainlink",
  "Hamster",
  "ICP",
  "Memefi",
  "Near",
  "Gaming",
  "Galxe",
  "Gamma",
  "Technology",
  "Tech",
  "Telegram",
  "Ethereum",
  "Doge",
  "Solana",
  "Phantom",
  "USDT",
  "Magic Eden",
  "Blockchain",
];

export default MobilePublish;
