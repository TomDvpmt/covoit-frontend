import { useState } from "react";

import {
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import PropTypes from "prop-types";

const UserInputPasswordConfirm = ({ passwordConfirm, setPasswordConfirm }) => {
    UserInputPasswordConfirm.propTypes = {
        passwordConfirm: PropTypes.string.isRequired,
        setPasswordConfirm: PropTypes.func.isRequired,
    };

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword((show) => !show);
    };

    const handleChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <FormControl required fullWidth margin="dense">
            <InputLabel htmlFor="outlined-adornment-password-confirm">
                Confirmez votre mot de passe
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password-confirm"
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Confirmez votre mot de passe"
                value={passwordConfirm}
                onChange={handleChange}
            />
        </FormControl>
    );
};

export default UserInputPasswordConfirm;
