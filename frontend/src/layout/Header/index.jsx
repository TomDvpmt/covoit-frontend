import logo from "../../assets/img/covoit-logo-bicolor.png";

import theme from "../../styles/theme";
import { Box, Link, useMediaQuery } from "@mui/material";
import {} from "@mui/icons-material";

const Header = () => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box component="header">
            <Box
                sx={{
                    padding: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                }}>
                <Link href="/">
                    <img
                        src={logo}
                        alt="Covoit"
                        width={isSmallScreen ? "400" : "250"}
                    />
                </Link>
            </Box>
        </Box>
    );
};

export default Header;
