import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormInputFirstName = ({ firstName, setFirstName }) => {
    FormInputFirstName.propTypes = {
        firstName: PropTypes.string.isRequired,
        setFirstName: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            id="firstName"
            name="firstName"
            type="text"
            label="Prénom"
            value={firstName}
            onChange={handleChange}
        />
    );
};

export default FormInputFirstName;
