// import React from "react";
import ProfPic from "../../assets/profpic.svg";
import Landing from "../../assets/Landing.png";
import { ConnectKitButton } from "connectkit";

function MobileConnect() {
  return (
    <div className="w-full fixed top-0 bg-white flex md:hidden justify-between px-4 mb-5 z-50">
      <img src={ProfPic} alt="" className="w-8" />
      <ConnectKitButton.Custom>
        {({ show }) => {
          return (
            <div onClick={show} className="w-max cursor-pointer px-1">
              <img src={Landing} alt="" className="w-8 h-8 rounded-full" />
            </div>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}

export default MobileConnect;
