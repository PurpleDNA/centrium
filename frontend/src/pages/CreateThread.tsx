import EditThread from "@/components/CreateThread/EditThread";
import PreviewThread from "@/components/CreateThread/PreviewThread";
import Publish from "@/components/CreateThread/Publish";
import { useState } from "react";
function CreateThread() {
  const [activePage, setActivePage] = useState("editing");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  return (
    <div className="flex w-full">
      <div className="lg:w-3/4 w-full">
        <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white">
          <div className="flex gap-16 mx-auto font-sofia w-max font-semibold">
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
          </div>
        </div>
        <div className="flex overflow-hidden">
          {activePage === "editing" && <EditThread />}
          {activePage === "preview" && <PreviewThread />}
        </div>
      </div>
      <div className="w-1/3 hidden lg:block">
        <Publish />
      </div>
    </div>
  );
}

export default CreateThread;
