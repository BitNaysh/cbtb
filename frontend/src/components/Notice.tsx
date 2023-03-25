import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import React from "react";

interface NoticeProps {
    title: string;
    content: string;
    linkText?: string;
    link?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: theme.palette.primary.light,
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        color: "white",
        "& h1": {
            paddingBottom: theme.spacing(2),
        },
    },
}));

const Notice = (props: NoticeProps) => {
    const { title, content, linkText, link } = props;

    const classes = useStyles();
    return (
        <Box component='main' className={classes.main}>
            <Typography style={{ display: "block" }} variant='h1'>
                {title}
            </Typography>
            <Typography variant='h6'>{content}</Typography>
        </Box>
    );
};

export default Notice;
