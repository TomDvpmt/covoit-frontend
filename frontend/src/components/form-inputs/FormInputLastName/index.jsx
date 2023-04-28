import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormInputLastName = ({ lastName, setLastName }) => {
    FormInputLastName.propTypes = {
        lastName: PropTypes.string.isRequired,
        setLastName: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setLastName(e.target.value);
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            id="lastName"
            name="lastName"
            type="text"
            label="Nom"
            value={lastName}
            onChange={handleChange}
        />
    );
};

export default FormInputLastName;
