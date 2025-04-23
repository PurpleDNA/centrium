// import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Context } from "@/Contexts/createGuideContext";
import DOMpurify from "dompurify";
import { X } from "lucide-react";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import CircleLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
  // color: "white",
};

interface props {
  setIsPublishOpen: () => void;
}

function MobilePublish({ setIsPublishOpen }: props) {
  const [selected, setSelected] = useState<string[]>([]);
  const { createGuide, isInteracting, saveToDrafts } = useCentriumHooks();
  const [value, setValue] = useState<string>("");
  const [clicked, setClicked] = useState("neither");

  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { guideTitle, guideDesc, steps } = useSafeContext();
  const safesteps = steps.map((step) => [step[0], DOMpurify.sanitize(step[1])]);

  const publish = () => {
    setClicked("publish");
    createGuide(guideTitle, JSON.stringify(safesteps), guideDesc, selected);
  };
  const saveDraft = () => {
    setClicked("draft");
    saveToDrafts(guideTitle, safesteps, selected, guideDesc, true);
  };

  const handleSelected = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected((prev) => prev.filter((value) => value !== tag));
    } else if (!selected.includes(tag)) {
      setSelected((prev) => [...prev, tag]);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === " " || event.key === "Enter") {
          console.log("trigger button pressed");
          handleSelected(value);
          inputElement.value = "";
        }
      };
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [value]);

  return (
    <div className="w-screen h-screen bg-[#E5E5E5] fixed flex flex-col justify-center inset-0 top-0 left-0 z-50 bg-opacity-90 backdrop-blur-sm p-3">
      <div className="bg-white flex flex-col px-5 p-2">
        <div onClick={() => setIsPublishOpen()}>
          <X className="ml-auto w-5 mb-4" />
        </div>
        <div className="w-full">
          <div className="w-full flex gap-3 justify-between pr-1 py-1 border-2 border-gray-200  cursor-pointer items-center rounded-md mb-2 bg-slate-100">
            <div
              className={`flex flex-wrap gap-1 ${
                selected.length > 0 ? "" : "py-1 px-1"
              }`}
            >
              {selected.length === 0 ? (
                <span className="text-xs font-sofia text-gray-400">
                  Add atleast 3 tags
                </span>
              ) : (
                selected.map((select, i) => (
                  <span
                    key={i}
                    className="text-[11px] rounded-3xl font-sofia px-2 py-1 w-max bg-[#E8E7EA] border-2 border-slate-100 flex justify-between items-center gap-1"
                  >
                    {select}
                    <X
                      className="hover:bg-white rounded-full w-3 h-3"
                      onClick={() => handleSelected(select)}
                    />
                    {/* <FontAwesomeIcon className="hover:bg-white rounded-full "  onClick={() => handleSelected(select)} icon={faXmark} /> */}
                  </span>
                ))
              )}
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Input tags here"
            onChange={(e) => setValue(e.currentTarget.value)}
            className="w-full justify-between px-1 py-1 border-2 border-gray-200 cursor-pointer font-sofia text-sm rounded-md mb-2 bg-slate-100"
          />
          <div
            className={`w-full bg-[#ECECEC] border-2 border-slate-200   flex-col gap-2 p-2 flex mb-3`}
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
      <div className="flex flex-row-reverse justify-around mt-5">
        <Button
          onClick={publish}
          className="w-1/3 bg-[#3800A7] hover:bg-[#1e0846]"
          disabled={
            selected.length < 3 || !guideTitle || !safesteps || isInteracting
          }
        >
          {isInteracting && clicked === "publish" ? (
            <CircleLoader
              cssOverride={override}
              color={"white"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Publish"
          )}
        </Button>
        <Button
          onClick={saveDraft}
          disabled={!guideTitle || isInteracting}
          variant="outline"
          className="w-1/3 bg-white border border-[#3800A7] text-black hover:bg-[#1e0846] hover:text-white"
        >
          {isInteracting && clicked === "draft" ? (
            <CircleLoader
              cssOverride={override}
              color={"#3800A7"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Save to drafts"
          )}
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
