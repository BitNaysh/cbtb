import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import logo from "../assets/logo.small.png";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { login, authSelector as AuthSelector, authSelector } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    form: "signIn" | "signUp" | "forgotPassword";
    setForm: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | "forgotPassword">>;
    customStyles: {
        form: string;
        signInForm: string;
        heading: string;
        logo: string;
    };
}
interface LoginStylingProps extends LoginProps {
    color: string;
}

export interface FormValueProps {
    email: string;
    password: string;
}

const initialFormValues = {
    email: "", // dhulapkarraj@gmail.com BasicUserPassword
    password: "", // BasicUserPassword
};

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: LoginStylingProps) => ({}),
    signInButton: (props: LoginStylingProps) => ({
        "&&": {
            height: "37px",
            fontSize: "0.8rem",
        },
    }),
    linkText: (props: LoginStylingProps) => ({
        "&&": {
            cursor: "pointer",
            fontWeight: "bold",
            transition: "color 0.3s ease",
            textDecoration: "none",

            "&:hover": {
                color: theme.palette.primary.dark,
            },
        },
    }),
}));

const Login = (props: LoginProps) => {
    const dispatch = useAppDispatch();
    const { isLoading, isError, message, loginSuccess } = useSelector(authSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginSuccess) {
            navigate("/");
        }
    }, [loginSuccess, navigate]);

    const { customStyles, setForm } = props;
    // login form validation
    const validate = (fieldValues: Partial<FormValueProps>) => {
        let temp: Partial<FormValueProps> = { ...errors };
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email as string)
                ? ""
                : "Email is not valid.";
        if ("password" in fieldValues)
            temp.password =
                (fieldValues.password as string).length !== 0 ? "" : "This field is required.";
        setErrors({
            ...temp,
        });
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm<FormValueProps>(initialFormValues, true, validate);

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(values);
        if (errors.email === "" && errors.password === "") {
            console.log(values);
            dispatch(login(values));
        }
        // resetForm();
    };

    const classes = useStyles({ ...props, color: "red" });

    return (
        <Form
            onSubmit={handleSubmit}
            className={`${classes.root} ${customStyles.form} ${customStyles.signInForm}`}
        >
            <Box className={customStyles.logo}>
                <img src={logo} alt='logo' />
                <Typography variant='h4'>Muneem</Typography>
            </Box>
            <Box className={customStyles.heading}>
                <Typography variant='h2'>Welcome Back</Typography>
                <Typography variant='h6'>Not registered yet?</Typography>{" "}
                <Typography
                    variant='inherit'
                    component='a'
                    style={{ cursor: "pointer" }}
                    className={classes.linkText}
                    onClick={() => {
                        window.history.replaceState(null, "", "/auth/signUp");
                        setForm("signUp");
                    }}
                >
                    Sign Up
                </Typography>
            </Box>
            <Box>
                <Controls.Input
                    label='Email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <Controls.Input
                    label='Password'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                />
                <Controls.Button
                    customStyle={classes.signInButton}
                    text='Sign In'
                    type='submit'
                    onClick={() => {}}
                />
                <Typography variant='inherit'>
                    Forgotten your password or your login details?{" "}
                    <Typography
                        variant='inherit'
                        component='a'
                        className={classes.linkText}
                        style={{ fontWeight: "normal", textDecoration: "underline" }}
                        onClick={() => {
                            window.history.replaceState(null, "", "/auth/login");
                        }}
                    >
                        Get help
                    </Typography>{" "}
                    signing in
                </Typography>
            </Box>
        </Form>
    );
};

export default Login;
