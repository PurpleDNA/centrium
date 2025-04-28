// import React from 'react'
import Connect from "@/components/Search/Connect";
import RecTags from "@/components/Search/RecTags";
import YourSearch from "@/components/Home/YourFeed";
import Creators from "@/components/Search/Creators";
import { motion } from "motion/react";
import CircleLoader from "react-spinners/CircleLoader";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { feedPostProps } from "./Home";
import { useSearchParams, useNavigate } from "react-router-dom";
import searchEmpty from "../assets/searchEmpty.png";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
};
function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tag = searchParams.get("tag");
  const [search, setSearch] = useState("");
  const { searchByTag, formatAllPosts } = useCentriumHooks();

  const handleSearch = async (tag: string | null) => {
    if (tag) {
      const searchFeed = await searchByTag(
        tag.toLowerCase().replace(/\s+/g, "-")
      );
      if (searchFeed) {
        return searchFeed;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  const {
    isLoading: isSearching,
    data: searchFeed,
    isSuccess,
  } = useQuery({
    queryKey: ["searchFeed", tag],
    queryFn: () => handleSearch(tag),
    gcTime: 0,
    enabled: !!tag, // only run if tag exists
  });

  const { data: postFeed, isLoading } = useQuery<feedPostProps[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      const result = await formatAllPosts();
      if (result) {
        return result;
      } else {
        return [];
      }
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          if (search) {
            console.log("trigger button pressed");
            navigate(`/search?tag=${encodeURIComponent(search.toLowerCase())}`);
            setSearch("");
          } else return;
        }
      };
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [navigate, search]);

  return (
    <div className="flex w-full">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="w-full lg:w-3/4 flex flex-col gap-5"
      >
        <div className="w-full bg-white sticky pt-4 top-0 md:pt-5 flex justify-center">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for any tag..."
            className="px-3 w-[90%] lg:w-[70%] py-2 border-2 rounded-md  border-gray-700 mx-auto"
          />
        </div>
        {(isSearching || isSuccess) && (
          <div className="w-full py-2 px-3 border-y border-y-[#6078A6]">
            You searched for <strong>"{tag}"</strong>
          </div>
        )}
        {isSearching || isSuccess ? null : (
          <div className="border-t-2 border-slate-300 px-5 py-5">
            <RecTags />
          </div>
        )}
        {isSearching || isSuccess ? null : (
          <div className="border-y-2 border-slate-300 px-5 py-5">
            <Creators />
          </div>
        )}
        <div>
          {isSearching ? (
            <CircleLoader
              cssOverride={override}
              color={"#3800A7"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : searchFeed && searchFeed.length > 0 ? (
            <YourSearch postFeed={searchFeed} disableScroll={true} />
          ) : searchFeed && searchFeed.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center">
              <img src={searchEmpty} alt="" className="w-4/5" />
              <h1 className="font-bold font-sofia">
                oops, no posts found with that tag
              </h1>
            </div>
          ) : isLoading ? (
            <CircleLoader
              cssOverride={override}
              color={"#3800A7"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            postFeed && <YourSearch postFeed={postFeed} disableScroll={true} />
          )}
        </div>
      </motion.div>
      <div className="w-1/3 hidden lg:block">
        <Connect />
      </div>
    </div>
  );
}

export default Search;
