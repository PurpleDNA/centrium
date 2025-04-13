import EditThread from "@/components/CreateThread/EditThread";
import PreviewThread from "@/components/CreateThread/PreviewThread";
import Publish from "@/components/CreateThread/Publish";
import MobilePublish from "@/components/CreateThread/MobilePublish";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { CreateThreadProvider } from "@/Contexts/createPostContext";
function CreateThread() {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [activePage, setActivePage] = useState("editing");
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const handleMobilePublish = useCallback(() => {
    if (isPublishOpen) {
      setIsPublishOpen(false);
    } else {
      setIsPublishOpen(true);
    }
  }, [isPublishOpen]);

  return (
    <div className="flex w-full">
      <CreateThreadProvider>
        <div className="lg:w-3/4 w-full">
          <div className="w-full pt-10 border-b-2 border-slate-300 sticky top-0 bg-white z-10">
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
        {isPublishOpen && (
          <MobilePublish setIsPublishOpen={() => handleMobilePublish()} />
        )}
      </CreateThreadProvider>
    </div>
  );
}

export default CreateThread;
