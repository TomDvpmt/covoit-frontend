import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";

import UpdateRideForm from "../forms/UpdateRideForm";
import DeleteRideDialog from "../DeleteRideDialog";

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import PropTypes from "prop-types";

import dayjs from "dayjs";

const RideCard = ({ ride, type }) => {
    RideCard.propTypes = {
        ride: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
    };

    const userId = useSelector(selectUserId);

    const [formatedDate, setFormatedDate] = useState("");
    const [showUpdateRideForm, setShowUpdateRideForm] = useState(false);
    const [showDeleteRideDialog, setShowDeleteRideDialog] = useState(false);

    const handleBookRide = () => {
        // if not logged in, dialog (se connecter / créer un compte / annuler)
    };

    const handleEditRide = () => {
        setShowUpdateRideForm(true);
    };

    const handleDeleteRide = () => {
        setShowDeleteRideDialog(true);
    };

    useEffect(() => {
        const date = dayjs(ride.departureDate);
        const day = `${date.$D < 10 ? 0 : ""}${date.$D}/${
            date.$M + 1 < 10 ? 0 : ""
        }${date.$M + 1}/${date.$y}`;
        const time = `${date.$H}h${date.$m < 10 ? 0 : ""}${date.$m}`;

        setFormatedDate(`Départ le ${day} à ${time}`);
    }, [ride]);

    return (
        <Card>
            <CardHeader
                title={`${ride.departure} => ${ride.destination}`}
                subheader={formatedDate}
                // subheaderTypographyProps={{ fontWeight: "700" }}
            />
            <CardContent>
                <Typography paragraph>
                    <Typography component="span" fontWeight="700">
                        Places disponibles :{" "}
                    </Typography>
                    <Typography component="span">
                        {ride.totalSeats - ride.passengers.length}
                    </Typography>
                </Typography>
                <Typography paragraph>
                    <Typography component="span" fontWeight="700">
                        Prix :{" "}
                    </Typography>
                    <Typography component="span">{ride.price} €</Typography>
                </Typography>
                <Typography paragraph>
                    <Typography component="span" fontWeight="700">
                        Passagers :{" "}
                    </Typography>
                    <Typography component="span">
                        {ride.passengers.length}
                    </Typography>
                </Typography>
            </CardContent>
            <CardActions>
                {ride.driverId !== userId && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBookRide}>
                        Réserver
                    </Button>
                )}
                <IconButton onClick={handleEditRide} id={ride._id}>
                    <Edit />
                </IconButton>
                <IconButton onClick={handleDeleteRide} id={ride._id}>
                    <Delete />
                </IconButton>
                <UpdateRideForm
                    prevRideData={{
                        id: ride._id,
                        departure: ride.departure,
                        destination: ride.destination,
                        departureDate: ride.departureDate,
                        totalSeats: ride.totalSeats,
                        passengers: ride.passengers,
                    }}
                    showUpdateRideForm={showUpdateRideForm}
                    setShowUpdateRideForm={setShowUpdateRideForm}
                />
                <DeleteRideDialog
                    rideId={ride._id}
                    showDeleteRideDialog={showDeleteRideDialog}
                    setShowDeleteRideDialog={setShowDeleteRideDialog}
                />
            </CardActions>
        </Card>
    );
};

export default RideCard;
