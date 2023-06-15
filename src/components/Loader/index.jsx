import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <CircularProgress
            sx={{
                display: "block",
                margin: "3rem auto",
            }}
            size="3rem"
        />
    );
};

export default Loader;
