import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { selectUserId } from "../../features/user/userSlice";

import { getOneUser } from "../../utils/user";

import DialogRideUpdate from "../DialogRideUpdate";
import DialogRideDelete from "../DialogRideDelete";

import {
    Card,
    CardHeader,
    CardContent,
    Button,
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

    const userId = useSelector(selectUserId);

    const [driver, setDriver] = useState({});
    const [formatedDate, setFormatedDate] = useState("");
    const [showDialogRideUpdate, setShowDialogRideUpdate] = useState(false);
    const [showDialogRideDelete, setShowDialogRideDelete] = useState(false);

    const handleBookRide = () => {
        // if not logged in, dialog (se connecter / créer un compte / annuler)
    };

    const handleEditRide = () => {
        setShowDialogRideUpdate(true);
    };

    const handleDeleteRide = () => {
        setShowDialogRideDelete(true);
    };

    useEffect(() => {
        getOneUser(ride.driverId)
            .then((driverData) => setDriver(driverData))
            .catch((error) => console.log(error));
    }, [ride]);

    useEffect(() => {
        const date = dayjs(ride.departureDate);
        const day = `${date.$D < 10 ? 0 : ""}${date.$D}/${
            date.$M + 1 < 10 ? 0 : ""
        }${date.$M + 1}/${date.$y}`;
        const time = `${date.$H}h${date.$m < 10 ? 0 : ""}${date.$m}`;

        setFormatedDate(`Départ le ${day} à ${time}`);
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
                subheader={formatedDate}
                action={
                    <>
                        {ride.driverId === userId && (
                            <>
                                <IconButton
                                    color="secondary"
                                    onClick={handleEditRide}
                                    id={ride._id}>
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={handleDeleteRide}
                                    id={ride._id}>
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                        {ride.driverId !== userId && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBookRide}>
                                Réserver
                            </Button>
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
                    {driver._id !== userId && (
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
                <DialogRideUpdate
                    prevRideData={{
                        id: ride._id,
                        departure: ride.departure,
                        destination: ride.destination,
                        departureDate: ride.departureDate,
                        totalSeats: ride.totalSeats,
                        passengers: ride.passengers,
                    }}
                    showDialogRideUpdate={showDialogRideUpdate}
                    setShowDialogRideUpdate={setShowDialogRideUpdate}
                />
                <DialogRideDelete
                    rideId={ride._id}
                    showDialogRideDelete={showDialogRideDelete}
                    setShowDialogRideDelete={setShowDialogRideDelete}
                />
            </CardContent>
        </Card>
    );
};

export default RideCard;
