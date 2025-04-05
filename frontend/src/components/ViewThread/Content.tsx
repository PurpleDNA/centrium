import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { useEffect, useState } from "react";
function Content() {
  const { thread_id } = useParams();
  const { useGetPost } = useCentriumHooks();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { data: result, status } = useGetPost(thread_id!);

  useEffect(() => {
    if (status === "success" && result) {
      const post = result as never[];
      setContent(post[1]);
      setTags(post[2]);
    }
  }, [status, result]);

  return (
    <div className="w-full flex flex-col gap-5 pb-3 border-b-2 border-slate-300">
      <h1 className="font-semibold text-2xl pt-1 md:text-4xl md:mb-4 px-3 break-words">
        {"wazza"}
      </h1>
      <div className="flex gap-3 px-3 items-center pb-4 border-b-2 border-slate-300">
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
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
        }}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="tags flex gap-1 md:gap-3 px-5">
        {tags.map((tag: string) => (
          <span className="rounded-md font-sofia text-xs bg-[#ECECEC] p-1 inline w-auto text-black">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Content;
