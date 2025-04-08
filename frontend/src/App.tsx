import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Static/Sidebar";
// import Connect from "./components/Static/Connect";
// import { ContextProvider } from "./Contexts/Context";
import CreatePostModal from "./components/modals/CreatePostModal";
import { Context } from "./Contexts/Context";
import MobileNav from "./components/Static/MobileNav";
import MobileConnect from "./components/Static/MobileConnect";
import CreateProfileModal from "@/components/modals/CreateProfileModal";
import { useSelector } from "react-redux";
import { useCentriumHooks } from "./AppServices/CentriumHooks";
import { useAccount } from "wagmi";
import FallbackLoading from "@/components/FallbackLoading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const ModalOpen = useModal()
  window.onload = function () {
    sessionStorage.removeItem("userSession");
  };
  const [accountModal, setAccountModal] = useState(false);
  const { getProfile, isLoading, setIsLoading } = useCentriumHooks();
  const { address } = useAccount();
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isNavOpen, isModalOpen } = useSafeContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAccount = useSelector((state: any) => state.userProfile.isAccount);
  console.log(isAccount);

  const userSession = sessionStorage.getItem("userSession");

  useEffect(() => {
    if (!userSession) {
      setIsLoading(true);
      if (address) {
        getProfile(address);
        if (isAccount === false) {
          setAccountModal(true);
        } else {
          setAccountModal(false);
        }
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isAccount]);
  return (
    <div>
      <div className="flex w-full">
        <Sidebar />
        <div
          className={`${
            isNavOpen ? "w-[80%]" : "w-full"
          } h-screen overflow-y-scroll`}
        >
          <MobileConnect />
          <div className="mt-8 md:mt-0 mb-8 md:mb-0">
            <Outlet />
          </div>
        </div>
      </div>
      {isLoading && <FallbackLoading />}
      {isModalOpen && <CreatePostModal />}
      {accountModal && <CreateProfileModal />}
      <MobileNav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
