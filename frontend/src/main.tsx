// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import React from "react";
import store from "./Redux/Store/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import CreateThread from "./pages/CreateThread.tsx";
import CreateGuide from "./pages/CreateGuide.tsx";
import ViewThread from "./pages/ViewThread.tsx";
import ViewGuide from "./pages/ViewGuide.tsx";
import AuthProvider from "./Auth/AuthContext.tsx";
import WalletConnect from "./Auth/WalletConnect.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import { Web3Provider } from "./Auth/Web3Provider.tsx";
import { ContextProvider } from "./Contexts/Context.tsx";
import Notifications from "./pages/Notifications.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./components/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "create-thread",
        element: <CreateThread />,
      },
      {
        path: "create-guide",
        element: <CreateGuide />,
      },
      {
        path: "post/:thread_id",
        element: <ViewThread />,
      },
      {
        path: "guide",
        element: <ViewGuide />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "profile/:profileAddy",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/walletconnect",
    element: <WalletConnect />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <AuthProvider>
        <ContextProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ContextProvider>
      </AuthProvider>
    </Web3Provider>
  </React.StrictMode>
);
