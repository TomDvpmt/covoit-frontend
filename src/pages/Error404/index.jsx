import { Link as RouterLink } from "react-router-dom";

import Illustration from "../../components/Illustration";

import { Box, Link } from "@mui/material";

import flyingImg from "../../assets/img/illustrations/flying.webp";

const Error404 = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4rem",
                "& .illustration": {
                    maxWidth: "100%",
                },
            }}>
            <Link component={RouterLink} to="/" fontSize="1.2rem">
                Prenez un nouveau départ
            </Link>
            <Illustration
                imgUrl={flyingImg}
                imgTitle="Thelma and Louise flying"
            />
        </Box>
    );
};

export default Error404;
