// import React from 'react'
import Bookmarks from "@/components/Home/YourFeed";
import Guides from "@/components/Home/Guides";
import Drafts from "@/components/Profile/Drafts";
import Threads from "@/components/Profile/ProfileThreads";
import ProfileCard from "../components/Profile/ProfileCard";
import { useContext, useState } from "react";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { Context } from "../Contexts/Context";
// import { useCentriumHooks } from "@/AppServices/CentriumHooks";

function Profile() {
  const [activePage, setActivePage] = useState("threads");
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
  const { isEditProfileOpen } = useSafeContext();
  return (
    <div className="flex w-full">
      <div className="w-full lg:w-2/3 flex flex-col gap-5">
        <div className="w-full pt-4 md:pt-10 border-b-2 border-slate-300 sticky top-8 md:top-0 bg-white">
          <div className="flex justify-between mx-auto font-sofia w-full font-semibold px-4 md:px-10">
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
            <span
              onClick={() => handleNavigation("saved")}
              className={`cursor-pointer ${
                activePage === "saved" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Saved
            </span>
            <span
              onClick={() => handleNavigation("drafts")}
              className={`cursor-pointer ${
                activePage === "drafts" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Drafts
            </span>
          </div>
        </div>
        <div className="">
          {activePage === "threads" && <Threads />}
          {activePage === "guides" && <Guides />}
          {activePage === "saved" && <Bookmarks />}
          {activePage === "drafts" && <Drafts />}
        </div>
      </div>
      <div className={`w-1/3 hidden lg:block`}>
        <ProfileCard />
      </div>
      {isEditProfileOpen ? <EditProfileModal /> : null}
    </div>
  );
}

export default Profile;
