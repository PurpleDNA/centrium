import React, { createContext, useState, ReactNode, FC, useMemo } from "react";
interface ContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPublishOpen: boolean;
  setIsPublishOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPublishGuideOpen: boolean;
  setIsPublishGuideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  steps: [number, string][];
  setSteps: React.Dispatch<React.SetStateAction<[number, string][]>>;
  guideTitle: string;
  setGuideTitle: React.Dispatch<React.SetStateAction<string>>;
  guideDesc: string;
  setGuideDesc: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isPublishOpen, setIsPublishOpen] = useState<boolean>(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState<boolean>(false);
  const [guideTitle, setGuideTitle] = useState("");
  const [steps, setSteps] = useState<[number, string][]>([[1, ""]]);
  const [guideDesc, setGuideDesc] = useState("");

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      isNavOpen,
      setIsNavOpen,
      isPublishOpen,
      setIsPublishOpen,
      isPublishGuideOpen,
      setIsPublishGuideOpen,
      steps,
      setSteps,
      guideDesc,
      setGuideDesc,
      guideTitle,
      setGuideTitle,
    }),
    [
      guideDesc,
      guideTitle,
      isModalOpen,
      isNavOpen,
      isPublishGuideOpen,
      isPublishOpen,
      steps,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
