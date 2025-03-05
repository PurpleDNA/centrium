import React, { createContext, useState, ReactNode, FC } from "react";
interface ContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
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
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [guideTitle, setGuideTitle] = useState("");
  const [steps, setSteps] = useState<[number, string][]>([[1, ""]]);
  const [guideDesc, setGuideDesc] = useState("");

  const contextValue: ContextType = {
    isModalOpen,
    setIsModalOpen,
    isNavOpen,
    setIsNavOpen,
    post,
    setPost,
    title,
    setTitle,
    steps,
    setSteps,
    guideDesc,
    setGuideDesc,
    guideTitle,
    setGuideTitle,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
