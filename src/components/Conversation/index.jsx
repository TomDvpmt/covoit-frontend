import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";
import {
    setConversationErrorMessage,
    selectConversationErrorMessage,
} from "../../features/error/errorSlice";

import MessageInputContent from "../form-inputs/MessageInputContent";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { Box, Typography, Link, Button } from "@mui/material";

import theme from "../../styles/theme";

const Conversation = () => {
    const { conversationId } = useParams();
    const dispatch = useDispatch();
    const conversationErrorMessage = useSelector(
        selectConversationErrorMessage
    );
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const [interlocutorId, setInterlocutorId] = useState("");
    const [interlocutorName, setInterlocutorName] = useState("");
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetch(`/API/conversations/${conversationId}`, {
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMessages(data.messages);
                setInterlocutorId(data.users.find((id) => id !== userId));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setConversationErrorMessage(error.message));
            })
            .finally(() => setIsLoading(false));
    }, [conversationId, token]);

    useEffect(() => {
        interlocutorId &&
            fetch(`/API/users/${interlocutorId}`)
                .then((response) => response.json())
                .then((data) => {
                    const fullName = `${data.firstName}${
                        data.firstName && data.lastName ? " " : ""
                    }${data.lastName}`;
                    setInterlocutorName(fullName);
                })
                .catch((error) => {
                    console.error(error);
                });
    }, [interlocutorId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = Date.now();

        const messageToCreate = {
            date,
            senderId: userId,
            recipientId: interlocutorId,
            content,
        };

        try {
            const response = await fetch(
                `/API/conversations/${conversationId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(messageToCreate),
                }
            );

            if (!response.ok) {
                const addMessageData = await response.json();
                throw new Error(addMessageData.message);
            }

            setContent("");
            setMessages((messages) => [...messages, messageToCreate]);
        } catch (error) {
            console.error(error);
            dispatch(setConversationErrorMessage(error.message));
        }
    };

    return (
        <Box>
            {interlocutorName && (
                <Typography component="h1" variant="h1" align="center">
                    Conversation avec{" "}
                    <Link
                        component={RouterLink}
                        to={`/users/${interlocutorId}`}
                        underline="hover">
                        {interlocutorName}
                    </Link>
                </Typography>
            )}
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    sx={{
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    {messages
                        ?.sort((a, b) => a.date - b.date)
                        .map((message, index) => {
                            const nowDate = Date.now();
                            const messageDate = message.date;
                            const elapsedTime = Math.floor(
                                (nowDate - messageDate) / 1000 / 60
                            );
                            let formatedElapsedTime = elapsedTime;
                            switch (true) {
                                case elapsedTime === 0:
                                    formatedElapsedTime = "À l'instant";
                                    break;
                                case elapsedTime < 60:
                                    formatedElapsedTime = `${elapsedTime} min`;
                                    break;
                                case elapsedTime < 60 * 24:
                                    formatedElapsedTime = `${Math.floor(
                                        elapsedTime / 60
                                    )} h ${elapsedTime % 60} min`;
                                    break;
                                case elapsedTime < 60 * 24 * 365:
                                    formatedElapsedTime = `${Math.floor(
                                        elapsedTime / (60 * 24)
                                    )} j ${Math.floor(
                                        (elapsedTime % (60 * 24)) / 60
                                    )} h`;
                                    break;
                                case elapsedTime >= 60 * 24 * 365:
                                    const years = Math.floor(
                                        elapsedTime / (60 * 24 * 365)
                                    );
                                    formatedElapsedTime = `${years} an${
                                        years > 1 ? "s" : ""
                                    }`;
                                    break;
                                default:
                                    formatedElapsedTime = "";
                            }
                            const userIsSender = message.senderId === userId;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        width: "max-content",
                                        maxWidth: "80%",
                                        bgcolor: userIsSender
                                            ? theme.palette.secondary.light
                                            : "white",
                                        borderRadius: ".5rem",
                                        padding: ".5rem 1rem",
                                        textAlign: userIsSender
                                            ? "right"
                                            : "left",
                                    }}
                                    alignSelf={
                                        userIsSender ? "flex-end" : "flex-start"
                                    }>
                                    <Typography>{message.content}</Typography>
                                    <Typography
                                        fontSize=".8em"
                                        sx={{ opacity: ".6" }}>
                                        {formatedElapsedTime}
                                    </Typography>
                                </Box>
                            );
                        })}
                </Box>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                    alignItems: "flex-end",
                }}>
                <MessageInputContent
                    content={content}
                    setContent={setContent}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Envoyer
                </Button>
            </Box>
            {conversationErrorMessage && (
                <ErrorMessage errorMessage={conversationErrorMessage} />
            )}
        </Box>
    );
};

export default Conversation;
