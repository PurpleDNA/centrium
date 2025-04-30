import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

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
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-5 pb-3 border-b-2 border-slate-300">
      <h1 className="font-semibold text-2xl pt-1 md:text-4xl md:mb-4 px-3 break-words">
        {content ? "Title Placeholder till Marv Delivers" : <Skeleton />}
      </h1>
      <div className="flex gap-3 px-3 items-center pb-4 border-b-2 border-slate-300">
        <div>
          <img
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${addr}`);
            }}
            src={profpic}
            alt="user profile picture"
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400 font-semibold">
              {author ? author : <Skeleton />}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm font-sofia">
              {addr ? truncateAddress(addr) : <Skeleton />}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>{date === 0 ? <Skeleton /> : formatDate(date)}</span>
            <Dot />
            <span>
              {content ? estTime(content) : <Skeleton className="inline" />}{" "}
              minute read
            </span>
          </div>
        </div>
      </div>
      {!content && (
        <div className="w-4/5 mx-auto">
          <Skeleton count={5} />
        </div>
      )}
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
            onClick={() => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Content;
