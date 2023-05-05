import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../features/user/userSlice";
import {
    setDeleteUserErrorMessage,
    selectDeleteUserErrorMessage,
} from "../../features/error/errorSlice";

import ErrorMessage from "../ErrorMessage";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Box,
} from "@mui/material";

import PropTypes from "prop-types";

const DialogUserDelete = ({
    userId,
    showDeleteDialog,
    setShowDeleteDialog,
}) => {
    DialogUserDelete.propTypes = {
        userId: PropTypes.string.isRequired,
        showDeleteDialog: PropTypes.bool.isRequired,
        setShowDeleteDialog: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteUserErrorMessage = useSelector(selectDeleteUserErrorMessage);

    const handleYes = async () => {
        try {
            const response = await fetch(`/API/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            dispatch(logOut());
            navigate("/login");
        } catch (error) {}
    };

    const handleNo = () => {
        setShowDeleteDialog(false);
    };

    return (
        <Dialog open={showDeleteDialog}>
            <DialogTitle>
                Êtes-vous sûr de vouloir supprimer le compte ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Toutes les données qui y sont attachées seront supprimées.
                    Cette opération est irréversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleYes} color="warning">
                    Supprimer le compte
                </Button>
                <Button autoFocus onClick={handleNo} color="primary">
                    Annuler
                </Button>
            </DialogActions>
            <Box sx={{ p: "0 1.5rem" }}>
                {deleteUserErrorMessage && (
                    <ErrorMessage errorMessage={deleteUserErrorMessage} />
                )}
            </Box>
        </Dialog>
    );
};

export default DialogUserDelete;
