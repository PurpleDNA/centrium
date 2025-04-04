// import React from "react";
import ERR404 from "../assets/404.png";
import { Button } from "./ui/button";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-col justify-center gap-8 items-center h-screen">
      <p className="font-sofia text-center text-4xl font-semibold">
        You should not be here 🧭
      </p>
      <img src={ERR404} alt="" className="max-w-[50%] mx-auto" />
      <Button
        onClick={() => navigate(-1)}
        className="w-max mx-auto bg-[#3800A7] hover:bg-[#1e0846]"
      >
        Go Back <Undo2 />
      </Button>
    </div>
  );
}

export default NotFound;
