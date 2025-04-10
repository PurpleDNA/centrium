// import React from "react";
import profpic from "../../assets/rizzking.svg";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import { useParams } from "react-router";
import { useRef, useState } from "react";
// import MoonLoader from "react-spinners/MoonLoader";
import CircleLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3800A7",
  // color: "white",
};
interface props {
  setCommentsReload: () => void;
}
const WriteComment = ({ setCommentsReload }: props) => {
  // console.log("write comment negro");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.userProfile.username);
  const { createComment, isInteracting } = useCentriumHooks();
  const { thread_id } = useParams();
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleComment = async () => {
    await createComment(thread_id!, comment);
    inputRef.current!.value = "";
    setTimeout(() => setCommentsReload(), 600);
  };
  return (
    <div className="reply flex flex-col gap-5 border-b-2 border-slate-300 pb-4">
      <div className="flex gap-2  items-center">
        <img src={profpic} alt="" />
        <span className="font-sofia font-semibold">{user}</span>
      </div>
      <textarea
        ref={inputRef}
        placeholder="what are your thoughts..."
        className="w-full px-1 text-sm outline-none overflow-hidden"
        id=""
        rows={5}
        onChange={(e) => setComment(e.currentTarget.value)}
      ></textarea>
      <div onClick={handleComment} className="flex justify-end">
        <Button disabled={!comment || isInteracting} className="bg-[#3800A7]">
          {isInteracting ? (
            <CircleLoader
              cssOverride={override}
              color={"white"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

export default WriteComment;
