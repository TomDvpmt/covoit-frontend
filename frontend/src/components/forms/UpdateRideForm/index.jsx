import { useState } from "react";

import RideInputDepartureDate from "../../form-inputs/RideInputDepartureDate";
import RideInputSeats from "../../form-inputs/RideInputSeats";

import { Dialog, DialogTitle, Box, Button, DialogContent } from "@mui/material";

import PropTypes from "prop-types";

const UpdateRideForm = ({
    prevRideData,
    showUpdateRideForm,
    setShowUpdateRideForm,
    setErrorMessage,
}) => {
    UpdateRideForm.propTypes = {
        prevRideData: PropTypes.object.isRequired,
        showUpdateRideForm: PropTypes.bool.isRequired,
        setShowUpdateRideForm: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };
    const token = sessionStorage.getItem("token");

    const rideId = prevRideData.id;
    const prevDepartureDate = prevRideData.departureDate;
    const prevTotalSeats = prevRideData.totalSeats;
    const passengers = prevRideData.passengers;

    const [newDepartureDate, setNewDepartureDate] = useState(prevDepartureDate);
    const [newTotalSeats, setNewTotalSeats] = useState(prevTotalSeats);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            newDepartureDate === prevDepartureDate &&
            newTotalSeats === prevTotalSeats
        ) {
            setShowUpdateRideForm(false);
            return;
        }

        if (newDepartureDate < Date.now()) {
            setShowUpdateRideForm(false);
            setErrorMessage(
                "La date est dépassée, veuillez en choisir une autre."
            );
            return;
        }

        if (newTotalSeats < passengers.length) {
            setShowUpdateRideForm(false);
            setErrorMessage(
                "Modification impossible : il y a plus de passagers que de places disponibles."
            );
            return;
        }

        const updateData = {
            departureDate: newDepartureDate,
            totalSeats: newTotalSeats,
        };

        fetch(`/API/rides/${rideId}`, {
            method: "PUT",
            headers: {
                Authorization: `BEARER ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setShowUpdateRideForm(false);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Dialog open={showUpdateRideForm}>
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
                            sx={{ m: ".5rem 0" }}>
                            Valider
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            sx={{ m: ".5rem 0" }}
                            onClick={() => setShowUpdateRideForm(false)}>
                            Annuler
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateRideForm;
