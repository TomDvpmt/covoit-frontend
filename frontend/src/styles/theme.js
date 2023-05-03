import { createTheme } from "@mui/material";

import { frFR } from "@mui/x-date-pickers/locales";

let theme = createTheme();

theme = createTheme(
    theme,
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
            h1: {
                [theme.breakpoints.up("xs")]: {
                    margin: "5rem 0 3rem",
                    fontSize: "2rem",
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: "3rem",
                },
            },
            h2: {
                [theme.breakpoints.up("xs")]: {
                    margin: "2rem 0 1rem",
                    fontSize: "1.3rem",
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: "1.8rem",
                },
            },
        },
        maxWidth: {
            main: "1200px",
            form: "450px",
        },
    },
    frFR
);

export default theme;
