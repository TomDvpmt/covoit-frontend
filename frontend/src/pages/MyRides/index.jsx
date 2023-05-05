import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    selectDriverRides,
    selectUserId,
    setDriverRides,
} from "../../features/user/userSlice";
import {
    setMyRidesDriverErrorMessage,
    setMyRidesPassengerErrorMessage,
    resetErrorMessages,
    selectMyRidesDriverErrorMessage,
    selectMyRidesPassengerErrorMessage,
} from "../../features/error/errorSlice";

import RidesList from "../../components/RidesList";
import RideCreateDialog from "../../components/RideCreateDialog";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Typography, Button } from "@mui/material";

const MyRides = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    const driverRides = useSelector(selectDriverRides);
    const driverErrorMessage = useSelector(selectMyRidesDriverErrorMessage);
    const passengerErrorMessage = useSelector(
        selectMyRidesPassengerErrorMessage
    );

    const [showRideCreateDialog, setShowRideCreateDialog] = useState(false);
    const [showRideDeleteDialog, setShowRideDeleteDialog] = useState(false);

    const handleShowRideCreateDialog = () => {
        setShowRideCreateDialog((show) => !show);
    };

    useEffect(() => {
        dispatch(resetErrorMessages());

        userId &&
            fetch("/API/rides/", {
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
                    dispatch(setDriverRides(data.results));
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(
                        setMyRidesDriverErrorMessage(
                            "Impossible d'afficher les trajets."
                        )
                    );
                });
    }, [token, userId, showRideCreateDialog, showRideDeleteDialog]);

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
                        Ajouter un trajet
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
                {passengerErrorMessage && (
                    <ErrorMessage errorMessage={passengerErrorMessage} />
                )}
            </Box>
        </>
    );
};

export default MyRides;
