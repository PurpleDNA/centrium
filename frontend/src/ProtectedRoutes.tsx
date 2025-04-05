import { useNavigate } from "react-router-dom";
import { FC, ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";

interface Props {
  children: ReactNode;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { status } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      // status !== "reconnecting" &&
      // status !== "connecting" &&
      status === "disconnected"
    ) {
      navigate("/walletconnect", { replace: true });
      sessionStorage.removeItem("userSession");
    }
  }, [navigate, status]);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
