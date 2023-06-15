import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addDriverRide, selectUserId } from "../../features/user/userSlice";
import { selectPageLocation } from "../../features/page/pageSlice";
import {
    setCreateRideErrorMessage,
    selectCreateRideErrorMessage,
} from "../../features/error/errorSlice";
import { selectAllCities } from "../../features/cities/citiesSlice";

import RideInputLocation from "../form-inputs/RideInputLocation";
import RideInputDepartureDate from "../form-inputs/RideInputDepartureDate";
import RideInputSeats from "../form-inputs/RideInputSeats";
import RideInputPrice from "../form-inputs/RideInputPrice";
import ErrorMessage from "../ErrorMessage";

import BASE_API_URL from "../../utils/API";

import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

import PropTypes from "prop-types";

const RideCreateDialog = ({
    showRideCreateDialog,
    setShowRideCreateDialog,
}) => {
    RideCreateDialog.propTypes = {
        showRideCreateDialog: PropTypes.bool.isRequired,
        setShowRideCreateDialog: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector(selectPageLocation);
    const userId = useSelector(selectUserId);
    const createRideErrorMessage = useSelector(selectCreateRideErrorMessage);
    const allCities = useSelector(selectAllCities);

    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [seats, setSeats] = useState(1);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        dispatch(setCreateRideErrorMessage(""));
    }, [showRideCreateDialog]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setCreateRideErrorMessage(""));

        if (!departure || !destination) {
            dispatch(
                setCreateRideErrorMessage("Merci de remplir tous les champs.")
            );
            return;
        }
        if (price == 0) {
            dispatch(
                setCreateRideErrorMessage(
                    "Le prix du trajet ne peut pas être nul."
                )
            );
            return;
        }

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
            const response = await fetch(`${BASE_API_URL}/API/rides/create`, {
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
            dispatch(addDriverRide(data));
            setDeparture("");
            setDestination("");
            setDepartureDate(Date.now());
            setSeats(1);
            setPrice(0);
            setShowRideCreateDialog(false);
            page !== "myrides" && navigate("/myrides");
        } catch (error) {
            console.log(error);
            dispatch(setCreateRideErrorMessage(error.message));
        }
    };

    return (
        <Dialog open={showRideCreateDialog}>
            <DialogTitle>Créer un trajet</DialogTitle>
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
                            allCities={allCities}
                        />
                        <RideInputLocation
                            type="destination"
                            location={destination}
                            setLocation={setDestination}
                            allCities={allCities}
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
                            onClick={() => setShowRideCreateDialog(false)}>
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

export default RideCreateDialog;
