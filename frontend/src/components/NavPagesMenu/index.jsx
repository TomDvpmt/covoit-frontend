import { useState } from "react";
import { Link as NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserIsLoggedIn } from "../../features/user/userSlice";

import { Link, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const NavPagesMenu = () => {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };

    return (
        <>
            <MenuIcon
                onClick={handleOpen}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                }}
            />
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem>
                    <Link
                        component={NavLink}
                        variant="button"
                        underline="none"
                        to="/"
                        onClick={handleClose}>
                        Accueil
                    </Link>
                </MenuItem>
                {!isLoggedIn && (
                    <MenuItem>
                        <Link
                            component={NavLink}
                            variant="button"
                            underline="none"
                            to="/login"
                            onClick={handleClose}>
                            Se connecter
                        </Link>
                    </MenuItem>
                )}
                {!isLoggedIn && (
                    <MenuItem>
                        <Link
                            component={NavLink}
                            variant="button"
                            underline="none"
                            to="/register"
                            onClick={handleClose}>
                            Créer un compte
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default NavPagesMenu;
