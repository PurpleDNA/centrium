// import React from 'react'
import Bookmarks from "@/components/Home/YourFeed";
import Guides from "@/components/Home/Guides";
import Drafts from "@/components/Profile/Drafts";
import Threads from "@/components/Profile/ProfileThreads";
import ProfileCard from "../components/Profile/ProfileCard";
import { useCallback, useEffect, useState } from "react";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";

function Profile() {
  const [activePage, setActivePage] = useState("threads");
  const { getProfile } = useCentriumHooks();
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const { profileAddy } = useParams<{ profileAddy: `0x${string}` }>();
  const profile = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userProfile
  );
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  console.log(isEditOpen);
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const fetchData = useCallback(async () => {
    const mandemaProfile = await getProfile(profileAddy!);
    if (mandemaProfile) {
      setUsername(mandemaProfile.username);
      setFollowers(mandemaProfile.followers);
      setFollowing(mandemaProfile.following);
    }
    if (profile.followingList) {
      const followingList = profile.followingList as `0x${string}`[];
      if (followingList.includes(profileAddy!)) {
        setIsFollowing(true);
      } else setIsFollowing(false);
    }
  }, [getProfile, profile.followingList, profileAddy]);
  useEffect(() => {
    if (profile.walletAddress !== profileAddy) {
      fetchData();
    } else {
      setUsername(profile.username);
      setFollowers(profile.followers);
      setFollowing(profile.following);
    }
  }, [
    fetchData,
    profile.followers,
    profile.following,
    profile.username,
    profile.walletAddress,
    profileAddy,
  ]);

  const handleEdit = useCallback(() => {
    if (isEditOpen) {
      setIsEditOpen(false);
    } else {
      setIsEditOpen(true);
    }
  }, [isEditOpen]);
  return (
    <div className="flex w-full flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-5">
        <div className="w-full pt-4 md:pt-10 border-b-2 border-slate-300 sticky top-8 md:top-0 bg-white">
          <div
            className={`flex ${
              profile.walletAddress === profileAddy
                ? "justify-between"
                : "justify-around"
            } mx-auto font-sofia w-full font-semibold px-4 md:px-10`}
          >
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
            {profile.walletAddress === profileAddy && (
              <span
                onClick={() => handleNavigation("saved")}
                className={`cursor-pointer ${
                  activePage === "saved" ? "border-b-2 border-[#3800A7]" : ""
                }`}
              >
                Saved
              </span>
            )}
            {profile.walletAddress === profileAddy && (
              <span
                onClick={() => handleNavigation("drafts")}
                className={`cursor-pointer ${
                  activePage === "drafts" ? "border-b-2 border-[#3800A7]" : ""
                }`}
              >
                Drafts
              </span>
            )}
          </div>
        </div>
        <div className="">
          {activePage === "threads" && <Threads profileAddy={profileAddy!} />}
          {activePage === "guides" && <Guides />}
          {activePage === "saved" && profile.walletAddress === profileAddy && (
            <Bookmarks />
          )}
          {activePage === "drafts" && profile.walletAddress === profileAddy && (
            <Drafts />
          )}
        </div>
      </div>
      <div className={` w-full lg:w-1/3`}>
        <ProfileCard
          profileAddy={profileAddy!}
          username={username}
          followers={followers}
          following={following}
          isFollowing={isFollowing}
          setIsEditOpen={() => handleEdit()}
        />
      </div>
      {isEditOpen && <EditProfileModal setIsEditOpen={() => handleEdit()} />}
    </div>
  );
}

export default Profile;
