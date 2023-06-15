import { useDispatch } from "react-redux";

import { setPageLocation } from "../../features/page/pageSlice";
import { resetErrorMessages } from "../../features/error/errorSlice";

import PropTypes from "prop-types";
import { useEffect } from "react";

const SetPage = ({ page }) => {
    SetPage.propTypes = {
        page: PropTypes.string.isRequired,
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageLocation(page));
        dispatch(resetErrorMessages());
    }, [dispatch, page]);

    return null;
};

export default SetPage;
