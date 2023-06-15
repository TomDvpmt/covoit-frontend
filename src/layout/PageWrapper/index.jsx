import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserData, logOut } from "../../features/user/userSlice";
import {
    selectGlobalErrorMessage,
    setGlobalErrorMessage,
} from "../../features/error/errorSlice";
import { setAllCities } from "../../features/cities/citiesSlice";

import { getOneUser } from "../../utils/user";

import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../PageHeading";
import Footer from "../../layout/Footer";
import ErrorMessage from "../../components/ErrorMessage"; // to be replaced with ErrorBoundary
import Loader from "../../components/Loader";

import theme from "../../styles/theme";
import { Box } from "@mui/material";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const dispatch = useDispatch();
    const globalErrorMessage = useSelector(selectGlobalErrorMessage);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (!userId || !token) {
            dispatch(logOut());
            return;
        }
        getOneUser(userId)
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
            })
            .finally(() => setIsLoading(false));
    }, [dispatch, token]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://geo.api.gouv.fr/communes`)
            .then((response) => response.json())
            .then((data) => {
                const sortedByPopulation = data.sort(
                    (a, b) => b.population - a.population
                );
                const names = sortedByPopulation.map((city) => city.nom);
                dispatch(setAllCities(names));
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
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
            )}
        </>
    );
};

export default PageWrapper;
