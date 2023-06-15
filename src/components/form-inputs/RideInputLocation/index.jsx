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

const RideInputLocation = ({ type, location, setLocation, allCities }) => {
    RideInputLocation.propTypes = {
        type: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        setLocation: PropTypes.func.isRequired,
        allCities: PropTypes.array.isRequired,
    };

    const locationTexts = {
        departure: {
            label: "Départ",
            placeholder: "D'où souhaitez-vous partir ?",
        },
        destination: {
            label: "Destination",
            placeholder: "Où souhaitez-vous aller ?",
        },
    };

    const [cities, setCities] = useState([]);
    const [showCitiesMenu, setShowCitiesMenu] = useState(false);

    const handleTextInputChange = (e) => {
        setLocation(e.target.value);

        const query = e.target.value;

        if (query.length <= 1) {
            setShowCitiesMenu(false);
            return;
        }

        const filteredCities = allCities
            .filter((city) => city.slice(0, query.length) === query)
            .slice(0, 5);
        setCities(filteredCities);
    };

    const handleCitySelect = (e) => {
        setLocation(e.target.id);
        setShowCitiesMenu(false);
    };

    useEffect(() => {
        setShowCitiesMenu(cities.length > 0);
    }, [cities]);

    return (
        <Box sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
            <FormControl required fullWidth margin="dense">
                <InputLabel htmlFor={`outlined-adornment-location-${type}`}>
                    {locationTexts[type].label}
                </InputLabel>
                <OutlinedInput
                    id={`outlined-adornment-location-${type}`}
                    type="text"
                    startAdornment={
                        <InputAdornment position="start">
                            <LocationOn />
                        </InputAdornment>
                    }
                    label={locationTexts[type].label}
                    placeholder={locationTexts[type].placeholder}
                    value={location}
                    onChange={handleTextInputChange}
                />
            </FormControl>

            {showCitiesMenu && (
                <Box
                    sx={{
                        bgcolor: "white",
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

export default RideInputLocation;
