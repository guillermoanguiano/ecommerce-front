import { Box, Drawer as MuiDrawer, styled } from "@mui/material";
import type { BoxProps as MuiBoxProps } from "@mui/material/Box";
import { drawerwidth } from "../../../utils/constants/index";

interface BoxProps extends MuiBoxProps {
    open: boolean;
    desktop: boolean | number; // I got a warning if I dont use number here
}

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: drawerwidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: drawerwidth,
        boxSizing: "border-box",
    },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.mixins.toolbar,
    img: {
        padding: 0,
    },
}));

const Container = styled(Box)<BoxProps>(({ theme, open, desktop }) => ({
    transition: "margin-left 0.2s, width 0.2s",
    marginTop: "64px",
    position: "relative",
    overflow: "auto",
    ...(desktop && {
        marginLeft: open ? `${drawerwidth}px` : 0,
        width: `calc(100% - ${open ? 240 : 0}px)`,
    }),
}));

export { DrawerHeader, Container, Drawer };
