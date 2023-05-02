import {
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import PropTypes from "prop-types";

const RideInputDeparture = ({ departure, setDeparture }) => {
    RideInputDeparture.propTypes = {
        departure: PropTypes.string.isRequired,
        setDeparture: PropTypes.func.isRequired,
    };
    const handleChange = (e) => {
        setDeparture(e.target.value);
    };
    return (
        <FormControl required fullWidth margin="dense">
            <InputLabel htmlFor="outlined-adornment-departure">
                Départ
            </InputLabel>
            <OutlinedInput
                autoFocus
                id="outlined-adornment-departure"
                type="text"
                startAdornment={
                    <InputAdornment position="start">
                        <LocationOn />
                    </InputAdornment>
                }
                label="Départ"
                value={departure}
                onChange={handleChange}
            />
        </FormControl>
    );
};

export default RideInputDeparture;
