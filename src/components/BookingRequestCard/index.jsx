import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import API_BASE_URI from "../../config/API";

import {
    selectUserFirstName,
    selectUserId,
    selectUserLastName,
} from "../../features/user/userSlice";

import { getOneUser } from "../../utils/user";

import theme from "../../styles/theme";
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
    const userFirstName = useSelector(selectUserFirstName);
    const userLastName = useSelector(selectUserLastName);

    const [requestStatus, setRequestStatus] = useState(request.status);
    const [personLink, setPersonLink] = useState(null);
    const [bookingCardButtons, setBookingCardButtons] = useState(null);

    const handleAccept = async () => {
        // Update request status to "accepted"
        try {
            const response = await fetch(
                `${API_BASE_URI}/API/bookingRequests/${request._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        newRequestStatus: "accepted",
                        driverName: `${userFirstName}${
                            userFirstName && userLastName ? " " : ""
                        }${userLastName}`,
                        candidateEmail: request.candidateEmail,
                        departure: request.departure,
                        destination: request.destination,
                        formatedDate,
                    }),
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
            const response = await fetch(
                `${API_BASE_URI}/API/rides/${request.rideId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ newPassenger: request.candidateId }),
                }
            );
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
                `${API_BASE_URI}/API/bookingRequests/${request._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `BEARER ${token}`,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        newRequestStatus: "rejected",
                        driverName: `${userFirstName}${
                            userFirstName && userLastName ? " " : ""
                        }${userLastName}`,
                        candidateEmail: request.candidateEmail,
                        departure: request.departure,
                        destination: request.destination,
                        formatedDate,
                    }),
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
                userId === request.driverId
                    ? setBookingCardButtons(
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
                      )
                    : setBookingCardButtons(
                          <Typography>Demande en cours...</Typography>
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
    }, [requestStatus, userId, request.driverId]);

    useEffect(() => {
        if (userId === request.candidateId) {
            getOneUser(request.driverId)
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
        if (userId === request.driverId) {
            setPersonLink(
                <>
                    <Typography fontSize=".9rem">Passager : </Typography>
                    <Link
                        component={RouterLink}
                        to={`/users/${request.candidateId}`}>
                        {`${request.candidateFirstName} ${request.candidateLastName}`}
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
                width: "100%",
                maxWidth: theme.maxWidth.bookingCard,
                padding: ".5rem",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "center" },
                justifyContent: "space-between",
                gap: {
                    xs: "2rem",
                    sm: "0",
                },
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
                    {`Départ le ${formatedDate}`}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                {personLink}
            </Box>
            <Box sx={{ display: "flex", gap: ".5rem" }}>
                {bookingCardButtons}
            </Box>
        </Box>
    );
};

export default BookingRequestCard;
