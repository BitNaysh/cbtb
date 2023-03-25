import React, { useState } from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface InputProps {
    name: string;
    label: string;
    value: string;
    minLength?: number;
    error?: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [other: string]: any;
}

interface InputStylingProps extends InputProps {
    color: string;
    active: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: InputStylingProps) => ({
        position: "relative",
        height: theme.spacing(2.3125),
        marginBottom: theme.spacing(2),
    }),
    inputField: (props: InputStylingProps) => ({
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "none",
        border: "none",
        outline: "none",
        borderBottomStyle: "solid",
        borderBottomColor: "#bbb",
        borderBottomWidth: "1px",
        padding: 0,
        fontSize: "0.95rem",
        color: "#151111",
        transition: "0.4s",
        lineHeight: 1,
        ...(props.active && { borderBottomColor: "#151111", borderBottomWidth: "1.5px" }),
    }),
    label: (props: InputStylingProps) => ({
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "0.95rem",
        color: "#bbb",
        pointerEvents: "none",
        transition: "0.4s",
        ...(props.active && {
            fontSize: "0.75rem",
            top: 0.2,
        }),
    }),
    errorMessage: (props: InputStylingProps) => ({
        position: "absolute",
        fontSize: "0.7rem",
        color: "red",
        lineHeight: 1,
        bottom: theme.spacing(-0.8),
    }),
}));

const Input = (props: InputProps) => {
    const { type, name, label, value, error = null, onChange, minLength = 4, ...other } = props;
    const color = "red";
    const [active, setActive] = useState<boolean>(false);
    const classes = useStyles({ ...props, color, active });

    return (
        <Box className={classes.root}>
            <input
                type={type}
                name={name}
                id={name}
                className={classes.inputField}
                minLength={minLength}
                onChange={onChange}
                value={value}
                {...(error && { error: true, helperText: error })}
                {...other}
                onFocus={() => setActive(true)}
                onBlur={() => {
                    if (value.length !== 0) return;
                    setActive(false);
                }}
            />
            <label className={classes.label} htmlFor={name}>
                {label}
            </label>
            {error && (
                <Typography className={classes.errorMessage} variant='inherit'>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default Input;
