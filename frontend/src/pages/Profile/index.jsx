import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    selectUserId,
    selectUserEmail,
    selectUserFirstName,
    selectUserLastName,
    selectUserPhone,
} from "../../features/user/userSlice";

import ValidationMessage from "../../components/ValidationMessage";
import FormInputEmail from "../../components/form-inputs/FormInputEmail";
import FormInputFirstName from "../../components/form-inputs/FormInputFirstName";
import FormInputLastName from "../../components/form-inputs/FormInputLastName";
import FormInputPhone from "../../components/form-inputs/FormInputPhone";

import {
    Box,
    Paper,
    Button,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Collapse,
} from "@mui/material";

import theme from "../../styles/theme";

const Profile = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        !token && navigate("/login");
    }, [token, navigate]);

    const userId = useSelector(selectUserId);
    const email = useSelector(selectUserEmail);
    const firstName = useSelector(selectUserFirstName);
    const lastName = useSelector(selectUserLastName);
    const phone = useSelector(selectUserPhone);

    const [showUpdateValidation, setShowUpdateValidation] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newEmail, setNewEmail] = useState(email);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newPhone, setNewPhone] = useState(phone);

    const leftCellStyle = {
        width: "45%",
        textAlign: "right",
        fontWeight: "700",
    };

    const handleUpdateUser = () => {
        setShowUpdateValidation(false);
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/API/user/${userId}`, {
                method: "PUT",
                headers: {
                    authorization: `BEARER ${token}`,
                },
                body: JSON.stringify({
                    email: newEmail,
                    firstName: newFirstName,
                    lastName: newLastName,
                    phone: newPhone,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    maxWidth: theme.maxWidth.form,
                    margin: "3rem auto",
                }}>
                {showUpdateValidation && (
                    <ValidationMessage text="Profil mis à jour." />
                )}
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Adresse e-mail :
                                </TableCell>
                                <TableCell>{email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>{firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>{lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Numéro de téléphone :
                                </TableCell>
                                <TableCell>{phone}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="button"
                        variant={showUpdateForm ? "outlined" : "contained"}
                        onClick={handleUpdateUser}
                        sx={{ mt: ".5rem" }}>
                        Modifier les informations
                    </Button>
                </Box>
            </Box>
            <Collapse in={showUpdateForm}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    maxWidth={theme.maxWidth.form}
                    margin="auto">
                    <FormInputEmail email={newEmail} setEmail={setNewEmail} />
                    <FormInputFirstName
                        firstName={newFirstName}
                        setFirstName={setNewFirstName}
                    />
                    <FormInputLastName
                        lastName={newLastName}
                        setLastName={setNewLastName}
                    />
                    <FormInputPhone phone={newPhone} setPhone={setNewPhone} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" variant="contained">
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </>
    );
};

export default Profile;
