import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../features/user/userSlice";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

import PropTypes from "prop-types";

const DeleteDialog = ({
    userId,
    showDialog,
    setShowDialog,
    setErrorMessage,
}) => {
    DeleteDialog.propTypes = {
        userId: PropTypes.string.isRequired,
        showDialog: PropTypes.bool.isRequired,
        setShowDialog: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleYes = () => {
        fetch(`/API/user/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setErrorMessage("Impossible de supprimer le compte.");
                    setShowDialog(false);
                    return;
                }
                dispatch(logOut());
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };

    const handleNo = () => {
        setShowDialog(false);
    };

    return (
        <Dialog open={showDialog}>
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
                    Oui
                </Button>
                <Button autoFocus onClick={handleNo} color="warning">
                    Non
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
