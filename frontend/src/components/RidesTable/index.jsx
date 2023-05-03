import { useState, useEffect } from "react";

import UpdateRideForm from "../forms/UpdateRideForm";
import DeleteRideDialog from "../DeleteRideDialog";
import Loader from "../Loader";

import dayjs from "dayjs";

import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    IconButton,
    Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import PropTypes from "prop-types";

const RidesTable = ({
    type,
    showCreateRideForm,
    showDeleteRideDialog,
    setShowDeleteRideDialog,
    setErrorMessage,
}) => {
    RidesTable.propTypes = {
        type: PropTypes.object.isRequired,
        showCreateRideForm: PropTypes.bool,
        showDeleteRideDialog: PropTypes.bool,
        setShowDeleteRideDialog: PropTypes.func,
        setErrorMessage: PropTypes.func,
    };

    const token = sessionStorage.getItem("token");

    const [rides, setRides] = useState([]);
    const [showUpdateRideForm, setShowUpdateRideForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token && Object.keys(type.filters).length > 0) {
            console.log(type);
            setLoading(true);
            fetch("/API/rides/", {
                method: "POST",
                headers: {
                    Authorization: `BEARER ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    filters: type.filters,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setRides(data.results);
                })
                .catch((error) => console.error(error))
                .finally(setLoading(false));
        }
    }, [
        token,
        type.filters,
        showCreateRideForm,
        showDeleteRideDialog,
        showUpdateRideForm,
    ]);

    const handleBookRide = () => {
        //
    };

    const handleEdit = (e) => {
        setErrorMessage("");
        setShowUpdateRideForm(true);
    };

    const handleDelete = (e) => {
        setErrorMessage("");
        setShowDeleteRideDialog(true);
    };

    return loading ? (
        <Loader />
    ) : (
        <Paper elevation={4}>
            <TableContainer>
                <Table>
                    <TableBody
                        sx={{
                            "& td": {
                                textAlign: "center",
                                fontSize: ".8em",
                                paddingLeft: ".5rem",
                                paddingRight: ".5rem",
                            },
                            "& .denseCell": {
                                paddingLeft: "0",
                                paddingRight: "0",
                            },
                        }}>
                        <TableRow
                            sx={{
                                "& > td": {
                                    fontWeight: "700",
                                },
                            }}>
                            <TableCell>Départ</TableCell>
                            <TableCell>Destination</TableCell>
                            <TableCell>Date de départ</TableCell>
                            <TableCell>Places disponibles</TableCell>
                            <TableCell>Passagers</TableCell>
                            <TableCell>Prix&nbsp;/ passager</TableCell>
                            <TableCell colSpan={3}></TableCell>
                        </TableRow>
                        {rides?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    Aucun trajet disponible selon ces critères.
                                </TableCell>
                            </TableRow>
                        )}
                        {rides
                            ?.sort((a, b) => {
                                return a.departureDate - b.departureDate;
                            })
                            .map((ride, index) => {
                                const date = dayjs(ride.departureDate);
                                console.log(date);
                                const day = `${date.$D < 10 ? 0 : ""}${
                                    date.$D
                                }/${date.$M + 1 < 10 ? 0 : ""}${date.$M + 1}/${
                                    date.$y
                                }`;
                                const time = `${date.$H}h${
                                    date.$m < 10 ? 0 : ""
                                }${date.$m}`;

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{ride.departure}</TableCell>
                                        <TableCell>
                                            {ride.destination}
                                        </TableCell>
                                        <TableCell>
                                            {`Le ${day}`}
                                            <br />
                                            {`à ${time}`}
                                        </TableCell>
                                        <TableCell>
                                            {(type.name === "driver" ||
                                                type.name === "search") &&
                                                ride.totalSeats -
                                                    ride.passengers.length}
                                        </TableCell>
                                        <TableCell>
                                            {type.name === "driver"
                                                ? ride.passengers?.map(
                                                      (index) => (
                                                          <Typography
                                                              key={index}
                                                              component="span">
                                                              {"<passenger>"}
                                                          </Typography>
                                                      )
                                                  )
                                                : ride.passengers?.length}
                                        </TableCell>
                                        <TableCell>
                                            {ride.price}&nbsp;€
                                        </TableCell>
                                        {type.name === "driver" && (
                                            <TableCell className="denseCell">
                                                <IconButton
                                                    onClick={handleEdit}
                                                    id={ride._id}>
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                        {type.name === "driver" && (
                                            <TableCell className="denseCell">
                                                <IconButton
                                                    onClick={handleDelete}
                                                    id={ride._id}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                        {type.name === "search" && (
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleBookRide}>
                                                    Réserver
                                                </Button>
                                            </TableCell>
                                        )}
                                        {type.name === "driver" && (
                                            <UpdateRideForm
                                                prevRideData={{
                                                    id: ride._id,
                                                    departure: ride.departure,
                                                    destination:
                                                        ride.destination,
                                                    departureDate:
                                                        ride.departureDate,
                                                    totalSeats: ride.totalSeats,
                                                    passengers: ride.passengers,
                                                }}
                                                showUpdateRideForm={
                                                    showUpdateRideForm
                                                }
                                                setShowUpdateRideForm={
                                                    setShowUpdateRideForm
                                                }
                                                setErrorMessage={
                                                    setErrorMessage
                                                }
                                            />
                                        )}
                                        {type.name === "driver" && (
                                            <DeleteRideDialog
                                                rideId={ride._id}
                                                showDeleteRideDialog={
                                                    showDeleteRideDialog
                                                }
                                                setShowDeleteRideDialog={
                                                    setShowDeleteRideDialog
                                                }
                                            />
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RidesTable;
