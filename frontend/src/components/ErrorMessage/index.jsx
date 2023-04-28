import { Typography } from "@mui/material";

import theme from "../../styles/theme";

import PropTypes from "prop-types";

const ErrorMessage = ({ errorMessage }) => {
    ErrorMessage.propTypes = {
        errorMessage: PropTypes.string.isRequired,
    };
    return (
        <Typography paragraph color={theme.palette.error.main}>
            {errorMessage}
        </Typography>
    );
};

export default ErrorMessage;
