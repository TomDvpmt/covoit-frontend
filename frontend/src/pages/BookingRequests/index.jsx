import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";

import BookingRequestCard from "../../components/BookingRequestCard";

import { getFormatedDate } from "../../utils/helpers";
import dayjs from "dayjs";

import { Box, Typography } from "@mui/material";

const BookingRequests = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const [incomingBookingRequests, setIncomingBookingRequests] = useState([]);
    const [sentBookingRequests, setSentBookingRequests] = useState([]);

    // Get incoming & sent booking requests for current user
    useEffect(() => {
        fetch("/API/bookingRequests", {
            headers: {
                Authorization: `BEARER ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setIncomingBookingRequests(
                    data
                        .filter((request) => request.driverId === userId)
                        .map((request) => {
                            const date = dayjs(request.departureDate);
                            const formatedDate = getFormatedDate(date);

                            return (
                                <BookingRequestCard
                                    key={request._id}
                                    request={request}
                                    formatedDate={formatedDate}
                                />
                            );
                        })
                );
                setSentBookingRequests(
                    data
                        .filter((request) => request.candidateId === userId)
                        .map((request) => {
                            const date = dayjs(request.departureDate);
                            const formatedDate = getFormatedDate(date);

                            return (
                                <BookingRequestCard
                                    key={request._id}
                                    request={request}
                                    formatedDate={formatedDate}
                                />
                            );
                        })
                );
            })
            .catch((error) => console.log(error));
    }, [userId, token]);

    const requestsListStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
    };

    return (
        <>
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Demandes reçues
                </Typography>
                <Box sx={requestsListStyle}>{incomingBookingRequests}</Box>
            </Box>
            <Box component="section">
                <Typography component="h2" variant="h2">
                    Demandes envoyées
                </Typography>
            </Box>
            <Box sx={requestsListStyle}>{sentBookingRequests}</Box>
        </>
    );
};

export default BookingRequests;
