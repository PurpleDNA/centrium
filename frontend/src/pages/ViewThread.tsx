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
  const {
    useGetPost,
    getProfile,
    setIsLoading,
    follow,
    unfollow,
    likePost,
    dislikePost,
    formatBigInt,
  } = useCentriumHooks();
  const { data: result, status } = useGetPost(thread_id!);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [author, setAuthor] = useState("");
  const [addr, setAddr] = useState<`0x${string}` | "">("");
  const [canfollow, setCanFollow] = useState(false);
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState("Following");
  const [isLiked, setIsLiked] = useState("neither");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProfile = useSelector((state: any) => state.userProfile);
  const user = userProfile.walletAddress;

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (status === "success" && result) {
        const post = result as never[];
        const authorProfile = await getProfile(post[0]);
        const authorr = (
          authorProfile as unknown as { username: `0x${string}` }
        ).username;
        setLikes(formatBigInt(post[7]));
        setDislikes(formatBigInt(post[8]));
        setAuthor(authorr);
        setAddr(post[0]);
        if (userProfile.followingList) {
          const followingList = userProfile.followingList as `0x${string}`[];
          if (followingList.includes(post[0])) {
            setFollowing(true);
          } else setFollowing(false);
        }
        if (user && user !== post[0]) {
          setCanFollow(true);
        }
      }
    }
    fetchData();
    setIsLoading(false);
  }, [status, result, user, userProfile.followingList]);

  const handleFollow = async () => {
    if (following) {
      if (addr) unfollow(addr);
    } else {
      if (addr) follow(addr);
    }
  };
  const handleLIke = async () => {
    if (isLiked === "yes") {
      setIsLiked("neither");
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked("yes");
      await likePost(thread_id!);
      setLikes((prev) => prev + 1);
    }
  };
  const handleDislike = async () => {
    if (isLiked === "no") {
      setIsLiked("neither");
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked("no");
      await dislikePost(thread_id!);
      setDislikes((prev) => prev + 1);
    }
  };
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
            <ThumbsUp
              fill={isLiked === "yes" ? "currentColor" : "none"}
              stroke={isLiked === "yes" ? "white" : "black"}
              className="cursor-pointer"
              onClick={handleLIke}
              size={"20px"}
            />{" "}
            <span className="text-sm font-sofia">{likes} Likes</span>
          </div>
          <div className="flex gap-2 items-center">
            <ThumbsDown
              fill={isLiked === "no" ? "currentColor" : "none"}
              stroke={isLiked === "no" ? "white" : "black"}
              className="cursor-pointer"
              onClick={handleDislike}
              size={"20px"}
            />{" "}
            <span className="text-sm font-sofia">{dislikes} Dislikes</span>
          </div>
          <div className="flex gap-2 items-center">
            <Bookmark size={"20px"} />{" "}
            <span className="text-sm font-sofia">18 Saves</span>
          </div>
        </div>
        {canfollow && (
          <div className="w-full flex gap-4 justify-center items-center">
            <p>
              Enjoyed this post? follow{" "}
              <span className="font-semibold">{author} </span>
            </p>
            {following ? (
              <Button
                onMouseOver={() => setAction("Unfollow")}
                onMouseLeave={() => setAction("Following")}
                onClick={handleFollow}
                className=" hover:bg-red-500"
              >
                {action}
              </Button>
            ) : (
              <Button onClick={handleFollow}>Follow</Button>
            )}
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
