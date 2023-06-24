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
import Loader from "../../components/Loader";

import API_BASE_URI from "../../config/API";

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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetErrorMessages());

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
            setIsLoading(true);

            const loginResponse = await fetch(
                `${API_BASE_URI}/API/users/register`,
                {
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
                }
            );
            if (!loginResponse.ok) {
                loginResponse
                    .json()
                    .then((data) =>
                        dispatch(setRegisterErrorMessage(data.message))
                    );
                setIsLoading(false);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            dispatch(setRegisterErrorMessage("Impossible de créer le compte."));
            return;
        }

        // Auto login after register

        try {
            const registerResponse = await fetch(
                `${API_BASE_URI}/API/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            if (!registerResponse.ok) {
                registerResponse
                    .json()
                    .then((data) =>
                        dispatch(setRegisterErrorMessage(data.message))
                    );
                setIsLoading(false);
                return;
            }
            const data = await registerResponse.json();

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

            setIsLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            dispatch(setRegisterErrorMessage("Connexion impossible."));
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    };

    return isLoading ? (
        <Loader />
    ) : (
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
