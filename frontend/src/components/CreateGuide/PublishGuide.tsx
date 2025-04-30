// import React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Context } from "@/Contexts/createGuideContext";
import DOMpurify from "dompurify";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { X } from "lucide-react";
import CircleLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
  // color: "white",
};

function Publish() {
  const [selected, setSelected] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const { createGuide, saveToDrafts, isInteracting } = useCentriumHooks();
  const [clicked, setClicked] = useState("neither");
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };

  const {
    guideTitle,
    guideDesc,
    steps,
    // setSteps,
    // setGuideDesc,
    // setGuideTitle,
  } = useSafeContext();
  const safesteps = steps.map((step) => [step[0], DOMpurify.sanitize(step[1])]);

  const publish = () => {
    setClicked("publish");
    createGuide(guideTitle, JSON.stringify(safesteps), guideDesc, selected);
    // setGuideDesc("");
    // setGuideTitle("");
    // setSteps([[1, ""]]);
  };

  const saveDraft = () => {
    setClicked("draft");
    saveToDrafts(guideTitle, safesteps, selected, guideDesc, false);
  };

  const handleSelected = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected((prev) => prev.filter((value) => value !== tag));
    } else if (!selected.includes(tag)) {
      setSelected((prev) => [...prev, tag.toLowerCase().replace(/\s+/g, "-")]);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
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
    <div className="hidden border-l-2 gap-5 py-5 border-l-slate-300 lg:flex flex-col scrollbar-hide sticky top-0 h-screen overflow-y-scroll px-3">
      <div className="w-full">
        <div>
          <div className="w-full flex gap-3 justify-between pr-1 py-1 border-2 border-gray-200  cursor-pointer items-center rounded-md mb-2 bg-slate-100 dark:bg-darkk dark:border-borderr">
            <div
              className={`flex flex-wrap gap-1  ${
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
                    className="text-[11px] rounded-3xl font-sofia px-2 py-1 w-max bg-[#E8E7EA] border-2 border-slate-100 items-center gap-1 flex dark:bg-[#3C3C45] dark:border-0"
                    onClick={() => handleSelected(select)}
                  >
                    {select}
                    <X
                      className="hover:bg-white rounded-full w-3 h-3"
                      onClick={() => handleSelected(select)}
                    />
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
            className="w-full justify-between px-1 py-1 border-2 border-gray-200 cursor-pointer font-sofia text-sm rounded-md mb-2 bg-slate-100 dark:bg-darkk dark:border-borderr"
          />
          <div
            className={`w-full border-2 border-slate-200   flex-col gap-2 p-2 flex dark:bg-slate-900 dark:border-borderr`}
          >
            <h3 className="font-semibold">Top tags this week</h3>
            <div className="grid grid-cols-3 text-[12px] gap-1">
              {tags.map((tag, i) =>
                selected.includes(tag.toLowerCase().replace(/\s+/g, "-")) ? (
                  <p
                    onClick={() => handleSelected(tag)}
                    key={i}
                    className="break-words cursor-pointer text-[#0000004D] dark:text-[#C4C4C6] dark:font-semibold"
                  >
                    {tag}
                  </p>
                ) : (
                  <p
                    onClick={() => handleSelected(tag)}
                    key={i}
                    className="break-words cursor-pointer dark:text-[#C4C4C6]"
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
          className="w-full bg-[#3800A7] hover:bg-[#1e0846] mb-2 dark:text-white"
          disabled={
            selected.length < 3 ||
            !guideTitle ||
            !safesteps ||
            !guideDesc ||
            isInteracting
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
          className="w-full bg-white border border-[#3800A7] text-black hover:bg-[#1e0846] hover:text-white"
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

export default Publish;
