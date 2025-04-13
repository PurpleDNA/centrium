import React, { createContext, useState, ReactNode, FC, useMemo } from "react";
interface ContextType {
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const CreateThreadProvider: FC<ContextProviderProps> = ({
  children,
}) => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");

  const contextValue = useMemo(
    () => ({
      post,
      setPost,
      title,
      setTitle,
    }),
    [post, title]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
