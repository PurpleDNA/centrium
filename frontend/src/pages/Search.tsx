// import React from 'react'
import Connect from "@/components/Search/Connect";
import RecTags from "@/components/Search/RecTags";
import YourSearch from "@/components/Home/YourFeed";
import Creators from "@/components/Search/Creators";
import { motion } from "motion/react";
import CircleLoader from "react-spinners/CircleLoader";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { feedPostProps } from "./Home";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
};
function Search() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const { searchByTag, formatAllPosts } = useCentriumHooks();
  const {
    mutateAsync,
    isPending: isSearching,
    data: searchFeed,
  } = useMutation({
    mutationFn: (tag: string) => searchByTag(tag),
    // mutationKey: ["search"],
    // onSuccess(data) {
    //   console.log(data);
    // },
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
          console.log("trigger button pressed");
          mutateAsync(search);
          setValue(search);
          setSearch("");
        }
      };
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mutateAsync, search]);

  return (
    <div className="flex w-full">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="w-full lg:w-3/4 flex flex-col gap-5"
      >
        <div className="w-full bg-white sticky pt-4 top-8 md:top-0 md:pt-5 flex justify-center">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for anything..."
            className="px-3 w-[90%] lg:w-[70%] py-2 border-2 rounded-md  border-gray-700 mx-auto"
          />
        </div>
        {searchFeed && (
          <div className="w-full py-2">You searched for "{value}"</div>
        )}
        {isSearching || searchFeed ? null : (
          <div className="border-t-2 border-slate-300 px-5 py-5">
            <RecTags />
          </div>
        )}
        {isSearching || searchFeed ? null : (
          <div className="border-y-2 border-slate-300 px-5 py-5">
            <Creators />
          </div>
        )}
        <div>
          {
            isSearching ? (
              <CircleLoader
                cssOverride={override}
                color={"#3800A7"}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : searchFeed ? (
              <YourSearch postFeed={searchFeed} />
            ) : isLoading ? (
              <CircleLoader
                cssOverride={override}
                color={"#3800A7"}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              postFeed && <YourSearch postFeed={postFeed} />
            )
            // searchFeed ? (
            // <YourSearch postFeed={searchFeed} />
            // ) : postFeed ? (
            //   <YourSearch postFeed={postFeed} />
            // ) : (
            // <CircleLoader
            //   cssOverride={override}
            //   color={"#3800A7"}
            //   size={30}
            //   aria-label="Loading Spinner"
            //   data-testid="loader"
            // />
            // )
          }
        </div>
      </motion.div>
      <div className="w-1/3 hidden lg:block">
        <Connect />
      </div>
    </div>
  );
}

export default Search;
