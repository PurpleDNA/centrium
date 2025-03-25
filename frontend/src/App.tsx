import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Static/Sidebar";
// import Connect from "./components/Static/Connect";
// import { ContextProvider } from "./Contexts/Context";
import CreatePostModal from "./components/modals/CreatePostModal";
import { Context } from "./Contexts/Context";
import MobileNav from "./components/Static/MobileNav";
import MobileConnect from "./components/Static/MobileConnect";
function App() {
  // const ModalOpen = useModal()
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { isNavOpen } = useSafeContext();
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
      <CreatePostModal />
      <MobileNav />
    </div>
  );
}

export default App;
