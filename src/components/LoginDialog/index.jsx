import LoginForm from "../LoginForm";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import PropTypes from "prop-types";

const LoginDialog = ({ showLoginDialog, setShowLoginDialog }) => {
    LoginDialog.propTypes = {
        showLoginDialog: PropTypes.bool.isRequired,
        setShowLoginDialog: PropTypes.func.isRequired,
        actionAfterLogin: PropTypes.func.isRequired,
    };

    return (
        <Dialog
            open={showLoginDialog}
            onClose={() => setShowLoginDialog(false)}>
            <DialogTitle variant="h4">Connexion</DialogTitle>
            <DialogContent>
                <LoginForm setShowLoginDialog={setShowLoginDialog} />
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
