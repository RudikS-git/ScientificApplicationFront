import { createTheme } from "@mui/material";

export const baseTheme = createTheme({
    typography: {
        fontFamily: "Roboto",

        h1: {
            fontSize: '32px',
            color: "var(--color-gray)",
        },

        h2: {
            fontSize: '24px',
            color: "var(--color-gray)",
        },

        h3: {
            fontSize: '16px',
            color: "var(--color-gray)",
        },
    },

    palette: {
        text: {
            primary: "#6a6a6a"
        },
        primary: {
            main: "#2B98EE",
        },

    }
});
