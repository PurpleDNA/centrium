// import React from "react";
import { PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { feedPostProps } from "@/pages/Home";
import Looking from "../../assets/Looking.png";
import { Context } from "@/Contexts/Context";
import FeedPost from "../Home/FeedPost";
import { motion } from "motion/react";
import thread from "../../assets/thread.png";
import { useState, useEffect, useContext } from "react";

interface props {
  postFeed: feedPostProps[];
  disableScroll?: boolean;
  profileAddy: `0x${string}`;
  userProfile: `0x${string}`;
}

function Threads({ profileAddy, postFeed, userProfile }: props) {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { setIsModalOpen } = useSafeContext();
  const toggleModal = () => setIsModalOpen((prev: boolean) => !prev);
  const [threadFeed, setThreadFeed] = useState<feedPostProps[] | null>(null);

  useEffect(() => {
    const onlyThread = postFeed.filter(
      (post) => post.postType === thread && post.userAddr === profileAddy
    );
    setThreadFeed(onlyThread);
  }, [postFeed, profileAddy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className=" w-full h-full"
    >
      {threadFeed && threadFeed.length > 0 ? (
        threadFeed.map((post, index) => (
          <div key={index}>
            <FeedPost {...post} />
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-3 items-center h-full">
          <img src={Looking} alt="" className="w-1/2" />
          <p className="font-sofia font-bold text-lg">No Posts here</p>
          {profileAddy === userProfile && (
            <div className="w-full flex flex-col items-center">
              <p className="font-sofia text-center">
                Create your first post, make your dent in the web 3 space
              </p>
              <Button
                onClick={toggleModal}
                className={`bg-[#3800A7] mt-2 w-max hover:bg-[#1e0846] py-6 `}
              >
                <PenLine className="mr-4" />
                Create Your First Post
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Threads;
