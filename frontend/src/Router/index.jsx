import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Trip from "../pages/Trip";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/trip",
        element: <Trip />,
    },
    {
        path: "*",
        element: <Error404 />,
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
