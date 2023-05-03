import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";

import PropTypes from "prop-types";

const RideInputSeats = ({ type, seats, setSeats }) => {
    RideInputSeats.propTypes = {
        type: PropTypes.string.isRequired,
        seats: PropTypes.number.isRequired,
        setSeats: PropTypes.func.isRequired,
    };

    const seatsTexts = {
        total: {
            label: "Nombre maximum de passagers",
        },
        passengers: {
            label: "Places souhaitées",
        },
    };

    const handleChange = (e) => {
        setSeats(parseInt(e.target.value) || 1);
    };

    return (
        <FormControl required margin="dense" sx={{ flexGrow: "1" }}>
            <InputLabel htmlFor="outlined-adornment-seats">
                {seatsTexts[type].label}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-seats"
                type="text"
                startAdornment={
                    <InputAdornment position="start">
                        <PeopleAlt />
                    </InputAdornment>
                }
                label={seatsTexts[type].label}
                value={seats}
                onChange={handleChange}
            />
        </FormControl>
    );
};

export default RideInputSeats;
