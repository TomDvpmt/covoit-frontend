import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUserData } from "../../features/user/userSlice";

import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputPassword from "../../components/form-inputs/UserInputPassword";
import ErrorMessage from "../../components/ErrorMessage";

import { logIn } from "../../features/user/userSlice";

import { Box, Button } from "@mui/material";

import theme from "../../styles/theme";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch("API/user/login", {
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
                        .then((data) => setErrorMessage(data.message));
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
                setErrorMessage("Connexion impossible.");
            });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: theme.maxWidth.form,
                margin: "3rem auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <UserInputEmail email={email} setEmail={setEmail} />
            <UserInputPassword password={password} setPassword={setPassword} />
            <Button type="submit" variant="contained" sx={{ mt: ".5rem" }}>
                Se connecter
            </Button>
        </Box>
    );
};

export default Login;
