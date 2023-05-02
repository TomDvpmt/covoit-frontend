import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setUserEmail,
    setUserFirstName,
    setUserLastName,
    setUserPhone,
} from "../../features/user/userSlice";
import {
    selectUserId,
    selectUserEmail,
    selectUserFirstName,
    selectUserLastName,
    selectUserPhone,
} from "../../features/user/userSlice";

import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputFirstName from "../../components/form-inputs/UserInputFirstName";
import UserInputLastName from "../../components/form-inputs/UserInputLastName";
import UserInputPhone from "../../components/form-inputs/UserInputPhone";
import DeleteDialog from "../../components/DeleteDialog";
import ValidationMessage from "../../components/ValidationMessage";
import ErrorMessage from "../../components/ErrorMessage";

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
    const dispatch = useDispatch();

    useEffect(() => {
        !token && navigate("/login");
    }, [token, navigate]);

    const userId = useSelector(selectUserId);
    const prevEmail = useSelector(selectUserEmail);
    const prevFirstName = useSelector(selectUserFirstName);
    const prevLastName = useSelector(selectUserLastName);
    const prevPhone = useSelector(selectUserPhone);

    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const leftCellStyle = {
        width: "45%",
        textAlign: "right",
        fontWeight: "700",
    };

    const handleUpdateUser = () => {
        setNewEmail(prevEmail);
        setNewFirstName(prevFirstName);
        setNewLastName(prevLastName);
        setNewPhone(prevPhone);
        setErrorMessage("");
        setValidationMessage("");
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    const handleDelete = () => {
        setErrorMessage("");
        setValidationMessage("");
        setShowUpdateForm(false);
        setShowDialog(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            newEmail === prevEmail &&
            newFirstName === prevFirstName &&
            newLastName === prevLastName &&
            newPhone === prevPhone
        ) {
            setShowUpdateForm(false);
            return;
        }

        try {
            fetch(`/API/user/${userId}`, {
                method: "PUT",
                headers: {
                    authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: newEmail,
                    firstName: newFirstName,
                    lastName: newLastName,
                    phone: newPhone,
                }),
            });
            dispatch(setUserEmail(newEmail));
            dispatch(setUserFirstName(newFirstName));
            dispatch(setUserLastName(newLastName));
            dispatch(setUserPhone(newPhone));
            setShowUpdateForm(false);
            setValidationMessage(true);
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
                {validationMessage && (
                    <ValidationMessage text="Profil mis à jour." />
                )}
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Adresse e-mail :
                                </TableCell>
                                <TableCell>{prevEmail}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>{prevFirstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>{prevLastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Numéro de téléphone :
                                </TableCell>
                                <TableCell>{prevPhone}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        mt: ".5rem",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                    <Button
                        variant={showUpdateForm ? "outlined" : "contained"}
                        onClick={handleUpdateUser}
                        color="secondary">
                        Modifier
                    </Button>
                    <Button
                        color="warning"
                        sx={{ textTransform: "initial" }}
                        onClick={handleDelete}>
                        Supprimer le compte
                    </Button>
                    {showDialog && (
                        <DeleteDialog
                            userId={userId}
                            showDialog={showDialog}
                            setShowDialog={setShowDialog}
                            setErrorMessage={setErrorMessage}
                        />
                    )}
                </Box>
            </Box>
            <Collapse in={showUpdateForm}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    maxWidth={theme.maxWidth.form}
                    margin="auto">
                    <UserInputEmail email={newEmail} setEmail={setNewEmail} />

                    <UserInputFirstName
                        firstName={newFirstName}
                        setFirstName={setNewFirstName}
                    />

                    <UserInputLastName
                        lastName={newLastName}
                        setLastName={setNewLastName}
                    />

                    <UserInputPhone phone={newPhone} setPhone={setNewPhone} />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary">
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </>
    );
};

export default Profile;
