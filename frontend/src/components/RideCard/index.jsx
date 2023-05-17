import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { selectUserId } from "../../features/user/userSlice";

import { getOneUser } from "../../utils/user";
import { getFormatedDate } from "../../utils/helpers";

import RideBookingButton from "../RideBookingButton";
import RideUpdateDialog from "../RideUpdateDialog";
import RideDeleteDialog from "../RideDeleteDialog";

import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Box,
    Link,
} from "@mui/material";
import {
    Edit,
    Delete,
    AirlineSeatReclineExtra,
    TrendingFlat,
    PeopleAlt,
    PeopleAltOutlined,
} from "@mui/icons-material";
import theme from "../../styles/theme";

import PropTypes from "prop-types";

import dayjs from "dayjs";

const RideCard = ({ ride }) => {
    RideCard.propTypes = {
        ride: PropTypes.object.isRequired,
    };

    const rideId = ride._id;
    const driverId = ride.driverId;

    const userId = useSelector(selectUserId);

    const [driver, setDriver] = useState({});
    const [formatedDate, setFormatedDate] = useState("");
    const [showRideUpdateDialog, setShowRideUpdateDialog] = useState(false);
    const [showRideDeleteDialog, setShowRideDeleteDialog] = useState(false);

    const handleEditRide = () => {
        setShowRideUpdateDialog(true);
    };

    const handleDeleteRide = () => {
        setShowRideDeleteDialog(true);
    };

    useEffect(() => {
        getOneUser(driverId)
            .then((driverData) => setDriver(driverData))
            .catch((error) => console.log(error));
    }, [ride, driverId]);

    useEffect(() => {
        const date = dayjs(ride.departureDate);
        setFormatedDate(getFormatedDate(date));
    }, [ride]);

    return (
        <Card sx={{ flexGrow: "1" }}>
            <CardHeader
                title={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                        }}>
                        {ride.departure}
                        <TrendingFlat />
                        {ride.destination}
                    </Box>
                }
                titleTypographyProps={{
                    alignItems: "center",
                    color: theme.palette.primary.main,
                }}
                subheader={`Départ le ${formatedDate}`}
                action={
                    <>
                        {driverId === userId && (
                            <>
                                <IconButton
                                    color="secondary"
                                    onClick={handleEditRide}
                                    id={rideId}>
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={handleDeleteRide}
                                    id={rideId}>
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                        {driverId !== userId && (
                            <RideBookingButton ride={ride} />
                        )}
                    </>
                }
            />
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".5rem",
                    }}>
                    {driverId !== userId && (
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}>
                            <AirlineSeatReclineExtra />

                            <Typography
                                component="span"
                                fontWeight="700"
                                color="primary">
                                Conducteur :{" "}
                            </Typography>
                            {driver && (
                                <Link
                                    component={RouterLink}
                                    to={`/users/${driver._id}`}>{`${
                                    driver.firstName
                                }${
                                    driver.firstName && driver.lastName
                                        ? " "
                                        : ""
                                }${driver.lastName}`}</Link>
                            )}
                        </Typography>
                    )}

                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}>
                        <PeopleAlt />
                        <Typography
                            component="span"
                            fontWeight="700"
                            color="primary">
                            Passagers :{" "}
                        </Typography>
                        <Typography component="span">
                            {ride.passengers.length}
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}>
                        <PeopleAltOutlined />
                        <Typography
                            component="span"
                            fontWeight="700"
                            color="primary">
                            Places disponibles :{" "}
                        </Typography>
                        <Typography component="span">
                            {ride.totalSeats - ride.passengers.length}
                        </Typography>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography component="span" variant="h4">
                        {ride.price} €
                    </Typography>
                    <Typography>par passager</Typography>
                </Box>

                <RideUpdateDialog
                    prevRideData={{
                        id: rideId,
                        departure: ride.departure,
                        destination: ride.destination,
                        departureDate: ride.departureDate,
                        totalSeats: ride.totalSeats,
                        passengers: ride.passengers,
                    }}
                    showRideUpdateDialog={showRideUpdateDialog}
                    setShowRideUpdateDialog={setShowRideUpdateDialog}
                />
                <RideDeleteDialog
                    rideId={rideId}
                    showRideDeleteDialog={showRideDeleteDialog}
                    setShowRideDeleteDialog={setShowRideDeleteDialog}
                />
            </CardContent>
        </Card>
    );
};

export default RideCard;
