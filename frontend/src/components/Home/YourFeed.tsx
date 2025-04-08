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
}

function YourFeed() {
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
  }, []);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached) {
      setPostFeed(cached);
    } else {
      fetchPosts();
    }
  }, []);

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
            <Link to={`/post/${post.postHash}`}>
              <FeedPost {...post} />
            </Link>
          )}
        </div>
      ))}
    </motion.div>
  );
}
// const feed: feedPostProps[] = [
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "PurpleDNA",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "LAITO",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: thread,
//   },
//   {
//     username: "The Rizz King",
//     date: "31 jul 2024",
//     title: "The Scalability Challenge in Web3 and How to Solve It",
//     demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
//     duration: 4,
//     postType: guide,
//   },
// ];

export default YourFeed;
