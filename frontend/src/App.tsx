// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Static/Sidebar";
// import Connect from "./components/Static/Connect";
import { ContextProvider } from "./Contexts/Context";
import CreatePostModal from "./components/modals/CreatePostModal";
function App() {
  // const ModalOpen = useModal()
  return (
    <ContextProvider>
        <div className="flex w-full">
          <Sidebar />
          <Outlet />
        </div>
        <CreatePostModal />
    </ContextProvider>
  );
}

export default App;
