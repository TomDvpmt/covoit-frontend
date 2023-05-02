import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/page/pageSlice";

import { Typography } from "@mui/material";

const PageHeading = () => {
    const page = useSelector(selectPageLocation);

    const pageHeadings = {
        login: "Connexion",
        register: "Créer un compte",
        profile: "Mes informations",
        home: "",
        myrides: "Mes trajets",
        trip: "",
        error404: "Page introuvable.",
    };

    return (
        <Typography component="h1" variant="h4" align="center" mt="5rem">
            {pageHeadings[page]}
        </Typography>
    );
};

export default PageHeading;
