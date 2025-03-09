import EditThread from "@/components/CreateThread/EditThread";
import PreviewThread from "@/components/CreateThread/PreviewThread";
import Publish from "@/components/CreateThread/Publish";
import MobilePublish from "@/components/CreateThread/MobilePublish";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { Context } from "../Contexts/Context";
function CreateThread() {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isPublishOpen, setIsPublishOpen } = useSafeContext();

  const [activePage, setActivePage] = useState("editing");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };
  return (
    <div className="flex w-full">
      <div className="lg:w-3/4 w-full">
        <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white">
          <div className="flex gap-20 mx-auto font-sofia w-max font-semibold items-baseline">
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
              onClick={() => setIsPublishOpen(true)}
              className="w-max lg:hidden bg-[#3800A7] hover:bg-[#1e0846] mb-1"
            >
              Finish
            </Button>
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
      {isPublishOpen && <MobilePublish />}
    </div>
  );
}

export default CreateThread;
