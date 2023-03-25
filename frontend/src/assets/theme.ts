import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
    }
    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
    }
}

export const myTheme = createTheme({
    palette: {
        primary: {
            main: "#3d5af1",
            light: "#5872f5",
            dark: "#3651d4",
            contrastText: "#cfcde7",
        },
        secondary: {
            main: "#f83245",
            light: "#f8324526",
            contrastText: "#1f2027",
        },
        background: {
            default: "#e4e2f5",
        },
        neutral: {
            main: "#cccccc",
            contrastText: "#ffffff",
        },
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    spacing: 16,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#e4e2f5", // not necessary already set in palette.background.default
                    overflowX: "hidden",
                    "& #root": {
                        width: "100%",
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "row",
                        position: "relative",
                    },
                },
                a: {
                    textDecoration: "none",
                    padding: 0,
                    margin: 0,
                    color: "inherit",
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    display: "flex",
                    padding: 0,
                    margin: 0,
                    alignItems: "center",
                    justifyContent: "start",
                },
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    display: "inline-block",
                    width: "100%",
                    border: "none",
                    borderRadius: "0.8rem",
                    marginBottom: "2rem",
                    transition: "0.3s",
                    backgroundColor: "#3651d4", // primary.dark
                    "&:hover": {
                        backgroundColor: "#5872f5", // primary.light
                    },
                },
            },
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    shape: {
        borderRadius: "12px",
    },
});

export default myTheme;
