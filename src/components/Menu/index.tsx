"use client";
import {
    AppBar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Drawer, DrawerHeader } from "./styledComponent";
import { useTranslations } from "next-intl";
import { AddBusiness, Home, People, ShoppingBag } from "@mui/icons-material";

const links = ["dashboard", "products", "orders", "users"];

type Props = {};

const Menu = (props: Props) => {
    const [open, setOpen] = useState(false);
    const text = useTranslations("Admin.Menu");
    const theme = useTheme();

    const list = [
        { text: text("dashboard"), icon: <Home /> },
        { text: text("products"), icon: <AddBusiness /> },
        { text: text("orders"), icon: <ShoppingBag /> },
        { text: text("users"), icon: <People /> },
    ];

    const handleDrawer = () => {
        setOpen((prev) => !prev);
    };

    const handleLink = (link: string) => {
        console.log(link); // TODO: handle link
    };

    return (
        <Box>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ textAlign: "center" }}>
                    Logo
                    <br />
                    texto
                </DrawerHeader>
                <Divider />
                <List>
                    {list.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                                onClick={() => handleLink(links[index])}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ opacity: open ? 1 : 0 }}
                                >
                                    {item.text}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default Menu;
