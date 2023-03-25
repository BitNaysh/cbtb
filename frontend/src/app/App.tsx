import React from "react";
import { Box, CssBaseline, Theme } from "@mui/material";
import SideBar from "../components/SideBar";
import { makeStyles } from "@mui/styles";
import { Route, Routes, Outlet } from "react-router-dom";
import {
    Dashboard,
    Transactions,
    Statement,
    Insights,
    Settings,
    Authenticate,
    Details,
} from "../containers";
import Notice from "../components/Notice";

interface ComponentProps {}

const useStyles = makeStyles((theme: Theme) => ({
    appMain: (props: ComponentProps) => ({
        flex: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.secondary.contrastText,
        display: "flex",
        flexDirection: "column",
    }),
    title: (props: ComponentProps) => ({
        marginBottom: theme.spacing(1),
    }),
}));

function MainApp() {
    // const { isLoading, isError, message, loginSuccess } = useSelector(authSelector);

    const classes = useStyles();

    return (
        <>
            <SideBar backgroundColor='red' />
            <Box className={classes.appMain} component='main'>
                <Outlet />
            </Box>
        </>
    );
}

function App() {
    return (
        <>
            <CssBaseline />
            <Routes>
                {/* <Route element={<Authenticate />} path='/auth'>
                    <Route element={<Authenticate />} path='login' />
                    <Route element={<Authenticate />} path='signup' />
                </Route> */}
                <Route
                    element={
                        <Notice
                            title='Verify Email'
                            content='Click on link sent on your email to verify your email account.'
                        />
                    }
                    path='/auth/checkEmail'
                />
                <Route element={<Authenticate />} path='/auth/*' />

                <Route element={<MainApp />} path='/'>
                    <Route index element={<Dashboard />} />
                    <Route element={<Dashboard />} path='dashboard' />
                    <Route element={<Transactions />} path='train-model' />
                    <Route element={<Statement />} path='test-model' />
                    <Route element={<Details />} path='details' />
                    <Route element={<Insights />} path='insights' />
                    <Route element={<Settings />} path='settings' />
                </Route>
            </Routes>
        </>
    );
}

export default App;
