import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PageWrapper from "../../layout/PageWrapper";
import SetPage from "../../layout/SetPage";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import MyRides from "../../pages/MyRides";
import Ride from "../../pages/Ride";
import Error404 from "../../pages/Error404";
import ErrorBoundary from "../../components/ErrorBoundary";

const Router = () => {
    const router = createBrowserRouter([
        {
            element: <PageWrapper />,
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
                    path: "/myrides/",
                    element: (
                        <>
                            <SetPage page="myrides" />
                            <MyRides />
                        </>
                    ),
                },
                {
                    path: "/trip",
                    element: (
                        <>
                            <SetPage page="trip" />
                            <Ride />
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
