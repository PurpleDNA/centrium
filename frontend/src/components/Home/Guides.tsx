// import React from "react";
import FeedPost from "./FeedPost";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { feedPostProps } from "@/pages/Home";
interface YourFeedProps {
  postFeed: feedPostProps[];
}

function Guides({ postFeed }: YourFeedProps) {
  const [guideFeed, setGuideFeed] = useState<feedPostProps[]>([]);

  useEffect(() => {
    const onlyGuide = postFeed.filter((post: feedPostProps) => post.isGuide);
    setGuideFeed(onlyGuide);
  }, [postFeed]);

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
