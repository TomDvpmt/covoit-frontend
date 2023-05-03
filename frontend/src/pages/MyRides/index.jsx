import { useState } from "react";

import RidesTable from "../../components/RidesTable";
import CreateRideForm from "../../components/forms/CreateRideForm";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Typography, Button } from "@mui/material";

const MyRides = () => {
    const [showCreateRideForm, setShowCreateRideForm] = useState(false);
    const [showDeleteRideDialog, setShowDeleteRideDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowCreateRideForm = () => {
        setShowCreateRideForm((show) => !show);
    };

    return (
        <>
            <Box component="section">
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <Typography component="h2">Comme conducteur</Typography>
                <RidesTable
                    type="driver"
                    showCreateRideForm={showCreateRideForm}
                    showDeleteRideDialog={showDeleteRideDialog}
                    setShowDeleteRideDialog={setShowDeleteRideDialog}
                    setErrorMessage={setErrorMessage}
                />
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
                <Typography component="h2">Comme passager</Typography>
            </Box>
        </>
    );
};

export default MyRides;
