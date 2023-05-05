import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import pageReducer from "../features/page/pageSlice";
import errorReducer from "../features/error/errorSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        error: errorReducer,
    },
    devTools: true,
});
