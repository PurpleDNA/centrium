import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Static/Sidebar";
// import Connect from "./components/Static/Connect";
// import { ContextProvider } from "./Contexts/Context";
import CreatePostModal from "./components/modals/CreatePostModal";
import { Context } from "./Contexts/Context";
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
          <Outlet />
        </div>
      </div>
      <CreatePostModal />
    </div>
  );
}

export default App;
