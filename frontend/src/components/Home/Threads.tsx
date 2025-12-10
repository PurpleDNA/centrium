// import React from "react";
import FeedPost from "./FeedPost";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { feedPostProps } from "@/pages/Home";
interface YourFeedProps {
  postFeed: feedPostProps[];
}

function Threads({ postFeed }: YourFeedProps) {
  const [threadFeed, setThreadFeed] = useState<feedPostProps[]>([]);

  useEffect(() => {
    const onlyThread = postFeed.filter((post: feedPostProps) => !post.isGuide);
    setThreadFeed(onlyThread);
  }, [postFeed]);

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
