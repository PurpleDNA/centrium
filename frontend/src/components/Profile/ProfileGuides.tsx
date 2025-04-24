// import React from "react";
import FeedPost from "../Home/FeedPost";
import { motion } from "motion/react";
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
  desc: string;
  isGuide: boolean;
}

interface props {
  profileAddy: `0x${string}`;
}

function Threads({ profileAddy }: props) {
  const { formatAllPosts, setIsLoading } = useCentriumHooks();
  const [guideFeed, setguideFeed] = useState<feedPostProps[] | null>(null);
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = (await formatAllPosts()) as unknown as feedPostProps[];
    const onlyGuide = data.filter(
      (post) => post.isGuide && post.userAddr === profileAddy
    );
    setguideFeed(onlyGuide);
    if (data) {
      setCachedPosts(data);
    }
  }, [formatAllPosts, profileAddy, setIsLoading]);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      const onlyGuide = cached.filter(
        (post: feedPostProps) => post.isGuide && post.userAddr === profileAddy
      );
      setguideFeed(onlyGuide);
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
      {guideFeed?.map((post, index) => (
        <div key={index}>
          <FeedPost {...post} />
        </div>
      ))}
    </motion.div>
  );
}

export default Threads;
