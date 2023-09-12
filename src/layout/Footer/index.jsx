import {
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Link,
} from "@mui/material";

import theme from "../../styles/theme";

const cellStyle = {
    border: "none",
    padding: ".2rem .5rem",
    color: "inherit",
    "& > *": {
        color: "white",
    },
};

const leftCellStyle = {
    fontWeight: "700",
    textAlign: "right",
};

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.primary.main,
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                color: "white",
            }}>
            <Table
                sx={{
                    maxWidth: "max-content",
                    "& td": cellStyle,
                }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            API externe utilisée :{" "}
                        </TableCell>
                        <TableCell>
                            <Link
                                href="https://geo.api.gouv.fr/decoupage-administratif/communes"
                                target="_blank"
                                rel="noopener"
                                underline="hover">
                                geo.api.gouv.fr
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            Code source :{" "}
                        </TableCell>
                        <TableCell>
                            <Link
                                href="https://github.com/TomDvpmt/covoit-frontend"
                                target="_blank"
                                rel="noopener"
                                underline="hover">
                                github.com/TomDvpmt
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Footer;
