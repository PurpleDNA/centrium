// import React from "react";
import FeedPost from "../Home/FeedPost";
import { motion } from "motion/react";
import thread from "../../assets/thread.png";
import { Link } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useState, useEffect, useCallback } from "react";
import { getCachedPosts, setCachedPosts } from "@/AppServices/utils/postsCache";

interface feedPostProps {
  username: string;
  useraddr: string;
  date: string;
  title: string;
  demo: string;
  duration: number;
  postType: string;
  tags: string[];
  postHash: string;
  userAddr: string;
}

interface props {
  profileAddy: `0x${string}`;
}

function Threads({ profileAddy }: props) {
  const { formatAllPosts, setIsLoading } = useCentriumHooks();
  const [threadFeed, setThreadFeed] = useState<feedPostProps[] | null>(null);
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = (await formatAllPosts()) as unknown as feedPostProps[];
    const onlyThread = data.filter(
      (post) => post.postType === thread && post.userAddr === profileAddy
    );
    setThreadFeed(onlyThread);
    if (data) {
      setCachedPosts(data);
    }
  }, [formatAllPosts, profileAddy, setIsLoading]);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      const onlyThread = cached.filter(
        (post: feedPostProps) =>
          post.postType === thread && post.userAddr === profileAddy
      );
      setThreadFeed(onlyThread);
    } else {
      fetchPosts();
    }
  }, [fetchPosts, profileAddy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full"
    >
      {threadFeed?.map((post, index) => (
        <div key={index}>
          <Link to={`/post/${post.postHash}`}>
            <FeedPost {...post} />
          </Link>
        </div>
      ))}
    </motion.div>
  );
}

export default Threads;
