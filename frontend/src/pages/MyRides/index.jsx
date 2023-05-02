import RideInputDeparture from "../../components/form-inputs/RideInputDeparture";
import RideInputDestination from "../../components/form-inputs/RideInputDestination";
import RideInputDepartureDate from "../../components/form-inputs/RideInputDepartureDate";
import RideInputAvailableSeats from "../../components/form-inputs/RideInputAvailableSeats";
import RideInputPrice from "../../components/form-inputs/RideInputPrice";

import dayjs from "dayjs";

import { Box, Collapse, Typography, Button } from "@mui/material";
import { useState } from "react";

const MyRides = () => {
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [availableSeats, setAvailableSeats] = useState(1);
    const [price, setPrice] = useState(0);
    const [showCreateRideForm, setShowCreateRideForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            departure,
            destination,
            departureDate,
            availableSeats,
            price,
        };

        fetch("https://geo.api.gouv.fr/departements/01/communes", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    return (
        <Box component="main">
            <Box component="section">
                <Typography component="h2">Comme conducteur</Typography>
            </Box>
            <Box component="section">
                <Typography component="h2">Comme passager</Typography>
            </Box>
            <Collapse in={showCreateRideForm}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: ".5rem",
                            alignItems: "center",
                        }}>
                        <RideInputDeparture
                            departure={departure}
                            setDeparture={setDeparture}
                        />
                        <RideInputDestination
                            destination={destination}
                            setDestination={setDestination}
                        />
                        <RideInputDepartureDate
                            departureDate={departureDate}
                            setDepartureDate={setDepartureDate}
                        />
                        <RideInputAvailableSeats
                            availableSeats={availableSeats}
                            setAvailableSeats={setAvailableSeats}
                        />
                        <RideInputPrice price={price} setPrice={setPrice} />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Valider
                    </Button>
                </Box>
            </Collapse>
        </Box>
    );
};

export default MyRides;
