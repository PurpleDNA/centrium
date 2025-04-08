// import React from "react";
import WriteComment from "./WriteComment";
import { ChevronDown } from "lucide-react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useEffect, useState } from "react";
// import { useWatchContractEvent } from "wagmi";
// import abi from "../../ABI/lock-abi.json";
// import FallbackLoading from "../FallbackLoading";

interface CommentProps {
  commenter: `0x${string}`;
  content: string;
  timestamp: bigint;
}
const CommentSection = () => {
  const { thread_id } = useParams();
  const { getPostAsync } = useCentriumHooks();
  // const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const [commentsNum, setCommentsNum] = useState(0);
  const [comments, setComments] = useState<CommentProps[]>([]);

  // useWatchContractEvent({
  //   abi,
  //   address,
  //   eventName: "CommentAdded",
  //   onLogs(logs) {
  //     const logArgs = logs[0] as unknown as {
  //       args: { postHash: string; commenter: string };
  //     };
  //     console.log("Return value:", logArgs.args);
  //     const args = logArgs.args;
  //     if (args.postHash === thread_id) setComments([]);
  //   },
  //   pollingInterval: 1_000,
  // });

  async function fetchData() {
    const result = await getPostAsync(thread_id!);
    if (result) {
      const post = result as unknown as never[];
      const data = post[9] as CommentProps[];
      const sortedComments = data.sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp)
      );
      setComments(sortedComments);
      setCommentsNum(data.length);
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <div className="hidden gap-5 py-5 px-3 lg:flex flex-col sticky top-0 h-screen overflow-y-scroll bg-white">
      {/* {!comments && <FallbackLoading />} */}
      <h1 className="font-sofia font-semibold px-3 py-3 border-b-2 border-slate-300 w-full">
        {commentsNum} {commentsNum === 1 ? "Comment" : "Comments"}
      </h1>
      <WriteComment />
      <div className="flex gap-3 items-center">
        <h1 className="font-sofia text-sm">Most Relevant</h1>
        <ChevronDown />
      </div>
      <div>
        {(comments as unknown as CommentProps[]).map((comment) => (
          <Comment content={comment.content} commenter={comment.commenter} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
