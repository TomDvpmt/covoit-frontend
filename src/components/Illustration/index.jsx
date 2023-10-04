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
                "& img": { borderRadius: "50% 50%" },
            }}>
            <img src={imgUrl} alt={imgTitle} />
        </Box>
    );
};

export default Illustration;
