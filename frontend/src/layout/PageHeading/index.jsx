import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/page/pageSlice";

import { Typography } from "@mui/material";

const PageHeading = () => {
    const page = useSelector(selectPageLocation);

    const pageHeadings = {
        login: "Connexion",
        register: "Créer un compte",
        profile: "Mes informations",
        home: "Trouver un trajet",
        myrides: "Mes trajets",
        trip: "",
        error404: "Page introuvable.",
    };

    return (
        <Typography component="h1" variant="h1" align="center">
            {pageHeadings[page]}
        </Typography>
    );
};

export default PageHeading;
