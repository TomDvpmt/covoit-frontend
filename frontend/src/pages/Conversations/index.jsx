import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Loader from "../../components/Loader";
import ConversationDeleteDialog from "../../components/ConversationDeleteDialog";
import ValidationMessage from "../../components/ValidationMessage";

import { Box, Paper, IconButton, Link, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Conversations = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    const [isLoading, setIsLoading] = useState(true);
    const [conversationsData, setConversationsData] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [showConversationDeleteDialog, setShowConversationDeleteDialog] =
        useState(false);
    const [validationMessage, setValidationMessage] = useState("");

    const handleDelete = () => {
        setShowConversationDeleteDialog(true);
    };

    // Get conversations' data
    useEffect(() => {
        setValidationMessage("");
        setIsLoading(true);

        fetch("/API/conversations", {
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setConversationsData(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }, [token]);

    // Set conversations' elements
    useEffect(() => {
        Promise.all(
            conversationsData?.map(async (conversation, index) => {
                const conversationId = conversation._id;
                const nbOfMessages = conversation.messages.length;
                const interlocutorId = conversation.users.find(
                    (id) => id !== userId
                );

                return fetch(`/API/users/${interlocutorId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const interlocutorName = `${data.firstName}${
                            data.firstName && data.lastName ? " " : ""
                        }${data.lastName}`;
                        return (
                            <Box key={index} component="article">
                                <Paper
                                    sx={{
                                        width: "500px",
                                        padding: "1rem",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 50px",
                                        alignItems: "center",
                                    }}>
                                    <Link
                                        component={RouterLink}
                                        to={`/users/${interlocutorId}`}>
                                        {interlocutorName}
                                    </Link>
                                    <Link
                                        component={RouterLink}
                                        to={`/conversations/${conversationId}`}>
                                        {`${nbOfMessages} message${
                                            nbOfMessages > 1 ? "s" : ""
                                        }`}
                                    </Link>
                                    <IconButton
                                        variant="text"
                                        onClick={handleDelete}>
                                        <Delete />
                                    </IconButton>
                                    <ConversationDeleteDialog
                                        setConversationsData={
                                            setConversationsData
                                        }
                                        conversationId={conversationId}
                                        showConversationDeleteDialog={
                                            showConversationDeleteDialog
                                        }
                                        setShowConversationDeleteDialog={
                                            setShowConversationDeleteDialog
                                        }
                                        setValidationMessage={
                                            setValidationMessage
                                        }
                                    />
                                </Paper>
                            </Box>
                        );
                    });
            })
        )
            .then((data) => setConversations(data))
            .catch((error) => console.log(error));
    }, [conversationsData, showConversationDeleteDialog]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                    }}>
                    <Box sx={{ alignSelf: "start" }}>
                        {validationMessage && (
                            <ValidationMessage text={validationMessage} />
                        )}
                    </Box>
                    {conversations.length === 0 ? (
                        <Typography sx={{ alignSelf: "start" }}>
                            Aucune conversation à afficher.
                        </Typography>
                    ) : (
                        conversations
                    )}
                </Box>
            )}
        </>
    );
};

export default Conversations;
