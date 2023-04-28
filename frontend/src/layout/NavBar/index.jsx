import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NavPagesMenu from "../../components/NavPagesMenu";
import NavUserMenu from "../../components/NavUserMenu";

import { selectUserIsLoggedIn } from "../../features/user/userSlice";

import { AppBar, Toolbar, Box, Link } from "@mui/material";
import theme from "../../styles/theme";

const navLinkStyle = {
    color: "white",
    fontWeight: "700",
};

const NavBar = () => {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);

    return (
        <AppBar position="static" sx={{ bgcolor: theme.palette.primary }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <NavPagesMenu />
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        gap: "1rem",
                    }}>
                    <Link
                        component={NavLink}
                        variant="button"
                        underline="none"
                        to="/"
                        sx={navLinkStyle}>
                        Accueil
                    </Link>
                    {!isLoggedIn && (
                        <>
                            <Link
                                component={NavLink}
                                variant="button"
                                underline="none"
                                to="/login"
                                sx={navLinkStyle}>
                                Se connecter
                            </Link>
                            <Link
                                component={NavLink}
                                variant="button"
                                underline="none"
                                to="/register"
                                sx={navLinkStyle}>
                                Créer un compte
                            </Link>
                        </>
                    )}
                </Box>
                {isLoggedIn && <NavUserMenu />}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
