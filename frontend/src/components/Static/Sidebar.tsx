import {
  Menu,
  Megaphone,
  User,
  Search,
  Home,
  PenLine,
  UsersRound,
} from "lucide-react";
import profpic from "../../assets/profpic.svg";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import jamMenu from "../../assets/jam_menu.svg";
import { NavLink } from "react-router-dom";
import { Context } from "@/Contexts/Context";
import { ConnectKitButton } from "connectkit";

function Sidebar() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { setIsModalOpen } = useSafeContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleModal = () => setIsModalOpen((prev: any) => !prev);
  const [isOpen, setIsOpen] = useState(true);
  const handleBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={` hidden md:flex flex-col gap-8 h-screen top-0 sticky left-0 pt-2 w-max border-r-2 border-r-slate-300 px-5 ${
        isOpen ? "" : "items-center"
      }`}
    >
      <div
        className={`flex justify-between items-center h-14 ${
          isOpen ? "w-56" : "w-max"
        } `}
      >
        <div
          className={`w-[52px] h-[52px] rounded-full ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <img src={profpic} alt="profile picture" />
        </div>
        {isOpen ? (
          <img
            src={jamMenu}
            onClick={() => handleBar()}
            className="w-8 cursor-pointer"
          />
        ) : (
          <Menu
            color="#3800A7"
            className="cursor-pointer"
            onClick={() => handleBar()}
          />
        )}
      </div>
      <div></div>
      <div className="flex flex-col justify-between gap-4">
        {items.map((item) => (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }: { isActive: boolean }) => {
              return isActive
                ? "font-semibold bg-slate-200 rounded-full flex gap-3 cursor-pointer hover:font-semibold hover:bg-slate-200 hover:rounded-full w-max py-2 px-3"
                : "flex gap-3 cursor-pointer hover:font-semibold hover:bg-slate-200 hover:rounded-full w-max py-2 px-3";
            }}
          >
            <item.icon />
            <span className={`text-lg ${isOpen ? "block" : "hidden"} `}>
              {item.title}
            </span>
          </NavLink>
        ))}
        <ConnectKitButton />
      </div>
      <div>
        <Button
          onClick={toggleModal}
          className={`bg-[#3800A7] mt-12 hover:bg-[#1e0846] py-6 ${
            isOpen ? "w-44" : "w-max"
          }`}
        >
          {" "}
          <PenLine className="mr-4" />
          {isOpen ? "Create Post" : ""}
        </Button>
      </div>
    </div>
  );
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Community",
    url: "/community",
    icon: UsersRound,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Megaphone,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export default Sidebar;
