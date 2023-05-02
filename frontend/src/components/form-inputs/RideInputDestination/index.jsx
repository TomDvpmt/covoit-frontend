import { useEffect, useState } from "react";

import {
    FormControl,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    Box,
    Typography,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import theme from "../../../styles/theme";

import PropTypes from "prop-types";

const RideInputDestination = ({ destination, setDestination }) => {
    RideInputDestination.propTypes = {
        destination: PropTypes.string.isRequired,
        setDestination: PropTypes.func.isRequired,
    };

    const [cities, setCities] = useState([]);
    const [showCitiesMenu, setShowCitiesMenu] = useState(false);

    const handleTextInputChange = (e) => {
        setDestination(e.target.value);

        const query = e.target.value;

        fetch(
            `https://geo.api.gouv.fr/communes?nom=${query}&boost=population&limit=5`
        )
            .then((response) => response.json())
            .then((data) => setCities(data.map((city) => city.nom)))
            .catch((error) => console.log(error));
    };

    const handleCitySelect = (e) => {
        setDestination(e.target.id);
        setShowCitiesMenu(false);
    };

    useEffect(() => {
        setShowCitiesMenu(cities.length > 0);
    }, [cities]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor="outlined-adornment-destination">
                    Destination
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-destination"
                    type="text"
                    startAdornment={
                        <InputAdornment position="start">
                            <LocationOn />
                        </InputAdornment>
                    }
                    label="Destination"
                    value={destination}
                    onChange={handleTextInputChange}
                />
            </FormControl>

            {showCitiesMenu && (
                <Box
                    sx={{
                        bgcolor: "#f5f5f5",
                        p: ".3rem",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    {cities.map((city, index) => (
                        <Typography
                            key={index}
                            id={city}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                    bgcolor: theme.palette.primary.light,
                                },
                            }}
                            onClick={handleCitySelect}>
                            {city}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default RideInputDestination;
