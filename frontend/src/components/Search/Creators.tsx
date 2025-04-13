// import React from "react";
import { useState } from "react";
import profpic from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
const Creators = () => {
  const [isFollowing, setIsFollowing] = useState<number[]>([]);

  const handleFollowing = (number: number) => {
    if (!isFollowing.includes(number)) {
      setIsFollowing((prev) => [...prev, number]);
    } else {
      setIsFollowing((prev) => prev.filter((value) => value !== number));
    }
  };
  return (
    <div className="">
      <h1 className="text-base font-semibold font-sofia">Creators to Follow</h1>
      {creatorsList.map((creator, i) => (
        <div key={i} className="flex justify-between gap-1 my-6 items-center">
          <div className="flex justify-between gap-1 items-center">
            <img src={creator.profpic} alt="" />
            <div className="flex flex-col justify-start">
              <h1 className="font-sofia text-base">{creator.username}</h1>
              <p className="hidden lg:block">{creator.bio}</p>
            </div>
          </div>
          <Button onClick={() => handleFollowing(i)}>
            {isFollowing?.includes(i) ? "Following" : "Follow"}
          </Button>
        </div>
      ))}
    </div>
  );
};

const creatorsList = [
  {
    profpic: profpic,
    username: "The Rizz King",
    bio: "King in the north, The commander of rizz. Number 1 Crypto, airdrop and shitcoin enthusiast. Creating top guides and intriguing posts",
  },
  {
    profpic: profpic,
    username: "The Rizz King",
    bio: "King in the north, The commander of rizz. Number 1 Crypto, airdrop and shitcoin enthusiast. Creating top guides and intriguing posts",
  },
  {
    profpic: profpic,
    username: "The Rizz King",
    bio: "King in the north, The commander of rizz. Number 1 Crypto, airdrop and shitcoin enthusiast. Creating top guides and intriguing posts",
  },
  {
    profpic: profpic,
    username: "The Rizz King",
    bio: "King in the north, The commander of rizz. Number 1 Crypto, airdrop and shitcoin enthusiast. Creating top guides and intriguing posts",
  },
];

export default Creators;
