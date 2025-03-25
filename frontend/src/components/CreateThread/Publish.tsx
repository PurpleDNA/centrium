// import React from "react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { Context } from "@/Contexts/Context";
import DOMpurify from "dompurify";

function Publish() {
  const [selected, setSelected] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { post, title } = useSafeContext();
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
  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className="hidden border-l-2 gap-5 py-5 border-l-slate-300 lg:flex flex-col scrollbar-hide sticky top-0 h-screen overflow-y-scroll px-3">
      <div className="w-full">
        <div>
          <div
            onClick={() => handleVisible()}
            className="w-full flex gap-3 justify-between pr-1 py-1 border-2 border-gray-200 hover:border-greenn cursor-pointer items-center rounded-md mb-2 bg-slate-100 hover:bg-slate-400"
          >
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
              {visible ? (
                <Minus
                  // onClick={() => handleSelected("clear")}
                  className="w-6 h-6 border rounded-full border-dblue p-1 transition-all duration-300 ease-in-out"
                />
              ) : (
                <Plus
                  // onClick={() => handleSelected("clear")}
                  className="w-6 h-6 border rounded-full border-dblue p-1 transition-all duration-300 ease-in-out"
                />
              )}
            </div>
          </div>
          <div
            className={`w-full border-2 border-slate-200 hover:border-greenn  flex-col gap-2 p-2 ${
              visible ? "flex " : "hidden"
            }`}
          >
            <h3 className="font-semibold">Top tags this week</h3>
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
      <div>
        <Button
          onClick={publish}
          className="w-full bg-[#3800A7] hover:bg-[#1e0846] mb-2"
        >
          Publish
        </Button>
        <Button className="w-full bg-white border border-[#3800A7] text-black hover:bg-[#1e0846] hover:text-white">
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

export default Publish;
