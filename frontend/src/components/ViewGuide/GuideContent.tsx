import profpic from "../../assets/rizzking.svg";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { useEffect, useState } from "react";
function GuideContent() {
  // console.log("content");
  const { post_id } = useParams();
  const { useGetPost, getProfile, formatDate, estTime, truncateAddress } =
    useCentriumHooks();
  const [author, setAuthor] = useState("");
  const [addr, setAddr] = useState("");
  const [content, setContent] = useState<[number, string][]>([]);
  const [guideDesc, setGuideDesc] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { data: result, status } = useGetPost(post_id!);

  useEffect(() => {
    console.log("content");
    async function fetchData() {
      if (status === "success" && result) {
        const post = result as never[];
        const authorProfile = await getProfile(post[0]);
        const authorr = (authorProfile as unknown as { username: string })
          .username;
        const truncAddr = truncateAddress(post[0]);
        setAddr(truncAddr);
        setAuthor(authorr);
        setContent(JSON.parse(post[1]));
        setTags(post[2]);
        setGuideDesc(post[3]);
        setDate(formatDate(post[5]));
      }
    }
    fetchData();
  }, [status, result, getProfile, formatDate, estTime, truncateAddress]);

  return (
    <div className="w-full flex flex-col gap-7 pb-3 border-b border-slate-300">
      <div>
        <h1 className="font-semibold text-2xl pt-1 md:text-4xl md:mb-4 px-3 break-words">
          {"Title Placeholder till Marv Delivers"}
        </h1>
        <p className="px-3">{guideDesc}</p>
      </div>
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
          </div>
        </div>
      </div>
      <div>
        {content.map((safestep: [number, string], i: number) => (
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
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: safestep[1] }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
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

export default GuideContent;
