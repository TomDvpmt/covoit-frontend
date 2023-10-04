import logo from "../../assets/img/logo-pontiac.png";

import theme from "../../styles/theme";
import { Box, Link, Typography, useMediaQuery } from "@mui/material";

const Header = () => {
    const isUpSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box component="header">
            <Box
                sx={{
                    padding: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: isUpSmallScreen ? "2rem" : "0.5rem",
                }}>
                <Link href="/">
                    <img
                        src={logo}
                        alt="Covoit"
                        width={isUpSmallScreen ? "300" : "150"}
                    />
                </Link>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography textTransform="uppercase">
                        <Typography
                            component="span"
                            fontSize={isUpSmallScreen ? "3.5rem" : "2rem"}
                            fontWeight="700">
                            Co
                        </Typography>
                        <Typography
                            component="span"
                            fontSize={isUpSmallScreen ? "3.5rem" : "2rem"}
                            fontWeight="700"
                            color={theme.palette.secondary.main}>
                            voit'
                        </Typography>
                    </Typography>
                    <Typography
                        fontSize={isUpSmallScreen ? "1.8rem" : "1rem"}
                        align="center">
                        Partez à l'aventure&nbsp;!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
