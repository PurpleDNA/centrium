// import React from 'react'
import {
  Megaphone,
  User,
  Search,
  Home,
  // UsersRound,
} from "lucide-react";
import { NavLink } from "react-router";

function MobileNav() {
  return (
    <div className="w-full fixed bottom-0 bg-white flex md:hidden justify-between px-2 pt-1 border-t-2 border-t-slate-300 z-20">
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
        </NavLink>
      ))}
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
    url: "/profile",
    icon: User,
  },
];

export default MobileNav;
