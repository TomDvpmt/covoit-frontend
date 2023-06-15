import { useState, useEffect } from "react";

import ConversationCard from "../../components/ConversationCard";
import Loader from "../../components/Loader";
import ValidationMessage from "../../components/ValidationMessage";

import { Box, Typography } from "@mui/material";

const Conversations = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    const [isLoading, setIsLoading] = useState(true);
    const [conversationsData, setConversationsData] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [showConversationDeleteDialog, setShowConversationDeleteDialog] =
        useState(false);
    const [validationMessage, setValidationMessage] = useState("");

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
                            <ConversationCard
                                key={index}
                                conversation={conversation}
                                interlocutorName={interlocutorName}
                                interlocutorId={interlocutorId}
                                setConversationsData={setConversationsData}
                                showConversationDeleteDialog={
                                    showConversationDeleteDialog
                                }
                                setShowConversationDeleteDialog={
                                    setShowConversationDeleteDialog
                                }
                                setValidationMessage={setValidationMessage}
                            />
                        );
                    });
            })
        )
            .then((data) => setConversations(data))
            .catch((error) => console.log(error));
    }, [conversationsData, showConversationDeleteDialog, userId]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    component="section"
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
                        <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap="1rem">
                            {conversations}
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
};

export default Conversations;
