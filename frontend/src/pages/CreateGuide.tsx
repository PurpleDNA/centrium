// import React from 'react'

import EditGuide from "@/components/CreateGuide/EditGuide";
import PreviewGuide from "@/components/CreateGuide/PreviewGuide";
import PublishGuide from "@/components/CreateGuide/PublishGuide";
import MobileGuidePublish from "@/components/CreateGuide/MobileGuidePublish";
import { useState } from "react";
import { CreateGuideProvider } from "@/Contexts/createGuideContext";
import { Button } from "@/components/ui/button";

function CreateGuide() {
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);

  const [activePage, setActivePage] = useState("editing");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  return (
    <CreateGuideProvider>
      <div className="flex w-full">
        <div className="lg:w-3/4 w-full">
          <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white z-10">
            <div className="flex gap-20 mx-auto font-sofia w-max font-semibold">
              <span
                onClick={() => handleNavigation("editing")}
                className={`cursor-pointer ${
                  activePage === "editing" ? "border-b-2 border-[#3800A7]" : ""
                }`}
              >
                Editing
              </span>
              <span
                onClick={() => handleNavigation("preview")}
                className={`cursor-pointer ${
                  activePage === "preview" ? "border-b-2 border-[#3800A7]" : ""
                }`}
              >
                Preview
              </span>
              <Button
                onClick={() => setIsPublishGuideOpen(true)}
                className="w-max lg:hidden bg-[#3800A7] hover:bg-[#1e0846] mb-1"
              >
                Finish
              </Button>
            </div>
          </div>
          <div className="flex overflow-hidden ">
            {activePage === "editing" && <EditGuide />}
            {activePage === "preview" && <PreviewGuide />}
          </div>
        </div>
        <div className="w-1/3 hidden lg:block">
          <PublishGuide />
        </div>
        {isPublishGuideOpen && <MobileGuidePublish />}
      </div>
    </CreateGuideProvider>
  );
}

export default CreateGuide;
