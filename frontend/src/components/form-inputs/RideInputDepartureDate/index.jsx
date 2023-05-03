import { FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import PropTypes from "prop-types";

const RideInputDepartureDate = ({ departureDate, setDepartureDate }) => {
    RideInputDepartureDate.propTypes = {
        departureDate: PropTypes.number.isRequired,
        setDepartureDate: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setDepartureDate(Date.parse(e));
    };

    return (
        <>
            <FormControl margin="dense">
                <DateTimePicker
                    required
                    label="Date et heure de départ *"
                    value={dayjs(departureDate)}
                    onChange={handleChange}
                    slotProps={{
                        inputAdornment: {
                            position: "start",
                        },
                    }}
                />
            </FormControl>
        </>
    );
};

export default RideInputDepartureDate;
