import { removeErrorMessages } from "../../../utils/user";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const UserInputLastName = ({ lastName, setLastName }) => {
    UserInputLastName.propTypes = {
        lastName: PropTypes.string,
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
            onFocus={removeErrorMessages}
        />
    );
};

export default UserInputLastName;
