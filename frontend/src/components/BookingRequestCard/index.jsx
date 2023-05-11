import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";

import { getOneUser } from "../../utils/user";

import { Box, Typography, Button, Link } from "@mui/material";
import { TrendingFlat, Check, Close } from "@mui/icons-material";

import PropTypes from "prop-types";

const BookingRequestCard = ({ request, formatedDate }) => {
    BookingRequestCard.propTypes = {
        request: PropTypes.object.isRequired,
        formatedDate: PropTypes.string.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const [requestStatus, setRequestStatus] = useState(request.status);
    const [personLink, setPersonLink] = useState(null);
    const [bookingCardButtons, setBookingCardButtons] = useState(null);

    const handleAccept = async () => {
        // Update request status to "accepted"
        try {
            const response = await fetch(
                `/API/bookingRequests/${request._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ newRequestStatus: "accepted" }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error);
        }

        // Add the request's author to ride's passengers list
        try {
            const response = await fetch(`/API/rides/${request.rideId}`, {
                method: "PUT",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({ newPassenger: request.authorId }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            setRequestStatus("accepted");
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefuse = async () => {
        // Update request status to "rejected"
        try {
            const response = await fetch(
                `/API/bookingRequests/${request._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ newRequestStatus: "rejected" }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            setRequestStatus("rejected");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        switch (requestStatus) {
            case "pending":
                setBookingCardButtons(
                    <>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleAccept}>
                            Accepter
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={handleRefuse}>
                            Refuser
                        </Button>
                    </>
                );
                break;
            case "accepted":
                setBookingCardButtons(
                    <>
                        <Check color="secondary" />
                        <Typography>Demande acceptée !</Typography>
                    </>
                );
                break;
            case "rejected":
                setBookingCardButtons(
                    <>
                        <Close color="warning" />
                        <Typography>Demande rejetée.</Typography>
                    </>
                );
                break;
            default:
                setBookingCardButtons(null);
        }
    }, [requestStatus]);

    useEffect(() => {
        if (userId === request.authorId) {
            getOneUser(request.recipientId)
                .then((driver) =>
                    setPersonLink(
                        <>
                            <Typography fontSize=".9rem">
                                Conducteur :{" "}
                            </Typography>
                            <Link
                                component={RouterLink}
                                to={`/users/${driver._id}`}>
                                {`${driver.firstName} ${driver.lastName}`}
                            </Link>
                        </>
                    )
                )
                .catch((error) => console.log(error));
        }
        if (userId === request.recipientId) {
            setPersonLink(
                <>
                    <Typography fontSize=".9rem">Passager : </Typography>
                    <Link
                        component={RouterLink}
                        to={`/users/${request.authorId}`}>
                        {`${request.authorFirstName} ${request.authorLastName}`}
                    </Link>
                </>
            );
        }
    }, []);

    return (
        <Box
            key={request._id}
            sx={{
                border: "1px solid black",
                padding: ".5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        "& > *": {
                            fontWeight: "700",
                        },
                    }}>
                    <Typography component="span">
                        {request.departure}
                    </Typography>
                    <TrendingFlat />
                    <Typography component="span">
                        {request.destination}
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: ".9rem" }}>
                    {formatedDate}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                {personLink}
                {/* <Typography fontSize=".9rem">Passager : </Typography>
                <Link component={RouterLink} to={`/users/${request.authorId}`}>
                    {`${request.authorFirstName} ${request.authorLastName}`}
                </Link> */}
            </Box>
            <Box sx={{ display: "flex", gap: ".5rem" }}>
                {bookingCardButtons}
            </Box>
        </Box>
    );
};

export default BookingRequestCard;
