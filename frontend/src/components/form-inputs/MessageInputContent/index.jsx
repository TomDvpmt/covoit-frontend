import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const MessageInputContent = ({ content, setContent }) => {
    MessageInputContent.propTypes = {
        content: PropTypes.string.isRequired,
        setContent: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <TextField
            autoFocus
            required
            fullWidth
            multiline
            minRows={8}
            margin="dense"
            id="content"
            name="content"
            type="content"
            label="Votre message"
            value={content}
            onChange={handleChange}
        />
    );
};

export default MessageInputContent;
