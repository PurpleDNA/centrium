// import React from 'react'
import isEqual from "lodash/isEqual";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/ViewThread/CommentSection";
import GuideContent from "@/components/ViewGuide/GuideContent";
import { ThumbsUp, ThumbsDown, Bookmark, MessageCircle } from "lucide-react";
import Similar from "@/components/ViewThread/Slider/Similar";
import { useParams } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CommentProps } from "@/components/ViewThread/CommentSection";
import { motion } from "motion/react";

const ViewGuide = () => {
  console.log("View Guide");
  const { post_id } = useParams();
  const {
    // useGetPost,
    getPostAsync,
    getProfile,
    setIsLoading,
    follow,
    unfollow,
    likePost,
    dislikePost,
    formatBigInt,
  } = useCentriumHooks();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [author, setAuthor] = useState("");
  const [addr, setAddr] = useState<`0x${string}` | "">("");
  const [canfollow, setCanFollow] = useState(false);
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState("Following");
  const [isLiked, setIsLiked] = useState("neither");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [youCommented, setYouCommented] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProfile = useSelector((state: any) => state.userProfile);
  const user = userProfile.walletAddress;

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const result = await getPostAsync(post_id!);
      if (result) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const post = result as any;
        const authorProfile = await getProfile(post[0]);
        const authorr = (
          authorProfile as unknown as { username: `0x${string}` }
        ).username;
        setLikes((prev) =>
          prev !== formatBigInt(post[7]) ? formatBigInt(post[7]) : prev
        );
        setDislikes((prev) =>
          prev !== formatBigInt(post[8]) ? formatBigInt(post[8]) : prev
        );
        setAuthor(authorr);
        setAddr(post[0]);
        const newComments = post[9] as CommentProps[];
        setComments((prev) =>
          isEqual(prev, newComments) ? prev : newComments
        );

        if (user && user !== post[0]) {
          setCanFollow(true);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [
    formatBigInt,
    getPostAsync,
    getProfile,
    setIsLoading,
    post_id,
    user,
    youCommented,
  ]);

  const isFollowing = useMemo(() => {
    return userProfile.followingList?.includes(addr);
  }, [userProfile.followingList, addr]);

  const setCommentsReload = useCallback(() => {
    setYouCommented((prev) => prev + 1);
  }, []);

  useEffect(() => {
    console.log("running");
    if (isFollowing !== following) {
      setFollowing(isFollowing);
    }
  }, [following, isFollowing]);

  useEffect(() => {
    const getMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    getMobile();
  }, [window.innerWidth]);

  const handleFollow = async () => {
    if (following) {
      if (addr) unfollow(addr);
    } else {
      if (addr) follow(addr);
    }
  };
  const handleLIke = async () => {
    if (isLiked === "liked") {
      setIsLiked("neither");
      setLikes((prev) => prev - 1);
    } else if (isLiked === "neither") {
      await likePost(post_id!);
      setIsLiked("liked");
      setLikes((prev) => prev + 1);
    } else {
      await likePost(post_id!);
      setIsLiked("liked");
      setLikes((prev) => prev + 1);
      setDislikes((prev) => prev - 1);
    }
  };
  const handleDislike = async () => {
    if (isLiked === "disliked") {
      setIsLiked("neither");
      setDislikes((prev) => prev - 1);
    } else if (isLiked === "neither") {
      await dislikePost(post_id!);
      setIsLiked("disliked");
      setDislikes((prev) => prev + 1);
    } else {
      await dislikePost(post_id!);
      setIsLiked("disliked");
      setDislikes((prev) => prev + 1);
      setLikes((prev) => prev - 1);
    }
  };
  const handleShowComments = useCallback(() => {
    setShowComments(false);
  }, []);

  return (
    <div className="flex">
      <div className="w-full lg:w-2/3 flex flex-col gap-5 border-r-2 border-slate-300">
        <GuideContent />
        <div className="flex gap-8 px-3">
          <div className="flex gap-2 items-center">
            <ThumbsUp
              fill={isLiked === "liked" ? "#3800A7" : "none"}
              className="cursor-pointer"
              onClick={handleLIke}
              size={"20px"}
            />
            <span className="text-base font-sofia">
              {likes} {isMobile ? "" : "Likes"}
            </span>
          </div>
          <div className="flex gap-2 items-end">
            <ThumbsDown
              fill={isLiked === "disliked" ? "#3800A7" : "none"}
              className="cursor-pointer "
              onClick={handleDislike}
              size={"20px"}
            />
            <span className="text-base font-sofia">
              {dislikes} {isMobile ? "" : "Dislikes"}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Bookmark size={"20px"} className="cursor-pointer" />{" "}
            <span className="text-base font-sofia">
              0 {isMobile ? "" : "Saves"}{" "}
            </span>
          </div>
          {isMobile && (
            <div
              onClick={() => setShowComments(true)}
              className="flex gap-2 items-center"
            >
              <MessageCircle size={"20px"} className="cursor-pointer" />
              <span className="text-base font-sofia">{comments.length}</span>
            </div>
          )}
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
        <div className="w-full flex gap-4 justify-center items-center">
          <p>Enjoyed this post? follow The RizzKing</p>
          <Button>Follow</Button>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex-start px-3">
            <h2 className="font-semibold font-sofia">More like this</h2>
          </div>
          <div className="w-full px-3 mb-10 md:mb-0">
            <Similar />
          </div>
        </div>
      </div>
      {((isMobile && showComments) || !isMobile) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          exit={{ opacity: 0, x: 100 }}
          className="w-full lg:w-1/3 z-30 "
        >
          <CommentSection
            comments={comments}
            setCommentsReload={setCommentsReload}
            setShowComments={handleShowComments}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ViewGuide;
