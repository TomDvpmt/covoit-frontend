import { Link as RouterLink } from "react-router-dom";

import ConversationDeleteDialog from "../ConversationDeleteDialog";

import theme from "../../styles/theme";
import {
    Box,
    Paper,
    Link,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const ConversationCard = ({
    conversation,
    interlocutorId,
    interlocutorName,
    setConversationsData,
    showConversationDeleteDialog,
    setShowConversationDeleteDialog,
    setValidationMessage,
}) => {
    const conversationId = conversation._id;
    const nbOfMessages = conversation.messages.length;

    const handleDelete = () => {
        setShowConversationDeleteDialog(true);
    };

    return (
        <Box
            component="article"
            width="100%"
            maxWidth={theme.maxWidth.conversationCard}>
            <Paper
                sx={{
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr auto",
                    },
                    alignItems: "center",
                }}>
                <Typography
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "row", sm: "column", md: "row" },
                        gap: ".5rem",
                    }}>
                    <Typography component="span">Avec :</Typography>
                    <Link
                        component={RouterLink}
                        to={`/users/${interlocutorId}`}>
                        {interlocutorName}
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "row", sm: "column", md: "row" },
                        gap: ".5rem",
                    }}>
                    <Typography>Nombre de messages :</Typography>
                    <Typography>{nbOfMessages}</Typography>
                </Typography>
                <Box
                    mt={{ xs: "2rem", sm: "0" }}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="flex-end"
                    gap="1rem">
                    <Button
                        component={RouterLink}
                        variant="contained"
                        color="secondary"
                        to={`/conversations/${conversationId}`}>
                        Voir
                    </Button>
                    <IconButton variant="text" onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    <ConversationDeleteDialog
                        setConversationsData={setConversationsData}
                        conversationId={conversationId}
                        showConversationDeleteDialog={
                            showConversationDeleteDialog
                        }
                        setShowConversationDeleteDialog={
                            setShowConversationDeleteDialog
                        }
                        setValidationMessage={setValidationMessage}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default ConversationCard;
