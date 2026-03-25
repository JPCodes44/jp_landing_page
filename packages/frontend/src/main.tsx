import { StrictMode } from "react";
import "./fonts.css";
import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { About } from "./components/About";
import Frame4 from "./components/Frame4";
import Frame6 from "./components/Frame6";
import { Experiences } from "./components/Services";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "services", element: <Frame4 /> },
      { path: "contact", element: <Frame6 /> },
      { path: "experiences", element: <Experiences /> },
      { path: "about", element: <About /> },
    ],
  },
]);

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
