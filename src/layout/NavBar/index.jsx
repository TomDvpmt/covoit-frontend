import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NavPagesMenu from "../../components/NavPagesMenu";
import NavUserMenu from "../../components/NavUserMenu";

import {
    selectUserFirstName,
    selectUserIsLoggedIn,
} from "../../features/user/userSlice";
import { selectPageLocation } from "../../features/page/pageSlice";

import { AppBar, Toolbar, Box, Link, Typography } from "@mui/material";
import theme from "../../styles/theme";

const navLinkStyle = {
    color: "white",
    fontWeight: "700",
};

const NavBar = () => {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const firstName = useSelector(selectUserFirstName);
    const page = useSelector(selectPageLocation);

    return (
        <AppBar
            component="nav"
            position="static"
            sx={{
                bgcolor: theme.palette.primary,
                alignItems: "center",
            }}>
            <Toolbar
                sx={{
                    width: "100%",
                    maxWidth: theme.maxWidth.nav,
                    justifyContent:
                        isLoggedIn && page === "home"
                            ? "flex-end"
                            : "space-between",
                }}>
                {isLoggedIn && page === "home" ? null : <NavPagesMenu />}
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        gap: "2rem",
                    }}>
                    {page !== "home" && (
                        <Link
                            component={NavLink}
                            variant="button"
                            underline="none"
                            to="/"
                            sx={navLinkStyle}>
                            Trouver un trajet
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <>
                            {page !== "login" && (
                                <Link
                                    component={NavLink}
                                    variant="button"
                                    underline="none"
                                    to="/login"
                                    sx={navLinkStyle}>
                                    Se connecter
                                </Link>
                            )}
                            {page !== "register" && (
                                <Link
                                    component={NavLink}
                                    variant="button"
                                    underline="none"
                                    to="/register"
                                    sx={navLinkStyle}>
                                    Créer un compte
                                </Link>
                            )}
                        </>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                    }}>
                    {isLoggedIn && (
                        <Typography
                            sx={{
                                maxWidth: {
                                    xs: "150px",
                                    sm: "300px",
                                    md: "initial",
                                },
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                            }}>
                            {firstName}
                        </Typography>
                    )}
                    {isLoggedIn && <NavUserMenu />}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
