import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import pageReducer from "../features/page/pageSlice";
import errorReducer from "../features/error/errorSlice";
import citiesReducer from "../features/cities/citiesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        cities: citiesReducer,
        error: errorReducer,
    },
    devTools: false,
});
