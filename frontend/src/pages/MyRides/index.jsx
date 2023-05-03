import RideInputLocation from "../../components/form-inputs/RideInputLocation";
import RideInputDepartureDate from "../../components/form-inputs/RideInputDepartureDate";
import RideInputSeats from "../../components/form-inputs/RideInputSeats";
import RideInputPrice from "../../components/form-inputs/RideInputPrice";

import { Box, Collapse, Typography, Button } from "@mui/material";
import { useState } from "react";

const MyRides = () => {
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [seats, setSeats] = useState(0);
    const [price, setPrice] = useState(0);
    const [showCreateRideForm, setShowCreateRideForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            departure,
            destination,
            departureDate,
            seats,
            price,
        };

        console.log(data);
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
                    <Button type="submit" variant="contained" color="primary">
                        Valider
                    </Button>
                </Box>
            </Collapse>
        </Box>
    );
};

export default MyRides;
