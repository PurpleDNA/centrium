// import React from 'react'
import TextareaAutosize from "react-textarea-autosize";
import { X, Image, Film } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/Contexts/createGuideContext";
import { useTheme } from "../../AppServices/utils/ThemeProvider";
import { toast } from "react-toastify";

export interface MediaPreview {
  id: string;
  url: string;
  file: File;
  type: string;
  duration?: number | null;
}

interface Props {
  editorIndex: number;
}

const Editor2 = ({ editorIndex }: Props) => {
  const { theme } = useTheme();
  const quillref = useRef(null);
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };

  const { steps, setSteps } = useSafeContext();
  const [localSteps, setLocalSteps] = useState(steps);
  const [media, setMedia] = useState<MediaPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSteps = (value: string) => {
    setLocalSteps((prev) =>
      prev.map((step, i) => {
        if (i === editorIndex) {
          return [steps?.[editorIndex]?.[0], value, media];
        } else {
          return step;
        }
      })
    );
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isVideoFile = (file: File): boolean => {
    return file.type.startsWith("video/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // Process each file to create image previews
    let newMedia = files.map((file) => ({
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      file,
      type: isVideoFile(file) ? "video" : "image",
      duration: null, // Will be set for videos after they're loaded
    }));

    setMedia((prev) => {
      if (prev.length + newMedia.length > 4) {
        toast.error("You can only upload 4 images at a time.");
        newMedia = [];
        return prev;
      } else {
        return [...prev, ...newMedia];
      }
    });
    setLocalSteps((prev) =>
      prev.map((step, i) => {
        if (i === editorIndex) {
          return [step[0], step[1], [...media, ...newMedia]];
        } else {
          return step;
        }
      })
    );
  };
  const removeImage = (id: string) => {
    setMedia((prev) => {
      // Clean up object URLs to prevent memory leaks
      const mediaToRemove = prev.find((media) => media.id === id);
      if (mediaToRemove) {
        URL.revokeObjectURL(mediaToRemove.url);
      }
      const filtered = prev.filter((media) => media.id !== id);
      return filtered;
    });
    setLocalSteps((prev) =>
      prev.map((step, i) => {
        if (i === editorIndex) {
          return [step[0], step[1], media.filter((media) => media.id !== id)];
        } else {
          return step;
        }
      })
    );
  };

  useEffect(() => {
    const send = setTimeout(() => {
      console.log("sending");
      setSteps(localSteps);
    }, 600);
    return () => clearTimeout(send);
  }, [localSteps, setSteps]);

  return (
    <div>
      <TextareaAutosize
        ref={quillref}
        value={localSteps?.[editorIndex]?.[1]}
        onChange={(e) => handleSteps(e.target.value)}
        minRows={2}
        maxRows={10}
        placeholder="Write your text here..."
        style={{
          width: "100%",
          paddingBottom: "1rem",
          borderBottom: "1px solid #ccc",
          fontSize: "16px",
          resize: "none",
          outline: "none",
          backgroundColor:
            theme === "light"
              ? "rgb(248 250 252 / var(--tw-bg-opacity, 1))"
              : "#060610",
        }}
      />
      {localSteps[editorIndex][2].length > 0 && (
        <div className="image-preview-container mt-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {localSteps[editorIndex][2].map((media) => (
              <div key={media.id} className="relative group">
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="relative w-full h-32">
                    <video
                      src={media.url}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black bg-opacity-20 rounded-full p-2">
                        {media.duration}
                      </div>
                    </div>
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                      <Film size={12} className="inline mr-1" />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => removeImage(media.id)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1
                             text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex justify-between items-center mt-2">
        <Image
          className="cursor-pointer"
          size={16}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default Editor2;
