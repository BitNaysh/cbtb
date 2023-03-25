import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import logo from "../assets/logo.small.png";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { register, userSelector } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
interface SignUpProps {
    form: "signIn" | "signUp" | "forgotPassword";
    setForm: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | "forgotPassword">>;
    customStyles: {
        form: string;
        signUpForm: string;
        heading: string;
        logo: string;
    };
}
interface SignUpStylingProps extends SignUpProps {
    color: string;
}

export interface FormValueProps {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
}

const initialFormValues = {
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
};

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: SignUpStylingProps) => ({}),
    signInButton: (props: SignUpStylingProps) => ({
        "&&": {
            height: "37px",
            fontSize: "0.8rem",
        },
    }),
    linkText: (props: SignUpStylingProps) => ({
        "&&": {
            cursor: "pointer",
            fontWeight: "bold",
            "&:hover": {
                color: theme.palette.primary.dark,
            },
        },
    }),
}));

const SignUp = (props: SignUpProps) => {
    const dispatch = useAppDispatch();
    const { isLoading, isError, registerSuccess, message } = useSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (registerSuccess) {
            navigate("/auth/checkEmail");
        }
    }, [registerSuccess, navigate]);

    const { customStyles, setForm } = props;
    // SignUp form validation
    const validate = (fieldValues: Partial<FormValueProps>) => {
        let temp: Partial<FormValueProps> = { ...errors };

        if ("name" in fieldValues)
            temp.name = (fieldValues.name as string).length !== 0 ? "" : "This field is required.";
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email as string)
                ? ""
                : "Email is not valid.";
        if ("password" in fieldValues)
            temp.password =
                (fieldValues.password as string).length !== 0 ? "" : "This field is required.";
        if ("passwordConfirmation" in fieldValues) {
            if ((fieldValues.passwordConfirmation as string).length! !== 0) {
                if (fieldValues.password !== fieldValues.passwordConfirmation) {
                    temp.passwordConfirmation = "Confirm password does not match";
                } else {
                    temp.passwordConfirmation = "";
                }
            } else {
                temp.password = "This field is required.";
            }
        }

        setErrors({
            ...temp,
        });
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm<FormValueProps>(initialFormValues, true, validate);

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (
            errors.passwordConfirmation === "" &&
            errors.name === "" &&
            errors.email === "" &&
            errors.password === ""
        ) {
            dispatch(register(values));
        }
        // resetForm();
    };

    const classes = useStyles({ ...props, color: "red" });

    return (
        <Form
            onSubmit={handleSubmit}
            className={`${classes.root} ${customStyles.form} ${customStyles.signUpForm}`}
        >
            <Box className={customStyles.logo}>
                <img src={logo} alt='logo' />
                <Typography variant='h4'>Muneem</Typography>
            </Box>
            <Box className={customStyles.heading}>
                <Typography variant='h2'>Get started</Typography>
                <Typography variant='h6'>Already have an account?</Typography>{" "}
                <Typography
                    variant='inherit'
                    component='a'
                    style={{ cursor: "pointer" }}
                    className={classes.linkText}
                    onClick={() => {
                        window.history.replaceState(null, "", "/auth/login");
                        setForm("signIn");
                    }}
                >
                    Sign in
                </Typography>
            </Box>
            <Box>
                <Controls.Input
                    label='Name'
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={handleInputChange}
                    error={errors.name}
                />
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
                <Controls.Input
                    label='Confirm Password'
                    name='passwordConfirmation'
                    type='password'
                    value={values.passwordConfirmation}
                    onChange={handleInputChange}
                    error={errors.passwordConfirmation}
                />
                <Controls.Button
                    customStyle={classes.signInButton}
                    text='Sign Up'
                    type='submit'
                    onClick={() => {}}
                />
                <Typography variant='inherit'>
                    By signing up, I agree to the{" "}
                    <Typography
                        variant='inherit'
                        component='a'
                        className={classes.linkText}
                        style={{ fontWeight: "normal", textDecoration: "underline" }}
                        onClick={() => {
                            window.history.replaceState(null, "", "/auth/SignUp");
                        }}
                    >
                        Terms of Services
                    </Typography>{" "}
                    and{" "}
                    <Typography
                        variant='inherit'
                        component='a'
                        className={classes.linkText}
                        style={{ fontWeight: "normal", textDecoration: "underline" }}
                        onClick={() => {
                            window.history.replaceState(null, "", "/auth/SignUp");
                        }}
                    >
                        Privacy Policy
                    </Typography>
                    .
                </Typography>
            </Box>
        </Form>
    );
};

export default SignUp;
