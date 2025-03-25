/* eslint-disable react-refresh/only-export-components */
import { createContext, FC, ReactNode, useContext, useState } from "react";

//create Authentication Context
interface contextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
const authContext = createContext<contextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

//create Authentication Context Provider
interface ContextProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<ContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;
