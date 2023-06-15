import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateDriverRide } from "../../features/user/userSlice";
import {
    setUpdateRideErrorMessage,
    selectUpdateRideErrorMessage,
} from "../../features/error/errorSlice";

import RideInputDepartureDate from "../form-inputs/RideInputDepartureDate";
import RideInputSeats from "../form-inputs/RideInputSeats";
import ErrorMessage from "../ErrorMessage";

import { Dialog, DialogTitle, Box, Button, DialogContent } from "@mui/material";

import PropTypes from "prop-types";

const RideUpdateDialog = ({
    prevRideData,
    showRideUpdateDialog,
    setShowRideUpdateDialog,
}) => {
    RideUpdateDialog.propTypes = {
        prevRideData: PropTypes.object.isRequired,
        showRideUpdateDialog: PropTypes.bool.isRequired,
        setShowRideUpdateDialog: PropTypes.func.isRequired,
    };
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const updateErrorMessage = useSelector(selectUpdateRideErrorMessage);

    const rideId = prevRideData.id;
    const prevDepartureDate = prevRideData.departureDate;
    const prevTotalSeats = prevRideData.totalSeats;
    const passengers = prevRideData.passengers;

    const [newDepartureDate, setNewDepartureDate] = useState(prevDepartureDate);
    const [newTotalSeats, setNewTotalSeats] = useState(prevTotalSeats);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            newDepartureDate === prevDepartureDate &&
            newTotalSeats === prevTotalSeats
        ) {
            setShowRideUpdateDialog(false);
            return;
        }

        if (newDepartureDate < Date.now()) {
            dispatch(
                setUpdateRideErrorMessage(
                    "La date est dépassée, veuillez en choisir une autre."
                )
            );
            return;
        }

        if (newTotalSeats < passengers.length) {
            dispatch(
                setUpdateRideErrorMessage(
                    "Modification impossible : il y a plus de passagers que de places disponibles."
                )
            );
            return;
        }

        const updateData = {
            departureDate: newDepartureDate,
            totalSeats: newTotalSeats,
        };

        try {
            const response = await fetch(`/API/rides/${rideId}`, {
                method: "PUT",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            dispatch(updateDriverRide({ id: rideId, updateData }));
            setShowRideUpdateDialog(false);
        } catch (error) {
            console.error(error);
            dispatch(setUpdateRideErrorMessage(error.message));
        }
    };

    return (
        <Dialog open={showRideUpdateDialog}>
            <DialogTitle>Mise à jour du trajet</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                    <RideInputDepartureDate
                        departureDate={newDepartureDate}
                        setDepartureDate={setNewDepartureDate}
                    />
                    <RideInputSeats
                        type="total"
                        seats={newTotalSeats}
                        setSeats={setNewTotalSeats}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: ".5rem",
                        }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ m: ".5rem 0" }}>
                            Valider
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            sx={{ m: ".5rem 0" }}
                            onClick={() => setShowRideUpdateDialog(false)}>
                            Annuler
                        </Button>
                    </Box>
                </Box>
                {updateErrorMessage && (
                    <ErrorMessage errorMessage={updateErrorMessage} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default RideUpdateDialog;
