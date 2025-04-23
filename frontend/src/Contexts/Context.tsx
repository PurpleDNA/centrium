import React, { createContext, useState, ReactNode, FC, useMemo } from "react";
interface ContextType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      isNavOpen,
      setIsNavOpen,
    }),
    [isModalOpen, isNavOpen]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
