// import { useLocation } from "react-router-dom";
// import thread from "../../assets/thread.png";
// import guide from "../../assets/guides.png";
import useScrollRestoration from "@/AppServices/utils/UseScrollRestoration";
// import { getCachedPosts, setCachedPosts } from "@/AppServices/utils/postsCache";
// import FallbackLoading from "../FallbackLoading";
import FeedPost from "./FeedPost";
import { motion } from "motion/react";
import { FC, useRef } from "react";
import { feedPostProps } from "@/pages/Home";
interface YourFeedProps {
  postFeed: feedPostProps[];
  style?: string;
}

const YourFeed: FC<YourFeedProps> = ({ postFeed, style }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // const fetchPosts = useCallback(async () => {
  //   setIsLoading(true);
  //   const data = await formatAllPosts();
  //   setPostFeed(data as unknown as feedPostProps[]);
  //   setIsLoading(false);
  //   if (data) {
  //     setCachedPosts(data);
  //   }
  // }, [formatAllPosts, setIsLoading]);

  // useEffect(() => {
  //   const cached = getCachedPosts();
  //   if (cached) {
  //     setPostFeed(cached);
  //   } else {
  //     fetchPosts();
  //   }
  // }, [fetchPosts]);

  // useEffect(() => {
  //   if (scrollTop) console.log(scrollTop);
  // }, [location.pathname, scrollTop]);

  useScrollRestoration(scrollRef);
  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={` w-full scrollable h-screen overflow-scroll ${style}`}
    >
      {postFeed?.map((post, index) => (
        <div key={index}>
          <FeedPost {...post} />
        </div>
      ))}
    </motion.div>
  );
};

export default YourFeed;
