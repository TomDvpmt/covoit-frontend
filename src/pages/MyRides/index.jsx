import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setDriverRides,
    setPassengerRides,
    selectDriverRides,
    selectPassengerRides,
    selectUserId,
} from "../../features/user/userSlice";
import {
    resetErrorMessages,
    setMyRidesDriverErrorMessage,
    setMyRidesPassengerErrorMessage,
    selectMyRidesDriverErrorMessage,
    selectMyRidesPassengerErrorMessage,
} from "../../features/error/errorSlice";

import RidesList from "../../components/RidesList";
import RideCreateDialog from "../../components/RideCreateDialog";
import ErrorMessage from "../../components/ErrorMessage";

import BASE_API_URL from "../../utils/API";

import { Box, Typography, Button } from "@mui/material";

const MyRides = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    const driverRides = useSelector(selectDriverRides);
    const driverErrorMessage = useSelector(selectMyRidesDriverErrorMessage);

    const passengerRides = useSelector(selectPassengerRides);
    const passengerErrorMessage = useSelector(
        selectMyRidesPassengerErrorMessage
    );

    const [showRideCreateDialog, setShowRideCreateDialog] = useState(false);

    const handleShowRideCreateDialog = () => {
        setShowRideCreateDialog((show) => !show);
    };

    // Get rides as a driver
    useEffect(() => {
        dispatch(resetErrorMessages());

        userId &&
            fetch(`${BASE_API_URL}/API/rides/`, {
                method: "POST",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    filters: { driverId: userId },
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        response
                            .json()
                            .then((data) =>
                                dispatch(
                                    setMyRidesDriverErrorMessage(data.message)
                                )
                            );
                    }
                    return response.json();
                })
                .then((data) => {
                    dispatch(
                        setDriverRides(
                            data.results.length > 0 &&
                                data.results.sort(
                                    (a, b) => a.departureDate - b.departureDate
                                )
                        )
                    );
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(
                        setMyRidesDriverErrorMessage(
                            "Impossible d'afficher les trajets."
                        )
                    );
                });
    }, [token, userId, showRideCreateDialog]);

    // Get rides as a passenger
    useEffect(() => {
        dispatch(resetErrorMessages());

        userId &&
            fetch(`${BASE_API_URL}/API/rides/`, {
                method: "POST",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    filters: { passengers: { $in: [userId] } },
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        response
                            .json()
                            .then((data) =>
                                dispatch(
                                    setMyRidesPassengerErrorMessage(
                                        data.message
                                    )
                                )
                            );
                    }
                    return response.json();
                })
                .then((data) => {
                    dispatch(
                        setPassengerRides(
                            data.results.length > 0 &&
                                data.results.sort(
                                    (a, b) => a.departureDate - b.departureDate
                                )
                        )
                    );
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(
                        setMyRidesPassengerErrorMessage(
                            "Impossible d'afficher les trajets."
                        )
                    );
                });
    }, [token, userId]);

    return (
        <>
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Comme conducteur
                </Typography>
                {userId && driverRides && (
                    <RidesList type="driver" rides={driverRides} />
                )}
                {driverErrorMessage && (
                    <ErrorMessage errorMessage={driverErrorMessage} />
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant={
                            showRideCreateDialog ? "outlined" : "contained"
                        }
                        color="secondary"
                        onClick={handleShowRideCreateDialog}
                        sx={{ m: ".5rem 0" }}>
                        Créer un trajet
                    </Button>
                </Box>
                <RideCreateDialog
                    showRideCreateDialog={showRideCreateDialog}
                    setShowRideCreateDialog={setShowRideCreateDialog}
                />
            </Box>
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Comme passager
                </Typography>
                {userId && passengerRides && (
                    <RidesList type="passenger" rides={passengerRides} />
                )}
                {passengerErrorMessage && (
                    <ErrorMessage errorMessage={passengerErrorMessage} />
                )}
            </Box>
        </>
    );
};

export default MyRides;
