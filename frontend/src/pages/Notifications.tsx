// import React from 'react'
import Connect from "@/components/Static/Connect";
import { useState } from "react";
import Notifs from "@/components/Notifications/Notifs";
import FeedPost from "@/components/Home/FeedPost";
// import thread from "../assets/thread.png";
import guide from "../assets/guides.png";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Notifications() {
  const [activePage, setActivePage] = useState("general");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  return (
    <div className="flex">
      <div className="w-full lg:w-3/4">
        <div className="w-full pt-4 md:pt-10 border-b-2 border-slate-300 sticky top-8 md:top-0 bg-white">
          <div className="flex justify-between px-7 md:px-24 font-sofia w-full font-semibold">
            <span
              onClick={() => handleNavigation("general")}
              className={`cursor-pointer ${
                activePage === "general" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              General
            </span>
            <span
              onClick={() => handleNavigation("postNotifs")}
              className={`cursor-pointer ${
                activePage === "postNotifs" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Post Notifications
            </span>
          </div>
        </div>
        <div className="">
          {activePage === "general" && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="w-full"
            >
              {notifsArray.map((notif, idx: number) => (
                <Notifs
                  key={idx}
                  type={notif.type}
                  stats={notif.stats}
                  info={notif.info}
                  time={notif.time}
                />
              ))}
            </motion.div>
          )}
          {activePage === "postNotifs" &&
            (feed.length > 0 ? (
              <div className=" w-full">
                {feed.map((post, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    key={index}
                  >
                    {post.postType === guide ? (
                      <Link to="/guide">
                        <FeedPost {...post} />
                      </Link>
                    ) : (
                      <Link to="/post">
                        <FeedPost {...post} />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="flex flex-col justify-center items-center w-full h-screen"
              >
                <img src="/assets/emptyMail.png" alt="" />
                <h1 className="text-lg font-sofia font-semibold text-black">
                  No post notifications
                </h1>
                <p className="text-sm font-sofia text-slate-600 text-center w-[60%]">
                  No post Notifications presently, Follow other users and turn
                  on post notifications for your favourite creators
                </p>
              </motion.div>
            ))}
        </div>
      </div>
      <div className="w-1/3 hidden lg:block">
        <Connect />
      </div>
    </div>
  );
}

const notifsArray = [
  {
    type: "/assets/like.png",
    stats: "20 people liked your post",
    time: "1",
    info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
  {
    type: "/assets/announcements.png",
    stats: "Centrium X BNB Network",
    time: "3",
    info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
  {
    type: "/assets/saved.png",
    stats: "5 people saved your guide post",
    time: "8",
    info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
  {
    type: "/assets/book.png",
    stats: "Yay!!!, your thread post now has over 200 reads",
    time: "10",
    info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
  {
    type: "/assets/dislike.png",
    stats: "84 people disliked your post",
    time: "12",
    info: "Navigating writing and reading with Inkworth Navigating writing and reading with Inkworth",
  },
  {
    type: "/assets/rating.png",
    stats: "20 people rated your guide post",
    time: "18",
    info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
  {
    type: "/assets/follow.svg",
    stats: "Yay!!!, you have 20 new followers",
    time: "24",
    // info: "Creating breakthrough solutions in web3 alongside sabertooth and BNB crypto network. learn more",
  },
];

const feed:
  | {
      username: string;
      date: string;
      title: string;
      demo: string;
      duration: number;
      postType: string;
    }[]
  | [] = [
  // {
  //   username: "The Rizz King",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: guide,
  // },
  // {
  //   username: "PurpleDNA",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: thread,
  // },
  // {
  //   username: "LAITO",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: guide,
  // },
  // {
  //   username: "The Rizz King",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: guide,
  // },
  // {
  //   username: "PurpleDNA",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: thread,
  // },
  // {
  //   username: "LAITO",
  //   date: "31 jul 2024",
  //   title: "Navigating writing and reading with Inkworth",
  //   demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community, receiving feedback and with a vibrant community",
  //   duration: 4,
  //   postType: guide,
  // },
];
export default Notifications;
