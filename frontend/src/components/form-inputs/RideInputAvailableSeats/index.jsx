import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";

import PropTypes from "prop-types";

const RideInputAvailableSeats = ({ availableSeats, setAvailableSeats }) => {
    RideInputAvailableSeats.propTypes = {
        availableSeats: PropTypes.number.isRequired,
        setAvailableSeats: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setAvailableSeats(parseInt(e.target.value) || 1);
    };

    return (
        <FormControl required margin="dense">
            <InputLabel htmlFor="outlined-adornment-available-seats">
                Places disponibles
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-available-seats"
                type="text"
                startAdornment={
                    <InputAdornment position="start">
                        <PeopleAlt />
                    </InputAdornment>
                }
                label="Places disponibles"
                value={availableSeats}
                onChange={handleChange}
            />
        </FormControl>
    );
};

export default RideInputAvailableSeats;
