import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";
import { selectPageLocation } from "../../features/page/pageSlice";
import {
    setMessageCreateErrorMessage,
    selectMessageCreateErrorMessage,
} from "../../features/error/errorSlice";

import MessageInputContent from "../form-inputs/MessageInputContent";
import ErrorMessage from "../ErrorMessage";

import BASE_API_URL from "../../utils/API";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
} from "@mui/material";

import PropTypes from "prop-types";

const MessageCreateDialog = ({
    showMessageCreateDialog,
    setShowMessageCreateDialog,
    profileFirstName,
    profileLastName,
    recipientId,
}) => {
    MessageCreateDialog.propTypes = {
        showMessageCreateDialog: PropTypes.bool.isRequired,
        setShowMessageCreateDialog: PropTypes.func.isRequired,
        profileFirstName: PropTypes.string.isRequired,
        profileLastName: PropTypes.string.isRequired,
        recipientId: PropTypes.string.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);
    const page = useSelector(selectPageLocation);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendMessageErrorMessage = useSelector(
        selectMessageCreateErrorMessage
    );

    const [content, setContent] = useState("");

    const handleMessageCreateSubmit = async (e) => {
        e.preventDefault();

        const date = Date.now();
        const messageToCreate = {
            date,
            senderId: userId,
            recipientId,
            content,
        };

        try {
            // get all user's conversations
            const getAllConversationsResponse = await fetch(
                `${BASE_API_URL}/API/conversations`,
                {
                    headers: {
                        Authorization: `BEARER ${token}`,
                    },
                }
            );

            const getAllConversationsData =
                await getAllConversationsResponse.json();

            if (!getAllConversationsResponse.ok) {
                throw new Error(getAllConversationsData.message);
            }

            const allConversations = getAllConversationsData.filter(
                (conversation) => conversation.users.includes(userId)
            );

            // if user/recipient conversation doesn't exist yet, create conversation with first message
            if (
                !allConversations.find((conversation) =>
                    conversation.users.includes(recipientId)
                )
            ) {
                const createConversationResponse = await fetch(
                    `${BASE_API_URL}/API/conversations`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `BEARER ${token}`,
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            users: [userId, recipientId],
                            messages: [messageToCreate],
                        }),
                    }
                );

                const createConversationData =
                    await createConversationResponse.json();

                if (!createConversationResponse.ok) {
                    throw new Error(createConversationData.message);
                }

                const conversationId = createConversationData.conversation._id;
                navigate(`/conversations/${conversationId}`);
                setShowMessageCreateDialog(false);

                return;
            }

            // else, if user/recipient conversation already exists, update it by adding message
            const withRecipientConversation = allConversations.find(
                (conversation) => conversation.users.includes(recipientId)
            );
            const conversationId = withRecipientConversation._id;
            const addMessageResponse = await fetch(
                `${BASE_API_URL}/API/conversations/${conversationId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(messageToCreate),
                }
            );

            if (!addMessageResponse.ok) {
                const addMessageData = await addMessageResponse.json();
                throw new Error(addMessageData.message);
            }

            setShowMessageCreateDialog(false);
            navigate(`/conversations/${conversationId}`);
        } catch (error) {
            console.error(error);
            setMessageCreateErrorMessage(error.message);
        }
    };

    return (
        <Dialog open={showMessageCreateDialog}>
            <DialogTitle>
                Envoyer un message à{" "}
                {`${profileFirstName}${
                    profileFirstName && profileLastName ? " " : ""
                }${profileLastName}`}
            </DialogTitle>
            <Box component="form" onSubmit={handleMessageCreateSubmit}>
                <DialogContent>
                    <MessageInputContent
                        content={content}
                        setContent={setContent}
                    />
                </DialogContent>
                {sendMessageErrorMessage && (
                    <ErrorMessage errorMessage={sendMessageErrorMessage} />
                )}
                <DialogActions sx={{ mb: "1rem" }}>
                    <Button variant="contained" type="submit">
                        Envoyer
                    </Button>
                    <Button
                        type="button"
                        variant="text"
                        onClick={() => setShowMessageCreateDialog(false)}>
                        Annuler
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default MessageCreateDialog;
