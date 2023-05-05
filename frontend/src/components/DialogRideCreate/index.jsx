import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";
import {
    setCreateRideErrorMessage,
    selectCreateRideErrorMessage,
} from "../../features/error/errorSlice";

import RideInputLocation from "../form-inputs/RideInputLocation";
import RideInputDepartureDate from "../form-inputs/RideInputDepartureDate";
import RideInputSeats from "../form-inputs/RideInputSeats";
import RideInputPrice from "../form-inputs/RideInputPrice";
import ErrorMessage from "../ErrorMessage";

import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

import PropTypes from "prop-types";

const DialogRideCreate = ({
    showDialogRideCreate,
    setShowDialogRideCreate,
}) => {
    DialogRideCreate.propTypes = {
        showDialogRideCreate: PropTypes.bool.isRequired,
        setShowDialogRideCreate: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const createRideErrorMessage = useSelector(selectCreateRideErrorMessage);

    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [seats, setSeats] = useState(1);
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        dispatch(setCreateRideErrorMessage(""));
        e.preventDefault();

        const data = {
            driverId: userId,
            departure,
            destination,
            departureDate,
            totalSeats: seats,
            price,
            passengers: [],
        };

        try {
            const response = await fetch("/API/rides/create", {
                method: "POST",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            setDeparture("");
            setDestination("");
            setDepartureDate(Date.now());
            setSeats(1);
            setPrice(0);
            setShowDialogRideCreate(false);
        } catch (error) {
            console.log(error);
            dispatch(setCreateRideErrorMessage(error.message));
        }
    };

    return (
        <Dialog open={showDialogRideCreate}>
            <DialogTitle>Ajouter un trajet</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: ".5rem",
                            alignItems: "center",
                        }}>
                        <RideInputLocation
                            type="departure"
                            location={departure}
                            setLocation={setDeparture}
                        />
                        <RideInputLocation
                            type="destination"
                            location={destination}
                            setLocation={setDestination}
                        />
                        <RideInputDepartureDate
                            departureDate={departureDate}
                            setDepartureDate={setDepartureDate}
                        />
                        <RideInputSeats
                            type="total"
                            seats={seats}
                            setSeats={setSeats}
                        />
                        <RideInputPrice
                            type="fixed"
                            price={price}
                            setPrice={setPrice}
                        />
                    </Box>
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
                            onClick={handleSubmit}>
                            Créer le trajet
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            color="primary"
                            onClick={() => setShowDialogRideCreate(false)}>
                            Annuler
                        </Button>
                    </Box>
                    {createRideErrorMessage && (
                        <ErrorMessage errorMessage={createRideErrorMessage} />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DialogRideCreate;
