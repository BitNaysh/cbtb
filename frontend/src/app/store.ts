import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userSlice } from "../features/userSlice";
import { authSlice } from "../features/authSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
