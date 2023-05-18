import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

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
import UserDeleteDialog from "../../components/UserDeleteDialog";
import ValidationMessage from "../../components/ValidationMessage";
import MessageCreateDialog from "../../components/MessageCreateDialog";
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

    const profileUser = useLoaderData();
    const profileUserId = profileUser._id;
    const userId = useSelector(selectUserId);
    const isOwnProfile = profileUserId === userId;

    const profileFirstName = profileUser.firstName;
    const profileLastName = profileUser.lastName;
    const prevUserEmail = useSelector(selectUserEmail);
    const prevUserFirstName = useSelector(selectUserFirstName);
    const prevUserLastName = useSelector(selectUserLastName);
    const prevUserPhone = useSelector(selectUserPhone);

    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const [conversationId, setConversationId] = useState("");

    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showMessageCreateDialog, setShowMessageCreateDialog] =
        useState(false);
    const [validationMessage, setValidationMessage] = useState("");

    const updateUserErrorMessage = useSelector(selectUpdateUserErrorMessage);

    const leftCellStyle = {
        width: "45%",
        textAlign: "right",
        fontWeight: "700",
    };

    useEffect(() => {
        fetch(`/API/conversations/`, {
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const conversation = data.find((conversation) =>
                    conversation.users.includes(profileUserId)
                );
                setConversationId(conversation._id);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleUpdateUser = () => {
        setNewEmail(prevUserEmail);
        setNewFirstName(prevUserFirstName);
        setNewLastName(prevUserLastName);
        setNewPhone(prevUserPhone);
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

    const handleMessageCreate = () => {
        setShowMessageCreateDialog(true);
    };

    const handleSeeConversation = () => {
        navigate(`/conversations/${conversationId}`);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (
            newEmail === prevUserEmail &&
            newFirstName === prevUserFirstName &&
            newLastName === prevUserLastName &&
            newPhone === prevUserPhone
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
                            {isOwnProfile && (
                                <TableRow>
                                    <TableCell sx={leftCellStyle}>
                                        Adresse e-mail :
                                    </TableCell>
                                    <TableCell>{prevUserEmail}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>
                                    {isOwnProfile
                                        ? prevUserFirstName
                                        : profileFirstName}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>
                                    {isOwnProfile
                                        ? prevUserLastName
                                        : profileLastName}
                                </TableCell>
                            </TableRow>
                            {isOwnProfile && (
                                <TableRow>
                                    <TableCell sx={leftCellStyle}>
                                        Numéro de téléphone :
                                    </TableCell>
                                    <TableCell>{prevUserPhone}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {isOwnProfile ? (
                    <Box
                        sx={{
                            mt: ".5rem",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                        <Button
                            variant={
                                showUpdateDialog ? "outlined" : "contained"
                            }
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
                            <UserDeleteDialog
                                userId={userId}
                                showDeleteDialog={showDeleteDialog}
                                setShowDeleteDialog={setShowDeleteDialog}
                            />
                        )}
                    </Box>
                ) : (
                    <Box mt="1rem">
                        <Button
                            variant="contained"
                            onClick={
                                conversationId
                                    ? handleSeeConversation
                                    : handleMessageCreate
                            }
                            color="secondary">
                            {conversationId
                                ? "Voir la conversation"
                                : "Envoyer un message"}
                        </Button>
                    </Box>
                )}
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
                            onClick={handleUpdateSubmit}>
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
            <MessageCreateDialog
                showMessageCreateDialog={showMessageCreateDialog}
                setShowMessageCreateDialog={setShowMessageCreateDialog}
                profileFirstName={profileFirstName}
                profileLastName={profileLastName}
                recipientId={profileUserId}
            />
        </>
    );
};

export default Profile;
