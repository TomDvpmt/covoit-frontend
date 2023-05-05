import { useSelector, useDispatch } from "react-redux";

import {
    setDeleteRideErrorMessage,
    selectDeleteRideErrorMessage,
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

const DialogRideDelete = ({
    rideId,
    showDialogRideDelete,
    setShowDialogRideDelete,
}) => {
    DialogRideDelete.propTypes = {
        rideId: PropTypes.string.isRequired,
        showDialogRideDelete: PropTypes.bool.isRequired,
        setShowDialogRideDelete: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const deleteRideErrorMessage = useSelector(selectDeleteRideErrorMessage);

    const handleYes = async () => {
        try {
            const response = await fetch(`/API/rides/${rideId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            setShowDialogRideDelete(false);
        } catch (error) {
            console.error(error);
            dispatch(setDeleteRideErrorMessage(error.message));
        }
    };

    const handleNo = () => {
        setShowDialogRideDelete(false);
    };

    return (
        <Dialog open={showDialogRideDelete}>
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
                    Supprimer le trajet
                </Button>
                <Button
                    autoFocus
                    onClick={handleNo}
                    color="primary"
                    variant="text">
                    Annuler
                </Button>
            </DialogActions>
            <Box p="0 1.5rem">
                {deleteRideErrorMessage && (
                    <ErrorMessage errorMessage={deleteRideErrorMessage} />
                )}
            </Box>
        </Dialog>
    );
};

export default DialogRideDelete;
