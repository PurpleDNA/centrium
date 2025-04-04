import CommentSection from "@/components/ViewThread/CommentSection";
import Content from "@/components/ViewThread/Content";
import { ThumbsDown, ThumbsUp, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Similar from "@/components/ViewThread/Slider/Similar";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewThread = () => {
  const { thread_id } = useParams();
  const { useGetPost, getProfile, setIsLoading } = useCentriumHooks();
  const { data: result, status } = useGetPost(thread_id!);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [author, setAuthor] = useState("");
  const [follow, setFollow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.userProfile.walletAddress);
  function formatbigInt(bigInt: number) {
    const formatted = Number(String(bigInt).slice(0, String(bigInt).length));
    return formatted;
  }
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (status === "success" && result) {
        const post = result as never[];
        const authorProfile = await getProfile(post[0]);
        const authorr = (authorProfile as unknown as { username: string })
          .username;
        setLikes(formatbigInt(post[7]));
        setDislikes(formatbigInt(post[8]));
        setAuthor(authorr);
        if (user && user !== post[0]) {
          setFollow(true);
        }
      }
    }
    fetchData();
    setIsLoading(false);
  }, [status, result, user]);

  return (
    <div className="flex w-full">
      <div className="w-full lg:w-2/3 flex flex-col gap-5 border-r-2 border-slate-300">
        <Content />
        <div className="flex gap-8 px-3">
          {/* <div className="flex gap-2 items-center">
            <BookOpenCheck size={"20px"} />{" "}
            <span className="text-sm font-sofia">45 Read</span>
          </div> */}
          <div className="flex gap-2 items-center">
            <ThumbsUp size={"20px"} />{" "}
            <span className="text-sm font-sofia">{likes} Likes</span>
          </div>
          <div className="flex gap-2 items-center">
            <ThumbsDown size={"20px"} />{" "}
            <span className="text-sm font-sofia">{dislikes} Dislikes</span>
          </div>
          <div className="flex gap-2 items-center">
            <Bookmark size={"20px"} />{" "}
            <span className="text-sm font-sofia">18 Saves</span>
          </div>
        </div>
        {follow && (
          <div className="w-full flex gap-4 justify-center items-center">
            <p>
              Enjoyed this post? follow{" "}
              <span className="font-semibold">{author} </span>
            </p>
            <Button>Follow</Button>
          </div>
        )}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex-start px-3">
            <h2 className="font-semibold font-sofia">More like this</h2>
          </div>
          <div className="w-full px-3">
            <Similar />
          </div>
        </div>
      </div>
      <div className="w-1/3 z-50 hidden lg:block">
        <CommentSection />
      </div>
    </div>
  );
};

export default ViewThread;
