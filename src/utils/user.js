import { store } from "../app/store";
import {
    setLoginErrorMessage,
    setRegisterErrorMessage,
} from "../features/error/errorSlice";

import BASE_API_URL from "./API";

/** Get a user's data
 *
 * @param {String} id
 * @returns { Object }
 */

export const getOneUser = async (id) => {
    const response = await fetch(`${BASE_API_URL}/API/users/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};

/**
 * Remove login and register error messages
 */

export const removeErrorMessages = () => {
    store.dispatch(setLoginErrorMessage(""));
    store.dispatch(setRegisterErrorMessage(""));
};
