import profpic from "../../assets/rizzking.svg";
import { Dot } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { useEffect, useState } from "react";
function Content() {
  // console.log("content");
  const { thread_id } = useParams();
  const { useGetPost, getProfile, formatDate, estTime } = useCentriumHooks();
  const [author, setAuthor] = useState("");
  const [addr, setAddr] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [time, setTime] = useState(0);
  const { data: result, status } = useGetPost(thread_id!);

  useEffect(() => {
    console.log("content");
    async function fetchData() {
      if (status === "success" && result) {
        const post = result as never[];
        const authorProfile = await getProfile(post[0]);
        const authorr = (authorProfile as unknown as { username: string })
          .username;
        const truncAddr =
          (post[0] as string).slice(0, 6) +
          "....." +
          (post[0] as string).slice(-5);
        setAddr(truncAddr);
        setAuthor(authorr);
        setContent(post[1]);
        setTags(post[2]);
        setDate(formatDate(post[5]));
        setTime(estTime(post[1]));
      }
    }
    fetchData();
  }, [status, result, getProfile, formatDate, estTime]);

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
              {addr}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>{date}</span>
            <Dot />
            <span>{time} minute read</span>
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
