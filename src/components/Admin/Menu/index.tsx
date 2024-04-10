"use client";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import * as S from "./Menu.styled";
import { useTranslations } from "next-intl";
import { AddBusiness, Home, People, ShoppingBag } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "@/navigation";
import Navbar from "../Navbar/Navbar";

// Change this to dynamic link
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
    const isDesktop = useMediaQuery("(min-width:1024px)");

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
                <Navbar locale={lang} open={open} setOpen={setOpen} />
                <S.Drawer
                    variant={isDesktop ? "persistent" : "temporary"}
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <S.DrawerHeader sx={{ textAlign: "center" }}>
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
                                    height: "3rem",
                                    maxWidth: "100%",
                                }}
                            />
                        </Link>
                    </S.DrawerHeader>
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
                </S.Drawer>
            </Box>
            <S.Container
                open={open}
                desktop={isDesktop ? 1 : 0}
            >   
                {children}
            </S.Container>
        </>
    );
};

export default Menu;
