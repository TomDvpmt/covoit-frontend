import { removeErrorMessages } from "../../../utils/user";

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
            required
            fullWidth
            margin="dense"
            id="email"
            name="email"
            type="email"
            label="Adresse e-mail"
            value={email}
            onChange={handleChange}
            onFocus={removeErrorMessages}
        />
    );
};

export default UserInputEmail;
