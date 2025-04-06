import YourFeed from "@/components/Home/YourFeed";
import Guides from "@/components/Home/Guides";
import Threads from "@/components/Home/Threads";
import Connect from "@/components/Static/Connect";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../Contexts/Context";

function Home() {
  const [activePage, setActivePage] = useState("following");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isNavOpen, setIsModalOpen } = useSafeContext();
  const toggleModal = () => setIsModalOpen((prev: boolean) => !prev);

  return (
    <div className="flex">
      <div className="w-full lg:w-3/4">
        <div className="w-full pt-4 md:pt-10 border-b-2 border-slate-300 sticky top-8 md:top-0 bg-white">
          <div className="flex justify-between px-4 md:px-16 font-sofia w-full font-semibold">
            <span
              onClick={() => handleNavigation("following")}
              className={`cursor-pointer ${
                activePage === "following" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Your Feed
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
          {activePage === "following" && <YourFeed />}
          {activePage === "threads" && <Threads />}
          {activePage === "guides" && <Guides />}
        </div>
      </div>
      <div className="w-1/3 hidden lg:block">
        <Connect />
      </div>
      <Button
        onClick={toggleModal}
        className={`bg-[#3800A7] mt-12 hover:bg-[#1e0846] py-6 w-max md:hidden fixed bottom-16 right-8`}
      >
        {" "}
        <PenLine className={`${isNavOpen ? "mr-4" : "mx-auto"}`} />
      </Button>
    </div>
  );
}

export default Home;
