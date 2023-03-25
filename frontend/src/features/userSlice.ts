import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import userService, { UserData } from "../services/user.service";
import { FormValueProps as SignUpFormValueProps } from "../components/SignUp";

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    registerSuccess: false,
    message: "",
    isLoadingUser: false,
    getCurrentLoggedInUserSuccess: false,
};

// Register user
export const register = createAsyncThunk(
    "user/register",
    async (userData: SignUpFormValueProps, thunkAPI) => {
        try {
            return await userService.register(userData);
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCurrentLoggedInUser = createAsyncThunk(
    "user/getCurrentLoggedInUser",
    async (token: string, thunkAPI) => {
        try {
            return await userService.getCurrentLoggedInUser(token);
        } catch (error: any) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.registerSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.registerSuccess = true;
                state.message = String(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            })
            .addCase(getCurrentLoggedInUser.pending, (state) => {
                state.isLoadingUser = true;
            })
            .addCase(getCurrentLoggedInUser.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.user = action.payload;
                state.getCurrentLoggedInUserSuccess = true;
            })
            .addCase(getCurrentLoggedInUser.rejected, (state, action) => {
                state.isLoadingUser = true;
                state.getCurrentLoggedInUserSuccess = false;
                state.message = String(action.payload);
            });
    },
});

export const { reset } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
