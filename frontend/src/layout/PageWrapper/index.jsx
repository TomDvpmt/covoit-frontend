import { Outlet, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserData, logOut } from "../../features/user/userSlice";
import { selectPageLocation } from "../../features/page/pageSlice";

import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../PageHeading";
import Footer from "../../layout/Footer";

import { Box } from "@mui/material";
import { useEffect } from "react";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const page = useSelector(selectPageLocation);
    const user = useLoaderData();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            dispatch(logOut());
            return;
        }
        dispatch(
            setUserData({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            })
        );
    }, [dispatch, token, user]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}>
            <Header />
            <NavBar />
            <Box component="main" sx={{ flexGrow: "1" }}>
                <PageHeading />
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

export default PageWrapper;
