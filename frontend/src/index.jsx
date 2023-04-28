import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";

import Router from "./routes/Router";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
