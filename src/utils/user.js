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
