import {
  Menu,
  Megaphone,
  User,
  Search,
  Home,
  PenLine,
  // UsersRound,
} from "lucide-react";
import profpic from "../../assets/profpic.svg";
import { Button } from "../ui/button";
import { useContext } from "react";
import jamMenu from "../../assets/jam_menu.svg";
import { NavLink } from "react-router-dom";
import { Context } from "@/Contexts/Context";
import { ConnectKitButton } from "connectkit";
import Landing from "../../assets/Landing.png";
import { useSelector } from "react-redux";

function Sidebar() {
  const walletAddress = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.userProfile.walletAddress
  );
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
    // {
    //   title: "Community",
    //   url: "/community",
    //   icon: UsersRound,
    // },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Megaphone,
    },
    {
      title: "Profile",
      url: `/profile/${walletAddress}`,
      icon: User,
    },
  ];
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isNavOpen, setIsNavOpen, setIsModalOpen } = useSafeContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleModal = () => setIsModalOpen((prev: boolean) => !prev);
  const toggleNav = () => setIsNavOpen((prev: boolean) => !prev);
  // const [isNavOpen, setisNavOpen] = useState<boolean | null>(null);
  const handleBar = () => {
    toggleNav();
  };
  return (
    <div
      className={`bg-white hidden md:flex flex-col gap-8 h-screen top-0 sticky left-0 pt-2 border-r-2 border-r-slate-300 px-5 ${
        isNavOpen ? "" : "items-center"
      } transition-all duration-1000 overflow-hidden`}
      style={{ width: isNavOpen ? "20%" : "max-content" }}
    >
      <div
        className={`flex justify-between items-center h-14 ${
          isNavOpen ? "w-full" : "w-max"
        } `}
      >
        <div
          className={`w-[52px] h-[52px] rounded-full ${
            isNavOpen ? "block" : "hidden"
          }`}
        >
          <img src={profpic} alt="profile picture" />
        </div>
        {isNavOpen ? (
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
            <span className={`text-lg ${isNavOpen ? "block" : "hidden"} `}>
              {item.title}
            </span>
          </NavLink>
        ))}
        {isNavOpen ? (
          <ConnectKitButton />
        ) : (
          <ConnectKitButton.Custom>
            {({ show }) => {
              return (
                <div onClick={show} className="w-max cursor-pointer px-1">
                  <img
                    src={Landing}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              );
            }}
          </ConnectKitButton.Custom>
        )}
      </div>
      <div>
        <Button
          onClick={toggleModal}
          className={`bg-[#3800A7] mt-12 hover:bg-[#1e0846] py-6 ${
            isNavOpen ? "w-44" : "w-max"
          }`}
        >
          {" "}
          <PenLine className={`${isNavOpen ? "mr-4" : "mx-auto"}`} />
          {isNavOpen ? "Create Post" : ""}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
