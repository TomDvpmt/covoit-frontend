import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

import PropTypes from "prop-types";

const DeleteRideDialog = ({
    rideId,
    showDeleteRideDialog,
    setShowDeleteRideDialog,
    // setErrorMessage,
}) => {
    DeleteRideDialog.propTypes = {
        rideId: PropTypes.string.isRequired,
        showDeleteRideDialog: PropTypes.bool.isRequired,
        setShowDeleteRideDialog: PropTypes.func.isRequired,
        // setErrorMessage: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");

    const handleYes = () => {
        fetch(`/API/rides/${rideId}`, {
            method: "DELETE",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setShowDeleteRideDialog(false);
                console.log(data);
            })
            .catch((error) => console.log(error));
    };

    const handleNo = () => {
        setShowDeleteRideDialog(false);
    };

    return (
        <Dialog open={showDeleteRideDialog}>
            <DialogTitle>
                Êtes-vous sûr de vouloir supprimer le trajet ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
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

export default DeleteRideDialog;
