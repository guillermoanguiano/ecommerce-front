"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

declare module "@mui/material/styles" {
    interface PaletteOptions {
        toggled: {
            main: string;
        }
    }
}

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
            main: "#ffffff",
            dark: "#000000",
            light: "#f5f5f5",
        },
        background: {
            default: "#f5f5f5",
        },
        text: {
            primary: "#000000",
            secondary: "#B1B1B1",
            disabled: "#000000",
        },
        toggled: {
            main: "#000000",
        }
    },
});

export default theme;
