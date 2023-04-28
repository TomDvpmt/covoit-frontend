import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        // on Paletton : https://paletton.com/#uid=62V0u0kretxgWCylXvju2o3yej2

        primary: {
            // green
            main: "#007022",
            light: "#97D9A3",
        },
        secondary: {
            // orange-red
            main: "#EB3E23",
        },
        error: {
            main: "#FF0000",
        },
        success: {
            main: "#034A5E",
        },
    },
    typography: {
        fontFamily: "Lato, Helvetica Neue, Arial, sans-serif",
    },
    maxWidth: {
        main: "1200px",
        form: "450px",
    },
});

export default theme;
