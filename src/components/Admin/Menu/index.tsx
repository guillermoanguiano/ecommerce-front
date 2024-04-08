"use client";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DrawerHeader } from "./Menu.styled";
import { useTranslations } from "next-intl";
import { AddBusiness, Home, People, ShoppingBag } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "@/navigation";
import Navbar from "../Navbar/Navbar";

// Change this to dynamic link
const drawerwidth = 240;
const links = ["dashboard", "products", "orders", "users"];

type Props = {
    children: React.ReactNode;
    locale: string;
};

const Menu = ({ children, locale: lang }: Props) => {
    const [open, setOpen] = useState(false);
    const text = useTranslations("Admin.Menu");
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const list = [
        { text: text("dashboard"), icon: <Home /> },
        { text: text("products"), icon: <AddBusiness /> },
        { text: text("orders"), icon: <ShoppingBag /> },
        { text: text("users"), icon: <People /> },
    ];

    const handleLink = (link: string) => {
        // @ts-expect-error
        router.push(`/admin/${link}`);
    };

    return (
        <>
            <Box>
                <Navbar
                    locale={lang}
                    open={open}
                    setOpen={setOpen}
                    drawerwidth={drawerwidth}
                />
                <Drawer
                    sx={{
                        width: drawerwidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerwidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader sx={{ textAlign: "center" }}>
                        <Link href="/admin/dashboard">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={150}
                                height={150}
                                priority
                                style={{
                                    objectFit: "cover",
                                    width: "10rem",
                                    height: "5rem",
                                    maxWidth: "100%",
                                }}
                            />
                        </Link>
                    </DrawerHeader>
                    <Divider />
                    <List
                        sx={{
                            color: theme.palette.text.secondary,
                            paddingTop: 0,
                        }}
                    >
                        {list.map((item, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    display: "block",
                                    ...(pathname ===
                                        `/admin/${links[index]}` && {
                                        borderLeft: "3.5px solid blue",
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        transition: "0.3s all",
                                    }),
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: "center",
                                        px: 4.5,
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
            <Box
                sx={{
                    ml: open ? `${drawerwidth}px` : 0,
                    transition: "0.2s all",
                    marginTop: "64px",
                }}
            >
                {children}
            </Box>
        </>
    );
};

export default Menu;
