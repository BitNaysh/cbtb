import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import React, { useState } from "react";
import { AuthCarousel, Login, SignUp } from "../components";
import { width } from "@mui/system";

const styleConstants = {
    boxBorderRadius: 3.3,
    carouselBorderRadius: 2,
};

interface AuthenticateStylingProps {
    form: "signIn" | "signUp" | "forgotPassword";
}

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: theme.palette.primary.light,
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        position: "relative",
        width: "100%",
        maxWidth: "1020px",
        height: "640px",
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.spacing(styleConstants.boxBorderRadius),
        boxShadow: "0 60px 40px -30px rgba(0, 0, 0, 0.27)",
    },
    innerBox: {
        position: "absolute",
        width: "calc(100% - 4.1rem)",
        height: "calc(100% - 4.1rem)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    formsWrap: (props: AuthenticateStylingProps) => ({
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        width: "45%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        transition: "0.8s ease-in-out",
        ...(props.form === "signUp" && {
            left: "55%",
        }),
    }),
    form: {
        maxWidth: "260px",
        width: "100%",
        margin: "0 auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        gridColumn: "1 / 2",
        gridRow: "1 / 2",
        transition: "opacity 0.02s 0.4s",
    },
    heading: {
        "& h2": {
            fontSize: "1.5rem",
            letterSpacing: "-0.5px",
            fontWeight: "500",
        },
        "& h6": {
            fontSize: "0.8rem",
            display: "inline",
            fontWeight: "400",
        },
        "& a": {
            fontSize: "0.8rem",
        },
    },
    logo: {
        display: "flex",
        alignItems: "center",
        "& img": {
            width: 35,
            marginRight: "0.3rem",
        },
        "& h4": {
            fontSize: "1.8rem",
            letterSpacing: "-0.5px",
        },
    },
    signInForm: (props: AuthenticateStylingProps) => ({
        ...(props.form !== "signIn" && { opacity: 0, pointerEvents: "none" }),
    }),
    signUpForm: (props: AuthenticateStylingProps) => ({
        ...(props.form !== "signUp" && { opacity: 0, pointerEvents: "none" }),
    }),
    carousel: (props: AuthenticateStylingProps) => ({
        position: "absolute",
        top: 0,
        left: "45%",
        height: "100%",
        width: "55%",

        transition: "0.8s ease-in-out",
        ...(props.form === "signUp" && {
            left: 0,
        }),
    }),
}));

const Authenticate = () => {
    const [form, setForm] = useState<"signIn" | "signUp" | "forgotPassword">("signIn");

    const classes = useStyles({ form });

    return (
        <Box component='main' className={classes.main}>
            <Box className={classes.box}>
                <Box className={classes.innerBox}>
                    <Box className={classes.formsWrap}>
                        <Login
                            form={form}
                            setForm={setForm}
                            customStyles={{
                                form: classes.form,
                                signInForm: classes.signInForm,
                                heading: classes.heading,
                                logo: classes.logo,
                            }}
                        />
                        <SignUp
                            form={form}
                            setForm={setForm}
                            customStyles={{
                                form: classes.form,
                                signUpForm: classes.signUpForm,
                                heading: classes.heading,
                                logo: classes.logo,
                            }}
                        />
                    </Box>
                    <AuthCarousel
                        customStyles={{
                            carousel: classes.carousel,
                        }}
                        form={form}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Authenticate;
