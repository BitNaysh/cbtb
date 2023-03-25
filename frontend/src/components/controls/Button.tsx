import React from "react";
import { Button as MuiButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { type } from "os";

interface ButtonProps {
    text: string;
    size?: "small" | "large" | "medium" | undefined;
    customStyle?: string;
    color?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning"
        | undefined;
    variant?: "text" | "contained" | "outlined" | undefined;
    onClick: () => void;
    [other: string]: any;
}

interface ButtonStylingProps extends ButtonProps {
    spacing: number;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: ButtonStylingProps) => ({}),
}));

const Button = (props: ButtonProps) => {
    const { text, size, color, variant, onClick, customStyle = "", ...other } = props;
    const classes = useStyles({ ...props, spacing: 2 });

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            // color={color || "primary"}
            onClick={onClick}
            {...other}
            className={`${classes.root} ${customStyle}`}
        >
            {text}
        </MuiButton>
    );
};

export default Button;
