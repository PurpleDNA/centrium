/* eslint-disable react-refresh/only-export-components */
import { createContext, FC, ReactNode, useContext, useState } from "react";

//create Authentication Context
const authContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

//create Authentication Context Provider
interface ContextProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authValue: {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  } = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;
