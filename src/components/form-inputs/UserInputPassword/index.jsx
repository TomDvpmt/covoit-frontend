import { useState } from "react";

import { removeErrorMessages } from "../../../utils/user";

import {
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import PropTypes from "prop-types";

const UserInputPassword = ({ password, setPassword }) => {
    UserInputPassword.propTypes = {
        password: PropTypes.string.isRequired,
        setPassword: PropTypes.func.isRequired,
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordVisibility = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormControl required fullWidth margin="dense">
            <InputLabel htmlFor="outlined-adornment-password">
                Mot de passe
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Mot de passe"
                value={password}
                onChange={handleChange}
                onFocus={removeErrorMessages}
            />
        </FormControl>
    );
};

export default UserInputPassword;
