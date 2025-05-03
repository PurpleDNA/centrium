import profpic from "../../assets/rizzking.svg";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { Step } from "@/Contexts/createGuideContext";
import video from "@/assets/Video.png";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface contentProps {
  author: string;
  addr: "" | `0x${string}`;
  content: Step[];
  guideDesc: string;
  date: number;
  tags: string[];
}

function GuideContent({
  author,
  addr,
  content,
  guideDesc,
  date,
  tags,
}: contentProps) {
  // console.log("guideContent");
  const navigate = useNavigate();
  const { formatDate, truncateAddress } = useCentriumHooks();
  const [enlargedView, setEnlargedView] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editorIndex, setEditorIndex] = useState(0);

  const openEnlargedView = (id: string, editorIndex: number) => {
    const index = content[editorIndex][2].findIndex((media) => media.id === id);
    console.log(index);
    setCurrentIndex(index);
    setEnlargedView(true);
  };

  const closeEnlargedView = () => {
    setEnlargedView(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % content[editorIndex][2].length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + content[editorIndex][2].length) %
        content[editorIndex][2].length
    );
  };

  return (
    <div className="w-full flex flex-col gap-7 pb-3 border-b border-slate-300">
      <div>
        <h1 className="font-semibold text-2xl pt-1 md:text-4xl md:mb-4 px-3 break-words">
          {"Title Placeholder till Marv Delivers"}
        </h1>
        <p
          className="px-3"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          {guideDesc}
        </p>
      </div>
      <div className="flex gap-3 px-3 items-center pb-4 border-b-2 border-slate-300">
        <div>
          <img src={profpic} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="flex gap-3 items-center">
            <span className="font-sofia pr-4 border-r-2 border-slate-400 font-semibold">
              {author}
            </span>
            <span className="py-1 px-3 bg-slate-300 rounded-xl text-sm font-sofia dark:bg-slate-900">
              {addr ? truncateAddress(addr) : ""}
            </span>
          </div>
          <div className="flex gap-1 text-sm items-center font-sofia">
            <span>{date === 0 ? "" : formatDate(date)}</span>
          </div>
        </div>
      </div>
      <div>
        {content.map((safestep, index) => (
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
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                  className="w-full"
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
        {enlargedView && content[editorIndex][2].length > 0 && (
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
              {content[editorIndex][2].length > 1 && (
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
                {content[editorIndex][2][currentIndex].type === "image" ? (
                  <img
                    src={content[editorIndex][2][currentIndex].url}
                    alt="Enlarged view"
                    className="max-h-screen max-w-full object-contain"
                  />
                ) : (
                  <video
                    src={content[editorIndex][2][currentIndex].url}
                    className="max-h-screen max-w-full"
                    controls
                    autoPlay
                  />
                )}
              </div>

              {/* Media count indicator */}
              {content[editorIndex][2].length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {currentIndex + 1} / {content[editorIndex][2].length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="tags flex gap-1 md:gap-3 px-5">
        {tags.map((tag: string) => (
          <span
            onClick={() => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
            className="rounded-md font-sofia text-xs bg-[#ECECEC] p-1 inline w-auto text-black dark:bg-slate-900 dark:text-white dark:hover:bg-darkk cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GuideContent;
