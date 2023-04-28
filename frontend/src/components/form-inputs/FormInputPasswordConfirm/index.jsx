import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const FormInputPasswordConfirm = ({ passwordConfirm, setPasswordConfirm }) => {
    FormInputPasswordConfirm.propTypes = {
        passwordConfirm: PropTypes.string.isRequired,
        setPasswordConfirm: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            id="passwordConfirm"
            name="passwordConfirm"
            type="passwordConfirm"
            label="Confirmez votre mot de passe"
            value={passwordConfirm}
            onChange={handleChange}
        />
    );
};

export default FormInputPasswordConfirm;
