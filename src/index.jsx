import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";

import Router from "./routes/Router";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router />
                </ThemeProvider>
            </LocalizationProvider>
        </Provider>
    </React.StrictMode>
);
