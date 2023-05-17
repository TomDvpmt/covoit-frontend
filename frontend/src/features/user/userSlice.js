import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    data: {},
    rides: {
        driver: [],
        passenger: [],
    },
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
        setUserEmail: (state, action) => {
            state.data.email = action.payload;
        },
        setUserFirstName: (state, action) => {
            state.data.firstName = action.payload;
        },
        setUserLastName: (state, action) => {
            state.data.lastName = action.payload;
        },
        setUserPhone: (state, action) => {
            state.data.phone = action.payload;
        },
        setDriverRides: (state, action) => {
            state.rides.driver = action.payload;
        },
        addDriverRide: (state, action) => {
            state.rides.driver = [...state.rides.driver, action.payload].sort(
                (a, b) => a.departureDate - b.departureDate
            );
        },
        updateDriverRide: (state, action) => {
            const rideId = action.payload.id;
            const updateData = action.payload.updateData;
            state.rides.driver.find(
                (ride) => ride._id === rideId
            ).departureDate = updateData.departureDate;
            state.rides.driver.find((ride) => ride._id === rideId).totalSeats =
                updateData.totalSeats;
        },
        deleteDriverRide: (state, action) => {
            const rideId = action.payload;
            state.rides.driver = state.rides.driver.filter(
                (ride) => ride._id !== rideId
            );
        },
        setPassengerRides: (state, action) => {
            state.rides.passenger = action.payload;
        },
        logOut: () => initialState,
    },
});

export const {
    logIn,
    logOut,
    setUserData,
    setUserEmail,
    setUserFirstName,
    setUserLastName,
    setUserPhone,
    setDriverRides,
    addDriverRide,
    updateDriverRide,
    deleteDriverRide,
    setPassengerRides,
} = userSlice.actions;

export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserId = (state) => state.user.data.id;
export const selectUserEmail = (state) => state.user.data.email;
export const selectUserFirstName = (state) => state.user.data.firstName;
export const selectUserLastName = (state) => state.user.data.lastName;
export const selectUserPhone = (state) => state.user.data.phone;
export const selectDriverRides = (state) => state.user.rides.driver;
export const selectPassengerRides = (state) => state.user.rides.passenger;

export default userSlice.reducer;
