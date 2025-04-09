import FeedPost from "./FeedPost";
// import thread from "../../assets/thread.png";
import guide from "../../assets/guides.png";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
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
}

function YourFeed() {
  console.log("Your Feed");
  const { formatAllPosts, setIsLoading } = useCentriumHooks();
  const [postFeed, setPostFeed] = useState<feedPostProps[] | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = await formatAllPosts();
    setPostFeed(data as unknown as feedPostProps[]);
    if (data) {
      setCachedPosts(data);
    }
    setIsLoading(false);
  }, [setIsLoading, formatAllPosts]);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      setPostFeed(cached);
    } else {
      fetchPosts();
    }
  }, [fetchPosts]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full"
    >
      {postFeed?.map((post, index) => (
        <div key={index}>
          {post.postType === guide ? (
            <Link to="/guide">
              <FeedPost {...post} />
            </Link>
          ) : (
            <FeedPost {...post} />
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default YourFeed;
