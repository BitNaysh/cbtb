import axios from "axios";
import { FormValueProps as LoginFormValueProps } from "../components/Login";

const API_URL = "http://localhost:3000/api/";

// Login user
const login = async (loginData: LoginFormValueProps) => {
    const response = await axios.post(API_URL + "sessions", loginData);

    if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(response.data);
        return response.data;
    }
    console.log(response.data);
    return response.data;
};

// Logout user
const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(API_URL + "sessions/logout", { refreshToken });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

const authService = {
    logout,
    login,
};

export default authService;
