import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";

interface contentProps {
  author: string;
  addr: "" | `0x${string}`;
  content: string;
  date: number;
  tags: string[];
}

function Content({ author, addr, content, date, tags }: contentProps) {
  // console.log("content");
  const { formatDate, truncateAddress, estTime } = useCentriumHooks();

  return (
    <div className="w-full flex flex-col gap-5 pb-3 border-b-2 border-slate-300">
      <h1 className="font-semibold text-2xl pt-1 md:text-4xl md:mb-4 px-3 break-words">
        {"Title Placeholder till Marv Delivers"}
      </h1>
      <div className="flex gap-3 px-3 items-center pb-4 border-b-2 border-slate-300">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400 font-semibold">
              {author}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm font-sofia">
              {addr ? truncateAddress(addr) : ""}{" "}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>{date === 0 ? "" : formatDate(date)}</span>
            <Dot />
            <span>{estTime(content)} minute read</span>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "20px 20px 0px",
          backgroundColor: "#fff",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="tags flex gap-1 md:gap-3 px-5">
        {tags.map((tag: string, i) => (
          <span
            key={i}
            className="rounded-md font-sofia text-xs bg-[#ECECEC] hover:bg-[#cecdcd] p-1 inline w-auto text-black cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Content;
