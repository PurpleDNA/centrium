// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import React from "react";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    errorElement: <div>404 Not Found</div>,
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
        path: "post",
        element: <ViewThread />,
      },
      {
        path: "guide",
        element: <ViewGuide />,
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
        <RouterProvider router={router} />
      </AuthProvider>
    </Web3Provider>
  </React.StrictMode>
);
