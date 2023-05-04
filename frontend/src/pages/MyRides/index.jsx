import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    selectDriverRides,
    selectUserId,
    setDriverRides,
} from "../../features/user/userSlice";

import RidesList from "../../components/RidesList";
import CreateRideForm from "../../components/forms/CreateRideForm";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Typography, Button } from "@mui/material";

const MyRides = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const driverRides = useSelector(selectDriverRides);
    const dispatch = useDispatch();
    // const [driverRides, setDriverRides] = useState([]);

    const [showCreateRideForm, setShowCreateRideForm] = useState(false);
    const [showDeleteRideDialog, setShowDeleteRideDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowCreateRideForm = () => {
        setShowCreateRideForm((show) => !show);
    };

    useEffect(() => {
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
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setDriverRides(data.results));
                    // setDriverRides(data.results);
                })
                .catch((error) => console.error(error));
    }, [token, userId, showCreateRideForm, showDeleteRideDialog]);

    return (
        <>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Comme conducteur
                </Typography>
                {userId && <RidesList type="driver" rides={driverRides} />}
                <Button
                    variant={showCreateRideForm ? "outlined" : "contained"}
                    onClick={handleShowCreateRideForm}
                    sx={{ m: ".5rem 0" }}>
                    Ajouter un trajet
                </Button>
                <CreateRideForm
                    showCreateRideForm={showCreateRideForm}
                    setShowCreateRideForm={setShowCreateRideForm}
                />
            </Box>
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Comme passager
                </Typography>
            </Box>
        </>
    );
};

export default MyRides;
