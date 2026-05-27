import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Single from "./pages/Single.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/single/:type/:uid", element: <Single /> },
    ],
  },
]);