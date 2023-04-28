import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormInputPassword = ({ password, setPassword }) => {
    FormInputPassword.propTypes = {
        password: PropTypes.string.isRequired,
        setPassword: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            value={password}
            onChange={handleChange}
        />
    );
};

export default FormInputPassword;
