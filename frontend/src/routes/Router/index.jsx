import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PageWrapper from "../../layout/PageWrapper";
import SetPage from "../../layout/SetPage";
import ErrorBoundary from "../../components/ErrorBoundary";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import Trip from "../../pages/Trip";
import Error404 from "../../pages/Error404";

import { getOneUser } from "../../utils/requests";

const Router = () => {
    const router = createBrowserRouter([
        {
            element: <PageWrapper />,
            loader: async () => getOneUser(0),
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "/",
                    element: (
                        <>
                            <SetPage page="home" />
                            <Home />
                        </>
                    ),
                },
                {
                    path: "/login",
                    element: (
                        <>
                            <SetPage page="login" />
                            <Login />
                        </>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <>
                            <SetPage page="register" />
                            <Register />
                        </>
                    ),
                },
                {
                    path: "/profile/",
                    element: (
                        <>
                            <SetPage page="profile" />
                            <Profile />
                        </>
                    ),
                },
                {
                    path: "/trip",
                    element: (
                        <>
                            <SetPage page="trip" />
                            <Trip />
                        </>
                    ),
                },
                {
                    path: "*",
                    element: (
                        <>
                            <SetPage page="error404" />
                            <Error404 />
                        </>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;