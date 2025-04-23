import { useNavigate } from "react-router-dom";
import { FC, ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";

interface Props {
  children: ReactNode;
}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { status } = useAccount();
  console.log(status);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      status !== "reconnecting" &&
      status !== "connecting" &&
      status === "disconnected"
    ) {
      navigate("/walletconnect", { replace: true });
      sessionStorage.removeItem("userSession");
    }
  }, [navigate, status]);

  // useEffect(() => {
  //   if (status === "connecting") {
  //     setTimeout(() => {
  //       console.log("taking too long to connect, try again");
  //       navigate("/walletconnect", { replace: true });
  //       sessionStorage.removeItem("userSession");
  //     }, 7000);
  //   }
  // }, [navigate, status]);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
