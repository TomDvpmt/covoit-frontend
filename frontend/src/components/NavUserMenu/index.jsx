import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../features/user/userSlice";

import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";

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

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    const handleLogOut = (e) => {
        setAnchorEl(null);
        sessionStorage.removeItem("token");
        dispatch(logOut);
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
                <MenuItem onClick={handleProfile}>Profil</MenuItem>
                <MenuItem onClick={handleLogOut}>Déconnexion</MenuItem>
            </Menu>
        </>
    );
};

export default MenuUser;
