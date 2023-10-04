import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NavPagesMenu from "../../components/NavPagesMenu";
import NavUserMenu from "../../components/NavUserMenu";

import {
    selectUserFirstName,
    selectUserIsLoggedIn,
} from "../../features/user/userSlice";
import { selectPageLocation } from "../../features/page/pageSlice";

import { AppBar, Toolbar, Box, Link, Typography, Button } from "@mui/material";
import { Login, PersonAddAlt1, Search } from "@mui/icons-material";
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
                        <Button
                            component={NavLink}
                            startIcon={<Search />}
                            to="/"
                            sx={navLinkStyle}>
                            Trouver un trajet
                        </Button>
                    )}
                    {!isLoggedIn && (
                        <>
                            {page !== "login" && (
                                <Button
                                    component={NavLink}
                                    startIcon={<Login />}
                                    to="/login"
                                    sx={navLinkStyle}>
                                    Se connecter
                                </Button>
                            )}
                            {page !== "register" && (
                                <Button
                                    component={NavLink}
                                    startIcon={<PersonAddAlt1 />}
                                    to="/register"
                                    sx={navLinkStyle}>
                                    Créer un compte
                                </Button>
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
