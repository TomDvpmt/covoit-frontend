import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    selectUserId,
    selectUserIsLoggedIn,
} from "../../features/user/userSlice";
import {
    setBookRideErrorMessage,
    selectBookRideErrorMessage,
} from "../../features/error/errorSlice";

import LoginDialog from "../LoginDialog";
import ErrorMessage from "../ErrorMessage";

import { Button } from "@mui/material";

import PropTypes from "prop-types";

const RideBookButton = ({ ride }) => {
    RideBookButton.propTypes = {
        ride: PropTypes.object.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const userId = useSelector(selectUserId);

    const rideId = ride._id;
    const driverId = ride.driverId;
    const bookRideErrorMessage = useSelector(selectBookRideErrorMessage);

    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [bookingRequestStatus, setBookingRequestStatus] = useState(""); // use Redux state instead (in state.user.rides.passenger)

    // Get the card's booking request status for this user
    useEffect(() => {
        //LOADER TO BE ADDED

        if (!isLoggedIn) {
            return;
        }

        fetch("/API/bookingRequests/", {
            method: "POST",
            headers: {
                authorization: `BEARER ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                authorId: userId,
                rideId: rideId,
            }),
        })
            .then((response) => response.json())
            .then((bookingRequest) =>
                setBookingRequestStatus(bookingRequest.status)
            )
            .catch((error) => {
                console.error(error);
                setBookRideErrorMessage(error.message);
            });
    }, [token, isLoggedIn, userId, rideId]);

    // Create a booking request
    const handleRideBookingRequest = async () => {
        setBookRideErrorMessage("");

        if (!isLoggedIn) {
            setShowLoginDialog(true);
            return;
        }

        try {
            const response = await fetch("/API/bookingRequests/create", {
                method: "POST",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    authorId: userId,
                    recipientId: driverId,
                    rideId: rideId,
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            // trigger card re-rendering
        } catch (error) {
            console.error(error);
            setBookRideErrorMessage(error.message);
        }
    };

    return (
        <>
            {bookingRequestStatus ? (
                <Button variant="contained" disabled>
                    {bookingRequestStatus === "pending" &&
                        "En attente de réponse..."}
                    {bookingRequestStatus === "accepted" && "Réservé !"}
                    {bookingRequestStatus === "rejected" && "Demande rejetée"}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRideBookingRequest}>
                    Réserver
                </Button>
            )}
            {bookRideErrorMessage && (
                <ErrorMessage errorMessage={bookRideErrorMessage} />
            )}
            <LoginDialog
                showLoginDialog={showLoginDialog}
                setShowLoginDialog={setShowLoginDialog}
                actionAfterLogin={handleRideBookingRequest}
            />
        </>
    );
};

export default RideBookButton;
