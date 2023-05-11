import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const Inbox = () => {
    useEffect(() => {});

    return (
        <Box component="section">
            <Typography component="h2" variant="h2">
                Demandes reçues
            </Typography>
            <Box></Box>
            <Typography component="h2" variant="h2">
                Conversations
            </Typography>
        </Box>
    );
};

export default Inbox;
