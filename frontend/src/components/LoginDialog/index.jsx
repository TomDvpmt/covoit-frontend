import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserData } from "../../features/user/userSlice";
import {
    setLoginErrorMessage,
    selectLoginErrorMessage,
} from "../../features/error/errorSlice";

import UserInputEmail from "../form-inputs/UserInputEmail";
import UserInputPassword from "../form-inputs/UserInputPassword";
import ErrorMessage from "../ErrorMessage";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";

import PropTypes from "prop-types";

const LoginDialog = ({
    showLoginDialog,
    setShowLoginDialog,
    actionAfterLogin,
}) => {
    LoginDialog.propTypes = {
        showLoginDialog: PropTypes.bool.isRequired,
        setShowLoginDialog: PropTypes.func.isRequired,
        actionAfterLogin: PropTypes.func.isRequired,
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginErrorMessage = useSelector(selectLoginErrorMessage);

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        try {
            const response = await fetch("API/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            sessionStorage.setItem("token", data.token);
            dispatch(
                setUserData({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                })
            );
            setShowLoginDialog(false);
            // actionAfterLogin();
        } catch (error) {
            console.error(error);
            dispatch(setLoginErrorMessage(error.message));
        }
    };

    return (
        <Dialog open={showLoginDialog}>
            <DialogTitle variant="h4">Connexion</DialogTitle>
            <DialogContent>
                <UserInputEmail email={email} setEmail={setEmail} />
                <UserInputPassword
                    password={password}
                    setPassword={setPassword}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Valider
                </Button>
                <Button
                    type="button"
                    variant="text"
                    color="primary"
                    onClick={() => setShowLoginDialog(false)}>
                    Annuler
                </Button>
            </DialogActions>
            {loginErrorMessage && (
                <Box sx={{ padding: "0 1.5rem" }}>
                    <ErrorMessage errorMessage={loginErrorMessage} />
                </Box>
            )}
        </Dialog>
    );
};

export default LoginDialog;
