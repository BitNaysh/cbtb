import { Box, List, ListItem, Theme, Typography } from "@mui/material";
import React, { RefObject, useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import { makeStyles } from "@mui/styles";
import navLinks from "./constants/navlinks";
import { NavLink, useLocation } from "react-router-dom";
import useHover from "../hooks/useHover";
import UserProfile from "./UserProfile";

interface ComponentProps {
    backgroundColor: string;
}

interface StylingProps extends ComponentProps {
    ref: RefObject<HTMLDivElement>;
    isHovered: boolean;
    open: boolean;
}

let activeIndex = 0;

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: StylingProps) => ({
        position: "sticky",
        top: 0,
        left: 0,
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(16),
        ...(!props.open && { width: theme.spacing(5.4) }),
        padding: `${theme.spacing(1.8)} ${theme.spacing(0.85)}`,
        color: theme.palette.primary.contrastText,
        display: "flex",
        flexDirection: "column",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeInOut,
            duration: "500ms",
        }),
        // ...(props.isHovered && {
        //     backgroundColor: theme.palette.secondary.main,
        // }),

        "&::before": {
            content: '""',
            position: "absolute",
            width: theme.spacing(2),
            height: "100%",
            top: "0",
            left: "100%",
        },

        "&:hover": {
            "& .shrink-button": {
                transform: "translateY(-50%) translateX(0px)",
                opacity: "1",
                pointerEvents: "all",
            },
        },
    }),
    SideBarList: (props: StylingProps) => ({
        marginTop: theme.spacing(1),
        "& .MuiList-root": {
            position: "relative",
        },
    }),
    listItem: (props: StylingProps) => ({
        height: theme.spacing(2.5),
    }),
    itemIcon: (props: StylingProps) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: theme.spacing(3.7),
    }),
    itemText: (props: StylingProps) => ({
        fontWeight: "600",
    }),
    activeTab: (props: StylingProps) => ({
        width: "100%",
        height: theme.spacing(2.5),
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "6px",
        marginTop: theme.spacing(0.5),
        transform: `translateY(${theme.spacing(2.5 * activeIndex)})`,
        transition: theme.transitions.create("transform", {
            duration: "200ms",
        }),
        position: "absolute",
        top: 0,
        zIndex: 0,
    }),
}));

const SideBar = (props: ComponentProps) => {
    const [ref, isHovered] = useHover<HTMLDivElement>();
    const [open, setOpen] = useState<boolean>(true);
    const location = useLocation();

    const [textShrinking, setTextShrinking] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setTextShrinking(false);
        }, 250);
        return () => {
            clearTimeout(timer);
        };
    }, [open, textShrinking]);

    const classes = useStyles({ ...props, ref, isHovered, open });

    return (
        <Box ref={ref} className={classes.root} component='nav'>
            <SidebarHeader
                open={open}
                setOpen={setOpen}
                isHovered={isHovered}
                textShrinking={textShrinking}
                setTextShrinking={setTextShrinking}
            ></SidebarHeader>
            {/* sidebar links */}

            <Box className={classes.SideBarList}>
                <List>
                    <Box className={classes.activeTab}></Box>
                    {navLinks.map((item) => {
                        let isActive =
                            location.pathname === `/${item.route}` ||
                            (item.route === "dashboard" && location.pathname === "/");

                        if (isActive) {
                            activeIndex = item.id;
                        }
                        return (
                            <NavLink to={`/${item.route}`}>
                                <ListItem className={classes.listItem}>
                                    <Box className={classes.itemIcon}>
                                        {isActive ? <item.iconSolid /> : <item.iconOutlined />}
                                    </Box>

                                    {open && !textShrinking && (
                                        <Typography
                                            variant='subtitle1'
                                            component='h6'
                                            color={isActive ? "neutral.contrastText" : "inherit"}
                                            className={classes.itemText}
                                        >
                                            {item.name}
                                        </Typography>
                                    )}
                                </ListItem>
                            </NavLink>
                        );
                    })}
                </List>
            </Box>

            {/* user profile */}
            {/* <UserProfile /> */}
        </Box>
    );
};

export default SideBar;
