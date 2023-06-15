import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logIn, setUserData } from "../../features/user/userSlice";
import {
    selectRegisterErrorMessage,
    setRegisterErrorMessage,
    resetErrorMessages,
} from "../../features/error/errorSlice";

import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputPassword from "../../components/form-inputs/UserInputPassword";
import UserInputPasswordConfirm from "../../components/form-inputs/UserInputPasswordConfirm";
import UserInputFirstName from "../../components/form-inputs/UserInputFirstName";
import UserInputLastName from "../../components/form-inputs/UserInputLastName";
import UserInputPhone from "../../components/form-inputs/UserInputPhone";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Button } from "@mui/material";

import theme from "../../styles/theme";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorMessage = useSelector(selectRegisterErrorMessage);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        dispatch(resetErrorMessages());

        e.preventDefault();

        if (password !== passwordConfirm) {
            dispatch(
                setRegisterErrorMessage(
                    "Les mots de passe ne correspondent pas."
                )
            );
            return;
        }

        // Register

        try {
            const response = await fetch("API/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    phone,
                }),
            });
            if (!response.ok) {
                response
                    .json()
                    .then((data) =>
                        dispatch(setRegisterErrorMessage(data.message))
                    );
                return;
            }
            const data = await response.json();
        } catch (error) {
            dispatch(setRegisterErrorMessage("Impossible de créer le compte."));
            return;
        }

        // Auto log in after register

        fetch("API/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    response
                        .json()
                        .then((data) =>
                            dispatch(setRegisterErrorMessage(data.message))
                        );
                    return;
                }
                response.json().then((data) => {
                    sessionStorage.setItem("token", data.token);
                    dispatch(logIn());
                    dispatch(
                        setUserData({
                            id: data.id,
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phone: data.phone,
                        })
                    );
                });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                dispatch(setRegisterErrorMessage(error.message)); // to be tested
            });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: theme.maxWidth.form,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <UserInputEmail email={email} setEmail={setEmail} />
            <UserInputPassword password={password} setPassword={setPassword} />
            <UserInputPasswordConfirm
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
            />
            <UserInputFirstName
                firstName={firstName}
                setFirstName={setFirstName}
            />
            <UserInputLastName lastName={lastName} setLastName={setLastName} />
            <UserInputPhone phone={phone} setPhone={setPhone} />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: ".5rem" }}>
                Valider
            </Button>
        </Box>
    );
};

export default Register;
