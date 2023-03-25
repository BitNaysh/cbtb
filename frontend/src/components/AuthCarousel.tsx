import React, { useState } from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import image1 from "../assets/carousel-image-1.png";
import image2 from "../assets/carousel-image-2.png";
import image3 from "../assets/carousel-image-3.png";

interface AuthCarouselProps {
    form: string;
    customStyles: { carousel: string };
    [other: string]: any;
}

interface AuthCarouselStylingProps extends AuthCarouselProps {
    imageShowIndex: 0 | 1 | 2;
}

const stylingConstants = {
    carouselBorderRadius: "2rem",
};

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: AuthCarouselStylingProps) => ({
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr",
        paddingBottom: "2rem", // auto will fit to content and 1fr will take up the rem. space by expanding
        backgroundColor: "#e7c7da",
        borderRadius: stylingConstants.carouselBorderRadius,
        overflow: "hidden",
    }),
    imagesWrapper: (props: AuthCarouselStylingProps) => ({
        display: "grid",
        position: "relative",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        "& img": {
            width: "100%",
            gridColumn: "1/2",
            gridRow: "1/2",
            opacity: 0,
            transition: "opacity 0.3s, transform 0.5s",
        },
        "& img:nth-child(1)": { transform: "translate(0, -50px)" },
        "& img:nth-child(2)": { transform: "scale(0.4, 0.5)" },
        "& img:nth-child(3)": { transform: "scale(0.3) rotate(-20deg)" },
        [`& img:nth-child(${props.imageShowIndex + 1})`]: {
            opacity: 1,
            transform: "none",
        },
    }),
    textSlider: (props: AuthCarouselStylingProps) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    }),
    textWrap: (props: AuthCarouselStylingProps) => ({
        maxHeight: "2.2rem",
        overflow: "hidden",
        marginBottom: "2.5rem",
    }),
    textGroup: (props: AuthCarouselStylingProps) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "0.5s",
        "& h2": {
            lineHeight: "2.2rem",
            fontWeight: 600,
            fontSize: "1.6rem",
        },
        transform: `translateY(${-props.imageShowIndex * 2.2}rem)`,
    }),
    bullets: (props: AuthCarouselStylingProps) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& span": {
            display: "block",
            width: "0.5rem",
            height: "0.5rem",
            backgroundColor: "#aaa",
            margin: "0 0.25rem",
            borderRadius: "50%",
            cursor: "pointer",
            transition: "0.3s",
        },
        "& span:nth-child(1)": {
            ...(props.imageShowIndex === 0 && {
                width: "1.1rem",
                backgroundColor: "#151111",
                borderRadius: "1rem",
            }),
        },
        "& span:nth-child(2)": {
            ...(props.imageShowIndex === 1 && {
                width: "1.1rem",
                backgroundColor: "#151111",
                borderRadius: "1rem",
            }),
        },
        "& span:nth-child(3)": {
            ...(props.imageShowIndex === 2 && {
                width: "1.1rem",
                backgroundColor: "#151111",
                borderRadius: "1rem",
            }),
        },
    }),
}));

const AuthCarousel = (props: AuthCarouselProps) => {
    const [imageShowIndex, setImageShowIndex] = useState<0 | 1 | 2>(0);
    const classes = useStyles({ ...props, imageShowIndex });
    const { customStyles, ...other } = props;

    const moveSlider = (index: 0 | 1 | 2) => () => {
        setImageShowIndex(index);
    };

    return (
        <Box {...other} className={`${classes.root} ${customStyles.carousel}`}>
            <Box className={classes.imagesWrapper}>
                <img src={image1} alt='img-1' />
                <img src={image2} alt='img-2' />
                <img src={image3} alt='img-3' />
            </Box>
            <Box className={classes.textSlider}>
                <Box className={classes.textWrap}>
                    <Box className={classes.textGroup}>
                        <Typography variant='h2'>Create your own courses</Typography>
                        <Typography variant='h2'>Customize as you like</Typography>
                        <Typography variant='h2'>Invite students to your class</Typography>
                    </Box>
                </Box>
                <Box className={classes.bullets}>
                    <Box onClick={moveSlider(0)} component='span'></Box>
                    <Box onClick={moveSlider(1)} component='span'></Box>
                    <Box onClick={moveSlider(2)} component='span'></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthCarousel;
