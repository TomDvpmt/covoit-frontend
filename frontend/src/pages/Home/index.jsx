import { useState } from "react";

import RideInputLocation from "../../components/form-inputs/RideInputLocation";
import RideInputDepartureDate from "../../components/form-inputs/RideInputDepartureDate";
import RideInputSeats from "../../components/form-inputs/RideInputSeats";
import RideInputPrice from "../../components/form-inputs/RideInputPrice";
import RidesTable from "../../components/RidesTable";

import { Box, Typography, Button } from "@mui/material";

const Home = () => {
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [seats, setSeats] = useState(1);
    const [price, setPrice] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [queryRides, setQueryRides] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/API/rides/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                filters: {
                    departure,
                    destination,
                    departureDate: {
                        $gte: departureDate - 24 * 60 * 60 * 1000, // more than 24h before
                        $lte: departureDate + 24 * 60 * 60 * 1000, // less than 24h after
                    },
                    totalSeats: {
                        $gte: seats,
                    },
                    price: {
                        $lte: price,
                    },
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setQueryRides(data.results);
                setShowResults(true);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Box>
            <Box component="form" onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".5rem",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: ".5rem",
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
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: ".5rem",
                        }}>
                        <RideInputDepartureDate
                            departureDate={departureDate}
                            setDepartureDate={setDepartureDate}
                        />
                        <RideInputSeats
                            type="passengers"
                            seats={seats}
                            setSeats={setSeats}
                        />
                    </Box>
                    <RideInputPrice
                        type="max"
                        price={price}
                        setPrice={setPrice}
                    />
                </Box>
                <Button type="submit" variant="contained">
                    Chercher
                </Button>
            </Box>
            {showResults && (
                <>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{ m: "2rem 0 1rem" }}>
                        Résultats
                    </Typography>
                    <RidesTable type="query" rides={queryRides} />
                </>
            )}
        </Box>
    );
};

export default Home;
