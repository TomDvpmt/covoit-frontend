import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const UserInputEmail = ({ email, setEmail }) => {
    UserInputEmail.propTypes = {
        email: PropTypes.string.isRequired,
        setEmail: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="email"
            name="email"
            type="email"
            label="Adresse e-mail"
            value={email}
            onChange={handleChange}
        />
    );
};

export default UserInputEmail;
