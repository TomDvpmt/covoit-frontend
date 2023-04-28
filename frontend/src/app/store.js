import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import pageReducer from "../features/page/pageSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    },
    devTools: true,
});
