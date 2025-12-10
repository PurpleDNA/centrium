// import React from 'react'
import { Context } from "@/Contexts/createGuideContext";
import { useContext, useState } from "react";
import DOMpurify from "dompurify";
import profpic from "../../assets/rizzking.svg";
import { ChevronLeft, ChevronRight, Dot, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "@/AppServices/CentriumHooks";
import video from "@/assets/Video.png";
import { Step } from "../../Contexts/createGuideContext";

function PreviewGuide() {
  const { truncateAddress, formatDate } = useCentriumHooks();
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { guideTitle, guideDesc, steps } = useSafeContext();
  const safesteps: Step[] = steps.map((step) => [
    step[0],
    DOMpurify.sanitize(step[1]),
    step[2],
  ]);
  const [enlargedView, setEnlargedView] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editorIndex, setEditorIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userProfile = useSelector((state: any) => state.userProfile);

  const openEnlargedView = (id: string, editorIndex: number) => {
    const index = safesteps[editorIndex][2].findIndex(
      (media) => media.id === id
    );
    console.log(index);
    setCurrentIndex(index);
    setEnlargedView(true);
  };

  const closeEnlargedView = () => {
    setEnlargedView(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % safesteps[editorIndex][2].length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + safesteps[editorIndex][2].length) %
        safesteps[editorIndex][2].length
    );
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <h1 className="font-semibold md:text-4xl text-2xl md:mb-4 px-3 break-words font-sofia">
        {guideTitle}
      </h1>
      <p className="px-3">{guideDesc}</p>
      <div className="flex gap-3 px-3 items-center pb-7 border-b-2 border-slate-300 dark:border-borderr">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400">
              {userProfile.username}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm dark:bg-slate-900">
              {truncateAddress(userProfile.walletAddress)}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>
              {" "}
              <span>{formatDate(Date.now() / 1000)}</span>
            </span>
            <Dot />
            {/* <span>            <span>{estTime(safesteps)} minute read</span></span> */}
          </div>
        </div>
      </div>
      <div>
        {safesteps.map((safestep, index) => (
          <div
            key={index}
            className="px-4 pt-1 pb-4 w-4/5 flex flex-col gap-3 mx-auto border border-[#3800A7] rounded-md mb-5"
          >
            <div className="flex gap-3 flex-col">
              <div className="flex gap-2 items-start py-2">
                <div className="w-max  rounded-sm px-1 bg-slate-300 text-sm font-sofia text-[#FA9631] mt-[0.375rem]">
                  {index + 1}
                </div>
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    padding: "20px",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                  className="w-full text-clip"
                  dangerouslySetInnerHTML={{ __html: safestep[1] }}
                />
              </div>
              {safestep[2] && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {safestep[2].map((media) => (
                    <div
                      key={media.id}
                      className="relative group"
                      onClick={() => {
                        setEditorIndex(index);
                        openEnlargedView(media.id, index);
                      }}
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                        />
                      ) : (
                        <div className="relative w-full h-32">
                          <video
                            src={media.url}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black bg-opacity-20 rounded-full p-2">
                              {media.duration}
                            </div>
                          </div>
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                            <img src={video} alt="" className="w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {enlargedView && safesteps[editorIndex][2].length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeEnlargedView}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              >
                <X size={24} />
              </button>

              {/* Navigation arrows */}
              {safesteps[editorIndex][2].length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Media content */}
              <div
                className="max-w-4xl max-h-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {safesteps[editorIndex][2][currentIndex].type === "image" ? (
                  <img
                    src={safesteps[editorIndex][2][currentIndex].url}
                    alt="Enlarged view"
                    className="max-h-screen max-w-full object-contain"
                  />
                ) : (
                  <video
                    src={safesteps[editorIndex][2][currentIndex].url}
                    className="max-h-screen max-w-full"
                    controls
                    autoPlay
                  />
                )}
              </div>

              {/* Media count indicator */}
              {safesteps[editorIndex][2].length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {currentIndex + 1} / {safesteps[editorIndex][2].length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewGuide;
