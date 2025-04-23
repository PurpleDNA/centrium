// import React from "react";
import FeedPost from "./FeedPost";
import { motion } from "motion/react";
import thread from "../../assets/thread.png";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useState, useEffect, useCallback } from "react";
import { getCachedPosts, setCachedPosts } from "@/AppServices/utils/postsCache";

interface feedPostProps {
  username: string;
  date: string;
  title: string;
  demo: string;
  duration: number;
  postType: string;
  tags: string[];
  postHash: string;
  userAddr: string;
  desc: string;
  isGuide: boolean;
}

function Threads() {
  const { formatAllPosts, setIsLoading } = useCentriumHooks();
  const [threadFeed, setThreadFeed] = useState<feedPostProps[] | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = (await formatAllPosts()) as unknown as feedPostProps[];
    const onlyThread = data.filter((post) => post.postType === thread);
    setThreadFeed(onlyThread);
    if (data) {
      setCachedPosts(data);
    }
  }, []);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      const onlyThread = cached.filter((post: feedPostProps) => !post.isGuide);
      setThreadFeed(onlyThread);
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full"
    >
      {threadFeed?.map((post, index) => (
        <div key={index}>
          <FeedPost {...post} />
        </div>
      ))}
    </motion.div>
  );
}

export default Threads;
