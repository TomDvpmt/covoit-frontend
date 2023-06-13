import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setHomeErrorMessage,
    selectHomeErrorMessage,
} from "../../features/error/errorSlice";
import { selectAllCities } from "../../features/cities/citiesSlice";

import RideInputLocation from "../../components/form-inputs/RideInputLocation";
import RideInputDepartureDate from "../../components/form-inputs/RideInputDepartureDate";
import RideInputPrice from "../../components/form-inputs/RideInputPrice";
import RidesList from "../../components/RidesList";
import ErrorMessage from "../../components/ErrorMessage";

import theme from "../../styles/theme";
import { Box, Typography, Button } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const homeErrorMessage = useSelector(selectHomeErrorMessage);
    const allCities = useSelector(selectAllCities);

    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState(Date.now());
    const [price, setPrice] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [queryRides, setQueryRides] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQueryRides([]);
        dispatch(setHomeErrorMessage(""));

        if (departure === destination) {
            dispatch(
                setHomeErrorMessage(
                    "Le départ et la destination ne peuvent être identiques."
                )
            );
            return;
        }

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
                    price: {
                        $lte: price,
                    },
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setQueryRides(
                    data.results.filter(
                        (result) => result.totalSeats > result.passengers.length
                    )
                );
                setShowResults(true);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Box
                display="none"
                component="section"
                m="3rem auto"
                p=".5rem"
                maxWidth="600px"
                sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
                <Typography
                    component="h2"
                    m="2rem 0"
                    align="center"
                    fontSize="1.2rem"
                    fontWeight="700">
                    Aide pour tester l'application
                </Typography>
                <Typography>Trajets existants : </Typography>
                <Box component="ul">
                    <Typography component="li">
                        {"Paris => Strasbourg le 31/12/2023 à 16h00 pour 10€"}
                    </Typography>
                    <Typography component="li">
                        {
                            "Brest => Clermont-Ferrand le 31/12/2023 à 16h00 pour 10€"
                        }
                    </Typography>
                    <Typography component="li">
                        {"Bordeaux => Lyon le 31/12/2023 à 09h00 pour 15€"}
                    </Typography>
                </Box>
            </Box>
            <Box component="section">
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
                                allCities={allCities}
                            />
                            <RideInputLocation
                                type="destination"
                                location={destination}
                                setLocation={setDestination}
                                allCities={allCities}
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
                            <RideInputPrice
                                type="max"
                                price={price}
                                setPrice={setPrice}
                            />
                        </Box>
                        {homeErrorMessage && (
                            <ErrorMessage errorMessage={homeErrorMessage} />
                        )}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: "1rem" }}>
                        Chercher
                    </Button>
                </Box>
            </Box>
            {showResults && (
                <Box component="section">
                    {queryRides?.length > 0 ? (
                        <>
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{ m: "2rem 0 1rem" }}>
                                {`${queryRides.length} résultat${
                                    queryRides.length > 1 ? "s" : ""
                                } :`}
                            </Typography>
                            <RidesList type="query" rides={queryRides} />
                        </>
                    ) : (
                        <Typography mt="2rem">
                            Aucun résultat pour cette recherche.
                        </Typography>
                    )}
                </Box>
            )}
        </>
    );
};

export default Home;
