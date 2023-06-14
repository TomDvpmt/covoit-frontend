import { Link as RouterLink } from "react-router-dom";

import { Box, Typography, Link } from "@mui/material";

const ErrorBoundary = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1rem">
            <Typography variant="h2">
                Aïe, quelque chose s'est mal passé.
            </Typography>
            <Link component={RouterLink} to="/">
                Revenir à l'accueil
            </Link>
        </Box>
    );
};

export default ErrorBoundary;
