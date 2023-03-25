import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import authService from "../services/auth.service";
import { FormValueProps as LoginFormValueProps } from "../components/Login";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
    accessToken: accessToken ? accessToken : null,
    refreshToken: refreshToken ? refreshToken : null,
    isLoading: false,
    isError: false,
    loginSuccess: false,
    message: "",
};

// Register user
export const login = createAsyncThunk(
    "user/login",
    async (userData: LoginFormValueProps, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.loginSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.accessToken && action.payload.refreshToken) {
                    state.accessToken = String(action.payload.accessToken);
                    state.refreshToken = String(action.payload.refreshToken);
                    state.loginSuccess = true;
                }
                state.message = JSON.stringify(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
            });
    },
});

export const { reset } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
