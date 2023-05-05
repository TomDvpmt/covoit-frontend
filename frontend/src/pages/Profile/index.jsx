import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    setUserEmail,
    setUserFirstName,
    setUserLastName,
    setUserPhone,
    selectUserId,
    selectUserEmail,
    selectUserFirstName,
    selectUserLastName,
    selectUserPhone,
} from "../../features/user/userSlice";
import {
    setUpdateUserErrorMessage,
    selectUpdateUserErrorMessage,
    setDeleteUserErrorMessage,
} from "../../features/error/errorSlice";

import UserInputEmail from "../../components/form-inputs/UserInputEmail";
import UserInputFirstName from "../../components/form-inputs/UserInputFirstName";
import UserInputLastName from "../../components/form-inputs/UserInputLastName";
import UserInputPhone from "../../components/form-inputs/UserInputPhone";
import DialogUserDelete from "../../components/DialogUserDelete";
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
    Dialog,
    DialogContent,
    DialogTitle,
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

    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");

    const updateUserErrorMessage = useSelector(selectUpdateUserErrorMessage);

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
        setValidationMessage("");
        dispatch(setUpdateUserErrorMessage(""));
        setShowUpdateDialog((showUpdateDialog) => !showUpdateDialog);
    };

    const handleDelete = () => {
        setValidationMessage("");
        dispatch(setDeleteUserErrorMessage(""));
        setShowUpdateDialog(false);
        setShowDeleteDialog(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            newEmail === prevEmail &&
            newFirstName === prevFirstName &&
            newLastName === prevLastName &&
            newPhone === prevPhone
        ) {
            setShowUpdateDialog(false);
            return;
        }

        try {
            const response = await fetch(`/API/users/${userId}`, {
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
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            dispatch(setUserEmail(newEmail));
            dispatch(setUserFirstName(newFirstName));
            dispatch(setUserLastName(newLastName));
            dispatch(setUserPhone(newPhone));
            setShowUpdateDialog(false);
            setValidationMessage(true);
        } catch (error) {
            console.error(error);
            dispatch(setUpdateUserErrorMessage(error.message));
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
                        variant={showUpdateDialog ? "outlined" : "contained"}
                        onClick={handleUpdateUser}
                        color="secondary">
                        Modifier
                    </Button>
                    <Button
                        sx={{ textTransform: "initial" }}
                        onClick={handleDelete}>
                        Supprimer le compte
                    </Button>
                    {showDeleteDialog && (
                        <DialogUserDelete
                            userId={userId}
                            showDeleteDialog={showDeleteDialog}
                            setShowDeleteDialog={setShowDeleteDialog}
                        />
                    )}
                </Box>
            </Box>
            <Dialog open={showUpdateDialog}>
                <DialogTitle>
                    Mise à jour des informations du compte
                </DialogTitle>
                <DialogContent>
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: ".5rem",
                        }}>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}>
                            Enregistrer
                        </Button>
                        <Button
                            type="button"
                            variant="text"
                            color="secondary"
                            onClick={() => setShowUpdateDialog(false)}>
                            Annuler
                        </Button>
                    </Box>
                    {updateUserErrorMessage && (
                        <ErrorMessage errorMessage={updateUserErrorMessage} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Profile;
