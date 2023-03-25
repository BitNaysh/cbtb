import React from "react";
import { TextField } from "@mui/material";

interface MuiInputProps {
    name: string;
    label: string;
    value: string;
    error?: any;
    onChange: () => void;
}

const MuiInput = (props: MuiInputProps) => {
    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        <TextField
            variant='outlined'
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
            {...other}
        />
    );
};

export default MuiInput;
