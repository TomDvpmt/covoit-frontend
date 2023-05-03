import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUserData, logOut } from "../../features/user/userSlice";

import { getOneUser } from "../../utils/user";

import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../PageHeading";
import Footer from "../../layout/Footer";

import { Box } from "@mui/material";
import { useEffect } from "react";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();

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
            .catch((error) => console.error(error));
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
            <Box component="main" sx={{ flexGrow: "1", p: ".5rem" }}>
                <PageHeading />
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

export default PageWrapper;
