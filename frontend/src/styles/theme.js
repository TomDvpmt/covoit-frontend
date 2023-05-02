import { createTheme } from "@mui/material";

import { frFR } from "@mui/x-date-pickers/locales";

const theme = createTheme(
    {
        palette: {
            // on Paletton : https://paletton.com/#uid=62V0u0kretxgWCylXvju2o3yej2

            primary: {
                // blue
                main: "#034A5E",
            },
            secondary: {
                // green
                main: "#007022",
                light: "#97D9A3",
            },
            error: {
                // orange-red
                main: "#EB3E23",
            },
            success: {
                // green
                main: "#007022",
            },
            warning: {
                // orange-red
                main: "#EB3E23",
            },
        },
        typography: {
            fontFamily: "Lato, Helvetica Neue, Arial, sans-serif",
        },
        maxWidth: {
            main: "1200px",
            form: "450px",
        },
    },
    frFR
);

export default theme;
