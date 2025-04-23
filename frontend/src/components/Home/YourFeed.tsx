import FeedPost from "./FeedPost";
// import thread from "../../assets/thread.png";
// import guide from "../../assets/guides.png";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useState, useEffect, useCallback, useRef } from "react";
import { getCachedPosts, setCachedPosts } from "@/AppServices/utils/postsCache";
import useScrollRestoration from "@/AppServices/utils/UseScrollRestoration";
import FallbackLoading from "../FallbackLoading";

interface feedPostProps {
  username: string;
  date: string;
  title: string;
  desc: string;
  demo: string;
  duration: number;
  postType: string;
  tags: string[];
  postHash: string;
  userAddr: string;
  isGuide: boolean;
}

function YourFeed() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTop = scrollRef.current?.scrollTop ?? 0;
  const { formatAllPosts } = useCentriumHooks();
  const [postFeed, setPostFeed] = useState<feedPostProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(isLoading);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const data = await formatAllPosts();
    setPostFeed(data as unknown as feedPostProps[]);
    setIsLoading(false);
    if (data) {
      setCachedPosts(data);
    }
  }, [formatAllPosts, setIsLoading]);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      setPostFeed(cached);
    } else {
      fetchPosts();
    }
  }, [fetchPosts]);

  useEffect(() => {
    if (scrollTop) console.log(scrollTop);
  }, [location.pathname, scrollTop]);

  useScrollRestoration(scrollRef);
  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full scrollable h-screen overflow-scroll"
    >
      {isLoading && <FallbackLoading />}
      {postFeed?.map((post, index) => (
        <div key={index}>
          <FeedPost {...post} />
        </div>
      ))}
    </motion.div>
  );
}

export default YourFeed;
