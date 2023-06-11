import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCities: [],
};

export const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        setAllCities: (state, action) => {
            state.allCities = action.payload;
        },
    },
});

export const { setAllCities } = citiesSlice.actions;

export const selectAllCities = (state) => state.cities.allCities;

export default citiesSlice.reducer;
