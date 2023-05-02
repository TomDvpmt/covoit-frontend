import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Typography,
} from "@mui/material";
import { Euro } from "@mui/icons-material";

import PropTypes from "prop-types";

const RideInputPrice = ({ price, setPrice }) => {
    RideInputPrice.propTypes = {
        price: PropTypes.number.isRequired,
        setPrice: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setPrice(parseInt(e.target.value) || 0);
    };

    return (
        <FormControl required margin="dense">
            <InputLabel htmlFor="outlined-adornment-price">Prix</InputLabel>
            <OutlinedInput
                id="outlined-adornment-price"
                type="text"
                endAdornment={
                    <InputAdornment position="end">
                        <Euro fontSize="small" />
                    </InputAdornment>
                }
                label="Prix"
                value={price}
                onChange={handleChange}
                inputProps={{
                    style: {
                        textAlign: "right",
                    },
                }}
            />
        </FormControl>
    );
};

export default RideInputPrice;
