import { Box } from "@mui/material";

import theme from "../../styles/theme";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.primary.main,
                minHeight: "100px",
                color: "white",
            }}>
            Footer
        </Box>
    );
};

export default Footer;
