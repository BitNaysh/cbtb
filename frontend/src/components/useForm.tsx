import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import React, { useState } from "react";

export const useForm = <T,>(
    initialFormValues: T,
    validateOnChange: boolean = false,
    validate: (fieldValues: Partial<T>) => void
) => {
    const [values, setValues] = useState<T>(initialFormValues);
    const [errors, setErrors] = useState<Partial<T>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validateOnChange) validate({ ...values, [name]: value });
    };

    const resetForm = () => {
        setValues(initialFormValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    };
};

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: any) => ({
        root: {
            color: theme.palette.secondary.contrastText,
        },
    }),
}));

export const Form = (props: any) => {
    const classes = useStyles(props);
    const { children, ...others } = props;
    return (
        <form className={classes.root} autoComplete='off' {...others}>
            {children}
        </form>
    );
};
