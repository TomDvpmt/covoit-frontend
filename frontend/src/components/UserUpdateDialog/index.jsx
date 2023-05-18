import { useSelector } from "react-redux";

import { selectUpdateUserErrorMessage } from "../../features/error/errorSlice";

import UserInputEmail from "../form-inputs/UserInputEmail";
import UserInputFirstName from "../form-inputs/UserInputFirstName";
import UserInputLastName from "../form-inputs/UserInputLastName";
import UserInputPhone from "../form-inputs/UserInputPhone";
import ErrorMessage from "../ErrorMessage";

import { Dialog, DialogTitle, DialogContent, Box, Button } from "@mui/material";

const UserUpdateDialog = ({
    showUpdateDialog,
    setShowUpdateDialog,
    newEmail,
    setNewEmail,
    newFirstName,
    setNewFirstName,
    newLastName,
    setNewLastName,
    newPhone,
    setNewPhone,
}) => {
    const updateUserErrorMessage = useSelector(selectUpdateUserErrorMessage);

    const handleUpdateSubmit = () => {
        //
    };

    return (
        <Dialog open={showUpdateDialog}>
            <DialogTitle>Mise à jour des informations du compte</DialogTitle>
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
    );
};

export default UserUpdateDialog;
