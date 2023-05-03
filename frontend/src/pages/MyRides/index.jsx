import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";

import RidesTable from "../../components/RidesTable";
import CreateRideForm from "../../components/forms/CreateRideForm";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Typography, Button } from "@mui/material";

const MyRides = () => {
    const userId = useSelector(selectUserId);

    const [showCreateRideForm, setShowCreateRideForm] = useState(false);
    const [showDeleteRideDialog, setShowDeleteRideDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowCreateRideForm = () => {
        setShowCreateRideForm((show) => !show);
    };

    return (
        <>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Comme conducteur
                </Typography>
                {userId && (
                    <RidesTable
                        type={{
                            name: "driver",
                            filters: {
                                driverId: userId,
                            },
                        }}
                        showCreateRideForm={showCreateRideForm}
                        showDeleteRideDialog={showDeleteRideDialog}
                        setShowDeleteRideDialog={setShowDeleteRideDialog}
                        setErrorMessage={setErrorMessage}
                    />
                )}
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
