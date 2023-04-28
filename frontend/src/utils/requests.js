export const getOneUser = async (id) => {
    const token = sessionStorage.getItem("token");
    if (id === 0 && !token) {
        return {};
    }
    try {
        const response = await fetch(`/API/user/${id}`, {
            method: "GET",
            headers: {
                authorization: `BEARER ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {};
    }
};
