import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    data: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        setUserData: (state, action) => {
            state.isLoggedIn = true;
            state.data = action.payload;
        },
        logOut: () => initialState,
    },
});

export const { logIn, logOut, setUserData } = userSlice.actions;

export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserId = (state) => state.user.data.id;
export const selectUserEmail = (state) => state.user.data.email;
export const selectUserFirstName = (state) => state.user.data.firstName;
export const selectUserLastName = (state) => state.user.data.lastName;
export const selectUserPhone = (state) => state.user.data.phone;

export default userSlice.reducer;
