// import React from "react";
import FeedPost from "./FeedPost";
import thread from "../../assets/thread.png";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
function Threads() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full"
    >
      {feed.map((post, index) => (
        <div key={index}>
          <Link to="/post">
            <FeedPost {...post} />
          </Link>
        </div>
      ))}
    </motion.div>
  );
}
const feed: {
  username: string;
  date: string;
  title: string;
  demo: string;
  duration: number;
  postType: string;
}[] = [
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "PurpleDNA",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "LAITO",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "One of the biggest challenges in Web3 is scalability. As blockchain networks grow, they often struggle with slow transaction speeds and high gas fees. Ethereum, for example, can process only about 15 transactions per second, leading to congestion and expensive fees during peak usage.",
    duration: 4,
    postType: thread,
  },
];

export default Threads;
