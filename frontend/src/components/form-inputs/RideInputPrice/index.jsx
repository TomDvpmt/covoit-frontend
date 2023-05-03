import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from "@mui/material";
import { Euro } from "@mui/icons-material";

import PropTypes from "prop-types";

const RideInputPrice = ({ type, price, setPrice }) => {
    RideInputPrice.propTypes = {
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        setPrice: PropTypes.func.isRequired,
    };

    const priceTexts = {
        fixed: {
            label: "Prix",
        },
        max: {
            label: "Prix maximum",
        },
    };

    const handleChange = (e) => {
        setPrice(parseInt(e.target.value) || 0);
    };

    return (
        <FormControl required margin="dense">
            <InputLabel htmlFor="outlined-adornment-price">
                {priceTexts[type].label}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-price"
                type="text"
                endAdornment={
                    <InputAdornment position="end">
                        <Euro fontSize="small" />
                    </InputAdornment>
                }
                label={priceTexts[type].label}
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
