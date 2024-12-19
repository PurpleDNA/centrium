import Following from "@/components/Home/Following";
import Guides from "@/components/Home/Guides";
import Threads from "@/components/Home/Threads";
import Connect from "@/components/Static/Connect";
import { useState } from "react";

function Home() {
  const [activePage, setActivePage] = useState("following");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="flex">
      <div className="w-full lg:w-3/4">
        <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white">
          <div className="flex gap-16 mx-auto font-sofia w-max font-semibold">
            <span
              onClick={() => handleNavigation("following")}
              className={`cursor-pointer ${
                activePage === "following" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Following
            </span>
            <span
              onClick={() => handleNavigation("threads")}
              className={`cursor-pointer ${
                activePage === "threads" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Threads
            </span>
            <span
              onClick={() => handleNavigation("guides")}
              className={`cursor-pointer ${
                activePage === "guides" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Guides
            </span>
          </div>
        </div>
        <div className="">
          {activePage === "following" && <Following />}
          {activePage === "threads" && <Threads />}
          {activePage === "guides" && <Guides />}
        </div>
      </div>
      <div className="w-1/3 hidden lg:block">
        <Connect />
      </div>
    </div>
  );
}

export default Home;
