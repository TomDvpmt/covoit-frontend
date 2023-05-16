/** Get a user's data
 *
 * @param {String} id
 * @returns { Object }
 */

export const getOneUser = async (id) => {
    const response = await fetch(`/API/users/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};
