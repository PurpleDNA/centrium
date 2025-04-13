import FeedPost from "./FeedPost";
// import thread from "../../assets/thread.png";
import guide from "../../assets/guides.png";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useState, useEffect, useCallback, useRef } from "react";
import { getCachedPosts, setCachedPosts } from "@/AppServices/utils/postsCache";
import useScrollRestoration from "@/AppServices/utils/UseScrollRestoration";

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
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTop = scrollRef.current?.scrollTop ?? 0;
  const { formatAllPosts } = useCentriumHooks();
  const [postFeed, setPostFeed] = useState<feedPostProps[] | null>(null);

  const fetchPosts = useCallback(async () => {
    const data = await formatAllPosts();
    setPostFeed(data as unknown as feedPostProps[]);
    if (data) {
      setCachedPosts(data);
    }
  }, [formatAllPosts]);

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

  useScrollRestoration("feed", scrollRef);
  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full scrollable h-screen overflow-scroll"
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
