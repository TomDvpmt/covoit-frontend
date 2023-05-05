import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserData, logOut } from "../../features/user/userSlice";
import {
    selectGlobalErrorMessage,
    setGlobalErrorMessage,
} from "../../features/error/errorSlice";

import { getOneUser } from "../../utils/user";

import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../PageHeading";
import Footer from "../../layout/Footer";
import ErrorMessage from "../../components/ErrorMessage"; // to be replaced with ErrorBoundary

import theme from "../../styles/theme";
import { Box } from "@mui/material";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const globalErrorMessage = useSelector(selectGlobalErrorMessage);

    useEffect(() => {
        if (!token) {
            dispatch(logOut());
            return;
        }
        getOneUser(0)
            .then((data) =>
                dispatch(
                    setUserData({
                        id: data._id,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                    })
                )
            )
            .catch((error) => {
                console.error(error);
                dispatch(setGlobalErrorMessage(error.message));
            });
    }, [dispatch, token]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}>
            <Header />
            <NavBar />
            {globalErrorMessage ? (
                <ErrorMessage errorMessage={globalErrorMessage} />
            ) : (
                <Box
                    component="main"
                    sx={{
                        alignSelf: "center",
                        flexGrow: "1",
                        width: "100%",
                        maxWidth: theme.maxWidth.main,
                        p: ".5rem .5rem 3rem",
                    }}>
                    <PageHeading />
                    <Outlet />
                </Box>
            )}

            <Footer />
        </Box>
    );
};

export default PageWrapper;
