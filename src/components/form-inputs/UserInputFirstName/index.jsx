import { removeErrorMessages } from "../../../utils/user";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const UserInputFirstName = ({ firstName, setFirstName }) => {
    UserInputFirstName.propTypes = {
        firstName: PropTypes.string,
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
            onFocus={removeErrorMessages}
        />
    );
};

export default UserInputFirstName;
