import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "login",
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setPageLocation: (state, action) => {
            state.location = action.payload;
        },
    },
});

export const { setPageLocation } = pageSlice.actions;

export const selectPageLocation = (state) => state.page.location;

export default pageSlice.reducer;
