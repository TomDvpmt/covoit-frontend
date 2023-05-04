import RideCard from "../RideCard";

import { Paper, Box } from "@mui/material";

import PropTypes from "prop-types";

const RidesList = ({ type, rides }) => {
    RidesList.propTypes = {
        type: PropTypes.string.isRequired,
        rides: PropTypes.array.isRequired,
    };
    return (
        <Paper elevation={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rides.map((ride, index) => (
                    <RideCard key={index} ride={ride} type={type} />
                ))}
            </Box>
        </Paper>
    );
};

export default RidesList;
