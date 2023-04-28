import logo from "../../assets/img/car-sharing.png";

import { Box, Typography } from "@mui/material";
import {} from "@mui/icons-material";

const Header = () => {
    return (
        <Box component="header">
            <Box
                sx={{
                    bgcolor: "#f5f5f5",
                    padding: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                }}>
                <Box>
                    <img src={logo} alt="Covoit" width="100" />
                </Box>
                <Typography variant="h2">Covoit</Typography>
            </Box>
        </Box>
    );
};

export default Header;
