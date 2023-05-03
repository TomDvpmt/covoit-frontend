import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/user/userSlice";

import UpdateRideForm from "../forms/UpdateRideForm";
import DeleteRideDialog from "../DeleteRideDialog";

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
        type: PropTypes.string.isRequired,
        showCreateRideForm: PropTypes.bool.isRequired,
        showDeleteRideDialog: PropTypes.bool.isRequired,
        setShowDeleteRideDialog: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId);

    const [rides, setRides] = useState([]);
    const [filters, setFilters] = useState({});
    const [showUpdateRideForm, setShowUpdateRideForm] = useState(false);

    useEffect(() => {
        switch (type) {
            case "driver":
                setFilters({
                    driverId: userId,
                });
                break;
            case "passenger":
                setFilters({});
                break;
            case "search":
                setFilters({});
                break;
            default:
                setFilters({});
        }
    }, []);

    useEffect(() => {
        fetch("/API/rides/", {
            method: "POST",
            headers: {
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                filters,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setRides(data.results);
            })
            .catch((error) => console.error(error));
    }, [
        token,
        userId,
        showCreateRideForm,
        showDeleteRideDialog,
        showUpdateRideForm,
    ]);

    const handleEdit = (e) => {
        setShowUpdateRideForm(true);
    };

    const handleDelete = (e) => {
        setShowDeleteRideDialog(true);
    };

    return (
        <Paper elevation={4}>
            <TableContainer>
                <Table>
                    <TableBody
                        sx={{
                            "& td": {
                                fontSize: ".8em",
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
                            <TableCell>Prix</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        {rides
                            ?.sort((a, b) => {
                                return a.departureDate - b.departureDate;
                            })
                            .map((ride, index) => {
                                const date = dayjs(ride.departureDate);
                                const day = `${date.$D < 10 ? 0 : ""}${
                                    date.$D
                                }/${date.$M < 10 ? 0 : ""}${date.$M}/${
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
                                        <TableCell>{`Le ${day} à ${time}`}</TableCell>
                                        {(type === "driver" ||
                                            type === "search") && (
                                            <TableCell>
                                                {ride.totalSeats -
                                                    ride.passengers.length}
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            {type === "driver"
                                                ? ride.passengers?.map(
                                                      (passenger, index) => (
                                                          <Typography
                                                              key={index}
                                                              component="span">
                                                              {passenger.email}
                                                          </Typography>
                                                      )
                                                  )
                                                : ride.passengers?.length}
                                        </TableCell>
                                        <TableCell>
                                            {ride.price}&nbsp;€
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                paddingLeft: "0",
                                                paddingRight: "0",
                                            }}>
                                            <IconButton
                                                onClick={handleEdit}
                                                id={ride._id}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                paddingLeft: "0",
                                                paddingRight: "0",
                                            }}>
                                            <IconButton
                                                onClick={handleDelete}
                                                id={ride._id}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                        <UpdateRideForm
                                            prevRideData={{
                                                id: ride._id,
                                                departure: ride.departure,
                                                destination: ride.destination,
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
                                            setErrorMessage={setErrorMessage}
                                        />
                                        <DeleteRideDialog
                                            rideId={ride._id}
                                            showDeleteRideDialog={
                                                showDeleteRideDialog
                                            }
                                            setShowDeleteRideDialog={
                                                setShowDeleteRideDialog
                                            }
                                        />
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
