import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    global: "",
    home: "",
    login: "",
    register: "",
    myRides: {
        driver: "",
        passenger: "",
    },
    displayProfile: "",
    updateUser: "",
    deleteUser: "",
    createRide: "",
    updateRide: "",
    deleteRide: "",
    updateBookingRequest: "",
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setGlobalErrorMessage: (state, action) => {
            state.global = action.payload;
        },
        resetErrorMessages: () => initialState,

        // Page : Home
        setHomeErrorMessage: (state, action) => {
            state.home = action.payload;
        },

        // Pages : Login / register
        setLoginErrorMessage: (state, action) => {
            state.login = action.payload;
        },
        setRegisterErrorMessage: (state, action) => {
            state.register = action.payload;
        },

        // Page : MyRides
        setMyRidesDriverErrorMessage: (state, action) => {
            state.myRides.driver = action.payload;
        },
        setMyRidesPassengerErrorMessage: (state, action) => {
            state.myRides.passenger = action.payload;
        },

        // Page : Profile
        setDisplayProfileErrorMessage: (state, action) => {
            state.displayProfile = action.payload;
        },
        setUpdateUserErrorMessage: (state, action) => {
            state.updateUser = action.payload;
        },
        setDeleteUserErrorMessage: (state, action) => {
            state.deleteUser = action.payload;
        },

        // Page : BookingRequests
        setBookingRequestErrorMessage: (state, action) => {
            state.updateBookingRequest = action.payload;
        },

        // ride
        setBookRideErrorMessage: (state, action) => {
            state.bookRide = action.payload;
        },
        setCreateRideErrorMessage: (state, action) => {
            state.createRide = action.payload;
        },
        setUpdateRideErrorMessage: (state, action) => {
            state.updateRide = action.payload;
        },
        setDeleteRideErrorMessage: (state, action) => {
            state.deleteRide = action.payload;
        },
    },
});

export const {
    setGlobalErrorMessage,
    setLoginErrorMessage,
    setRegisterErrorMessage,
    setHomeErrorMessage,
    setMyRidesDriverErrorMessage,
    setMyRidesPassengerErrorMessage,
    setDisplayProfileErrorMessage,
    setUpdateUserErrorMessage,
    setDeleteUserErrorMessage,
    setBookRideErrorMessage,
    setCreateRideErrorMessage,
    setUpdateRideErrorMessage,
    setDeleteRideErrorMessage,
    setBookingRequestErrorMessage,
    resetErrorMessages,
} = errorSlice.actions;

export const selectGlobalErrorMessage = (state) => state.error.global;
export const selectLoginErrorMessage = (state) => state.error.login;
export const selectRegisterErrorMessage = (state) => state.error.register;
export const selectHomeErrorMessage = (state) => state.error.home;
export const selectMyRidesDriverErrorMessage = (state) =>
    state.error.myRides.driver;
export const selectMyRidesPassengerErrorMessage = (state) =>
    state.error.myRides.passenger;
export const selectDisplayProfileErrorMessage = (state) =>
    state.error.displayProfile;
export const selectUpdateUserErrorMessage = (state) => state.error.updateUser;
export const selectDeleteUserErrorMessage = (state) => state.error.deleteUser;
export const selectBookRideErrorMessage = (state) => state.error.bookRide;
export const selectCreateRideErrorMessage = (state) => state.error.createRide;
export const selectUpdateRideErrorMessage = (state) => state.error.updateRide;
export const selectDeleteRideErrorMessage = (state) => state.error.deleteRide;
export const selectBookingRequestErrorMessage = (state) =>
    state.error.updateBookingRequest;

export default errorSlice.reducer;
