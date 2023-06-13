import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "../../features/user/userSlice";
import {
    selectLoginErrorMessage,
    setLoginErrorMessage,
} from "../../features/error/errorSlice";

import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputPassword from "../../components/form-inputs/UserInputPassword";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Button } from "@mui/material";

import theme from "../../styles/theme";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const errorMessage = useSelector(selectLoginErrorMessage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.target.id !== "demo1" && e.target.id !== "demo2") {
            if (email === "" || password === "") {
                dispatch(
                    setLoginErrorMessage(
                        "Tous les champs doivent être remplis."
                    )
                );
                return;
            }
        }

        let loginData = {
            email,
            password,
        };

        if (e.target.id === "demo1") {
            loginData = {
                email: "demo_user@gmail.com",
                password: "password",
            };
        }
        if (e.target.id === "demo2") {
            loginData = {
                email: "demo2_user@gmail.com",
                password: "password",
            };
        }

        try {
            const response = await fetch("API/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.id);
            dispatch(
                setUserData({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                })
            );
            navigate("/");
        } catch (error) {
            console.error(error);
            dispatch(setLoginErrorMessage(error.message));
        }
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
            <Box
                alignSelf="center"
                mb="3rem"
                display="flex"
                justifyContent="center"
                gap="1rem">
                <Button
                    id="demo1"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Utilisateur démo 1
                </Button>
                <Button
                    id="demo2"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Utilisateur démo 2
                </Button>
            </Box>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <UserInputEmail email={email} setEmail={setEmail} />
            <UserInputPassword password={password} setPassword={setPassword} />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: ".5rem" }}>
                Se connecter
            </Button>
        </Box>
    );
};

export default Login;
