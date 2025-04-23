// import React from "react";
import FeedPost from "./FeedPost";
import { motion } from "motion/react";
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

function Guides() {
  const { formatAllPosts, setIsLoading } = useCentriumHooks();
  const [guideFeed, setGuideFeed] = useState<feedPostProps[] | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = (await formatAllPosts()) as unknown as feedPostProps[];
    const onlyGuide = data.filter((post) => post.isGuide);
    setGuideFeed(onlyGuide);
    if (data) {
      setCachedPosts(data);
    }
  }, []);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      const onlyGuide = cached.filter((post: feedPostProps) => post.isGuide);
      setGuideFeed(onlyGuide);
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
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

export default Guides;
