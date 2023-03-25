/**
 * Authentication service
 * The service uses Axios for HTTP requests and Local Storage for user information & JWT.
 * It provides following important functions:
 *      - register(): POST {username, email, password}
 *      - login(): POST {username, password} & save JWT to Local Storage
 *      - logout(): remove JWT from Local Storage
 */

import axios from "axios";
import { FormValueProps as SignUpFormValueProps } from "../components/SignUp";

const API_URL = "http://localhost:3000/api/";

export interface LoginUserData {
    email: string;
    password: string;
}

export interface UserData extends LoginUserData {
    firstName: string;
    lastName: string;
}

// Register user
const register = async (userData: SignUpFormValueProps) => {
    try {
        const response = await axios.post(API_URL + "users", userData);
        console.log(response.status);

        if (response.data && response.data.message) {
            return {
                status: response.status,
                message: response.data,
            };
        }

        return response;
    } catch (error: any) {
        console.log(error);
    }
};

// request resend verification code
const resendVerificationEmail = async (body: { email: string }) => {
    const response = await axios.post(API_URL + "users/resend_activation", body);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const getCurrentLoggedInUser = async (authToken: string) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.post(
                API_URL + "users/me",
                {
                    key: "value",
                },
                config
            );
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.log(error);
            return null;
        }
    } else {
        return null;
    }
};

const userService = {
    register,
    resendVerificationEmail,
    getCurrentLoggedInUser,
};

export default userService;
