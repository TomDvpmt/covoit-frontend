import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut, selectUserId } from "../../features/user/userSlice";

import RideCreateDialog from "../RideCreateDialog";

import {
    Menu,
    MenuItem,
    ListItemIcon,
    IconButton,
    Avatar,
} from "@mui/material";
import {
    AddCircleRounded,
    Settings,
    Logout,
    DirectionsCar,
    ContactSupportRounded,
    QuestionAnswer,
} from "@mui/icons-material";

const MenuUser = () => {
    const userId = useSelector(selectUserId);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showMenuRideCreateDialog, setShowMenuRideCreateDialog] =
        useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddRide = () => {
        handleClose();
        setShowMenuRideCreateDialog(true);
    };

    const handleRequests = () => {
        handleClose();
        navigate("/bookingrequests");
    };

    const handleMyRides = () => {
        handleClose();
        navigate("/myrides");
    };

    const handleMyConversations = () => {
        handleClose();
        navigate("/conversations");
    };

    const handleProfile = () => {
        handleClose();
        navigate(`/users/${userId}`);
    };

    const handleLogOut = (e) => {
        setAnchorEl(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
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
                <MenuItem onClick={handleAddRide}>
                    <ListItemIcon>
                        <AddCircleRounded color="secondary" />
                    </ListItemIcon>
                    Créer un trajet
                </MenuItem>
                <MenuItem onClick={handleRequests}>
                    <ListItemIcon>
                        <ContactSupportRounded />
                    </ListItemIcon>
                    Demandes de réservation
                </MenuItem>
                <MenuItem onClick={handleMyRides}>
                    <ListItemIcon>
                        <DirectionsCar />
                    </ListItemIcon>
                    Mes trajets
                </MenuItem>
                <MenuItem onClick={handleMyConversations}>
                    <ListItemIcon>
                        <QuestionAnswer />
                    </ListItemIcon>
                    Mes conversations
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
            <RideCreateDialog
                showRideCreateDialog={showMenuRideCreateDialog}
                setShowRideCreateDialog={setShowMenuRideCreateDialog}
            />
        </>
    );
};

export default MenuUser;
