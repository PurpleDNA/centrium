import { useNavigate } from "react-router-dom";
// import { useAuth } from "./Auth/AuthContext";
import { FC, ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";

interface Props {
  children: ReactNode;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { isConnected } = useAccount();
  //   const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isConnected) {
      navigate("/walletconnect", { replace: true });
    }
  }, [navigate, isConnected]);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
