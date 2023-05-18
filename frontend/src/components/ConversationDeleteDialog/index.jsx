import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

import PropTypes from "prop-types";

const ConversationDeleteDialog = ({
    setConversationsData,
    conversationId,
    showConversationDeleteDialog,
    setShowConversationDeleteDialog,
    setValidationMessage,
}) => {
    ConversationDeleteDialog.propTypes = {
        setConversationsData: PropTypes.func.isRequired,
        conversationId: PropTypes.string.isRequired,
        showConversationDeleteDialog: PropTypes.bool.isRequired,
        setShowConversationDeleteDialog: PropTypes.func.isRequired,
        setValidationMessage: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");

    const handleYes = async () => {
        try {
            const response = await fetch(
                `/API/conversations/${conversationId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `BEARER ${token}`,
                    },
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            setConversationsData((conversations) =>
                conversations.filter(
                    (conversation) => conversation._id !== conversationId
                )
            );
            setValidationMessage("Conversation supprimée.");
            setShowConversationDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNo = () => {
        setShowConversationDeleteDialog(false);
    };

    return (
        <Dialog open={showConversationDeleteDialog}>
            <DialogTitle>
                Êtes-vous sûr de vouloir supprimer cette conversation ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cette opération est irréversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleYes} color="warning">
                    Supprimer la conversation
                </Button>
                <Button
                    autoFocus
                    onClick={handleNo}
                    color="primary"
                    variant="text">
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConversationDeleteDialog;
