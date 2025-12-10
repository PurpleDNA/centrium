import React, { createContext, useState, ReactNode, FC, useMemo } from "react";
import { MediaPreview } from "@/components/Editor/Editor2";
export type Step = [number, string, MediaPreview[]];
interface ContextType {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
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

export const CreateGuideProvider: FC<ContextProviderProps> = ({ children }) => {
  const [guideTitle, setGuideTitle] = useState("");
  const [steps, setSteps] = useState<Step[]>([[1, "", []]]);
  const [guideDesc, setGuideDesc] = useState("");
  const contextValue = useMemo(
    () => ({
      steps,
      setSteps,
      guideDesc,
      setGuideDesc,
      guideTitle,
      setGuideTitle,
    }),
    [guideDesc, guideTitle, steps]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
