/** Get a user's data
 *
 * @param {String} id
 * @returns { Object }
 */

export const getOneUser = async (id) => {
    const token = sessionStorage.getItem("token");
    if (id === 0 && !token) {
        throw new Error("Non autorisé.");
    }
    const response = await fetch(`/API/users/${id}`, {
        method: "GET",
        headers: {
            authorization: `BEARER ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};
