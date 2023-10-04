import userAvatar1 from "../../assets/img/user/drive.jpg";
import userAvatar2 from "../../assets/img/user/bond-driver.png";

import { Box, Button } from "@mui/material";

import PropTypes from "prop-types";

const LoginDemoUsers = ({ handleSubmit }) => {
    LoginDemoUsers.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
    };
    return (
        <Box
            alignSelf="center"
            mb="3rem"
            display="flex"
            justifyContent="center"
            gap="1rem">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                }}>
                <Box
                    sx={{
                        "& .user-avatar": {
                            borderRadius: "50%",
                            maxWidth: "8rem",
                        },
                    }}>
                    <img
                        src={userAvatar1}
                        alt="User avatar 1"
                        className="user-avatar"
                    />
                </Box>
                <Button
                    id="demo1"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Utilisateur démo 1
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                }}>
                <Box
                    sx={{
                        "& .user-avatar": {
                            borderRadius: "50%",
                            maxWidth: "8rem",
                        },
                    }}>
                    <img
                        src={userAvatar2}
                        alt="User avatar 2"
                        className="user-avatar"
                    />
                </Box>
                <Button
                    id="demo2"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Utilisateur démo 2
                </Button>
            </Box>
        </Box>
    );
};

export default LoginDemoUsers;
