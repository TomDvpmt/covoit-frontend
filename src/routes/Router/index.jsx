import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom";

import { getOneUser } from "../../utils/user";

import PageWrapper from "../../layout/PageWrapper";
import SetPage from "../../layout/SetPage";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import BookingRequests from "../../pages/BookingRequests";
import MyRides from "../../pages/MyRides";
import Conversations from "../../pages/Conversations";
import Conversation from "../../components/Conversation";
import Error404 from "../../pages/Error404";
import ErrorBoundary from "../../components/ErrorBoundary";

const Router = () => {
    const privateRouteLoader = () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return redirect("/login");
        }
        return null;
    };

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
                    path: "/users/:id",
                    element: (
                        <>
                            <SetPage page="profile" />
                            <Profile />
                        </>
                    ),
                    loader: async ({ params }) => {
                        const token = sessionStorage.getItem("token");
                        if (!token) {
                            return redirect("/login");
                        }
                        return await getOneUser(params.id);
                    },
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "/bookingrequests/",
                    element: (
                        <>
                            <SetPage page="bookingRequests" />
                            <BookingRequests />
                        </>
                    ),
                    loader: () => privateRouteLoader(),
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "/myrides/",
                    element: (
                        <>
                            <SetPage page="myrides" />
                            <MyRides />
                        </>
                    ),
                    loader: () => privateRouteLoader(),
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "/conversations/",
                    element: (
                        <>
                            <SetPage page="conversations" />
                            <Conversations />
                        </>
                    ),
                    loader: () => privateRouteLoader(),
                    errorElement: <ErrorBoundary />,
                },

                {
                    path: "/conversations/:conversationId",
                    element: (
                        <>
                            <SetPage page="conversation" />
                            <Conversation />
                        </>
                    ),
                    loader: () => privateRouteLoader(),
                    errorElement: <ErrorBoundary />,
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
