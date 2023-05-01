import { Typography } from "@mui/material";

import theme from "../../styles/theme";

import PropTypes from "prop-types";

const ValidationMessage = ({ text }) => {
    ValidationMessage.propTypes = {
        text: PropTypes.string.isRequired,
    };
    return (
        <Typography color={theme.palette.success.main} mb="1rem">
            {text}
        </Typography>
    );
};

export default ValidationMessage;
