// import React from 'react'
import Following from "@/components/Home/Following";
import Guides from "@/components/Home/Guides";
import Threads from "@/components/Home/Threads";
import ProfileCard from "../components/Profile/ProfileCard";
import { useContext, useState } from "react";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { Context } from "../Contexts/Context";

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
      <div className="w-2/3 flex flex-col gap-5">
        <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white">
          <div className="flex justify-between mx-auto font-sofia w-ful font-semibold px-10">
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
                activePage === "following" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Saved
            </span>
            <span
              onClick={() => handleNavigation("drafts")}
              className={`cursor-pointer ${
                activePage === "following" ? "border-b-2 border-[#3800A7]" : ""
              }`}
            >
              Drafts
            </span>
          </div>
        </div>
        <div className="">
          {activePage === "saved" && <Following />}
          {activePage === "threads" && <Threads />}
          {activePage === "guides" && <Guides />}
          {activePage === "drafts" && <Guides />}
        </div>
      </div>
      <div className={`w-1/3`}>
        <ProfileCard />
      </div>
      {isEditProfileOpen ? <EditProfileModal /> : null}
    </div>
  );
}

export default Profile;
