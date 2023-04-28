import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormInputPhone = ({ phone, setPhone }) => {
    FormInputPhone.propTypes = {
        phone: PropTypes.string.isRequired,
        setPhone: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setPhone(e.target.value);
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            id="phone"
            name="phone"
            type="text"
            label="Numéro de téléphone"
            value={phone}
            onChange={handleChange}
        />
    );
};

export default FormInputPhone;
