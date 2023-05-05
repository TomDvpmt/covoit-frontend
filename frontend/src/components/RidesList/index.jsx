import RideCard from "../RideCard";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

const RidesList = ({ type, rides }) => {
    RidesList.propTypes = {
        type: PropTypes.string.isRequired,
        rides: PropTypes.array.isRequired,
    };
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {rides?.map((ride, index) => (
                <RideCard key={index} ride={ride} type={type} />
            ))}
        </Box>
    );
};

export default RidesList;
