import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "../../features/user/userSlice";
import {
    selectLoginErrorMessage,
    setLoginErrorMessage,
} from "../../features/error/errorSlice";

import LoginDemoUsers from "../../components/LoginDemoUsers";
import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputPassword from "../../components/form-inputs/UserInputPassword";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

import API_BASE_URI from "../../config/API";

import { Box, Button } from "@mui/material";

import theme from "../../styles/theme";

const LoginForm = ({ setShowLoginDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const errorMessage = useSelector(selectLoginErrorMessage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
            const response = await fetch(`${API_BASE_URI}/API/users/login`, {
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

        setShowLoginDialog && setShowLoginDialog(false);
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
            <LoginDemoUsers handleSubmit={handleSubmit} />
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

export default LoginForm;
