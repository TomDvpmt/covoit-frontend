import { useState } from "react";

import FormInputEmail from "../../components/form-inputs/FormInputEmail";
import FormInputPassword from "../../components/form-inputs/FormInputPassword";
import FormInputPasswordConfirm from "../../components/form-inputs/FormInputPasswordConfirm";
import FormInputFirstName from "../../components/form-inputs/FormInputFirstName";
import FormInputLastName from "../../components/form-inputs/FormInputLastName";
import FormInputPhone from "../../components/form-inputs/FormInputPhone";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Button } from "@mui/material";

import theme from "../../styles/theme";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        setErrorMessage("");

        e.preventDefault();

        if (password !== passwordConfirm) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("API/user/register", {
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
                response.json().then((data) => setErrorMessage(data.message));
                return;
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            setErrorMessage("Impossible de créer le compte.");
        }
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
            <FormInputEmail email={email} setEmail={setEmail} />
            <FormInputPassword password={password} setPassword={setPassword} />
            <FormInputPasswordConfirm
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
            />
            <FormInputFirstName
                firstName={firstName}
                setFirstName={setFirstName}
            />
            <FormInputLastName lastName={lastName} setLastName={setLastName} />
            <FormInputPhone phone={phone} setPhone={setPhone} />
            <Button type="submit" variant="contained" sx={{ mt: ".5rem" }}>
                Valider
            </Button>
        </Box>
    );
};

export default Register;
