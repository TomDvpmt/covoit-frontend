import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../features/user/userSlice";

import {
    Menu,
    MenuItem,
    ListItemIcon,
    IconButton,
    Avatar,
} from "@mui/material";
import { Settings, Logout, DirectionsCar } from "@mui/icons-material";

const MenuUser = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMyRides = () => {
        handleClose();
        navigate("/myrides");
    };

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogOut = (e) => {
        setAnchorEl(null);
        sessionStorage.removeItem("token");
        dispatch(logOut());
        navigate("/login");
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Avatar />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleMyRides}>
                    <ListItemIcon>
                        <DirectionsCar />
                    </ListItemIcon>
                    Mes trajets
                </MenuItem>
                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    Profil
                </MenuItem>

                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Déconnexion
                </MenuItem>
            </Menu>
        </>
    );
};

export default MenuUser;
