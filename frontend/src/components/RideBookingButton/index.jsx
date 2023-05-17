import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    selectUserId,
    selectUserIsLoggedIn,
    selectUserEmail,
    selectUserFirstName,
    selectUserLastName,
} from "../../features/user/userSlice";
import {
    setBookRideErrorMessage,
    selectBookRideErrorMessage,
} from "../../features/error/errorSlice";

import { getOneUser } from "../../utils/user";

import LoginDialog from "../LoginDialog";
import ErrorMessage from "../ErrorMessage";

import { Button } from "@mui/material";

import PropTypes from "prop-types";

const RideBookingButton = ({ ride }) => {
    RideBookingButton.propTypes = {
        ride: PropTypes.object.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const userId = useSelector(selectUserId);
    const userFirstName = useSelector(selectUserFirstName);
    const userLastName = useSelector(selectUserLastName);
    const userEmail = useSelector(selectUserEmail);

    const rideId = ride._id;
    const driverId = ride.driverId;
    const bookRideErrorMessage = useSelector(selectBookRideErrorMessage);

    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [bookingRequestStatus, setBookingRequestStatus] = useState(""); // use Redux state instead (in state.user.rides.passenger)
    const [bookButtonLabel, setBookButtonLabel] = useState("");
    const [driverFirstName, setDriverFirstName] = useState("");
    const [driverLastName, setDriverLastName] = useState("");
    const [driverEmail, setDriverEmail] = useState("");

    // Get the ride's driver info
    useEffect(() => {
        getOneUser(driverId)
            .then((driver) => {
                setDriverFirstName(driver.firstName);
                setDriverLastName(driver.lastName);
                setDriverEmail(driver.email);
            })
            .catch((error) => console.error(error));
    }, [driverId]);

    // Get the ride's booking request status for this user
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
                candidateId: userId,
                rideId: rideId,
            }),
        })
            .then((response) => response.json())
            .then(
                (bookingRequest) =>
                    bookingRequest &&
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
                    candidateId: userId,
                    candidateFirstName: userFirstName,
                    candidateLastName: userLastName,
                    candidateEmail: userEmail,
                    driverId,
                    driverFirstName,
                    driverLastName,
                    driverEmail,
                    rideId,
                    departure: ride.departure,
                    destination: ride.destination,
                    departureDate: ride.departureDate,
                }),
            });
            setBookingRequestStatus("pending");
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error);
            setBookRideErrorMessage(error.message);
        }
    };

    // Display new booking status if it changes
    useEffect(() => {
        switch (bookingRequestStatus) {
            case "pending":
                setBookButtonLabel("En attente de réponse...");
                break;
            case "accepted":
                setBookButtonLabel("Réservé !");
                break;
            case "rejected":
                setBookButtonLabel("Demande rejetée");
                break;
            default:
                setBookButtonLabel("Indisponible");
        }
    }, [bookingRequestStatus]);

    return (
        <>
            {bookingRequestStatus ? (
                <Button variant="contained" disabled>
                    {bookButtonLabel}
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

export default RideBookingButton;
