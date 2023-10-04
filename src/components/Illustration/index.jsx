import { Box } from "@mui/material";

import PropTypes from "prop-types";

const Illustration = ({ imgUrl, imgTitle }) => {
    Illustration.propTypes = {
        imgUrl: PropTypes.string.isRequired,
        imgTitle: PropTypes.string.isRequired,
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                "& .illustration": { borderRadius: "2rem" },
            }}>
            <img src={imgUrl} alt={imgTitle} className="illustration" />
        </Box>
    );
};

export default Illustration;
