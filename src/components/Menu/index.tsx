"use client";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { AppBar, DrawerHeader } from "./styledComponent";
import { useTranslations } from "next-intl";
import {
    AddBusiness,
    Home,
    People,
    ShoppingBag,
    Menu as MenuIcon,
    NotificationsOutlined,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserFrontend } from "@/interfaces/User.interface";
import { MX, US } from "country-flag-icons/react/3x2";
import { usePathname } from "next/navigation";

const links = ["dashboard", "products", "orders", "users"];

type Props = {
    children: React.ReactNode;
    locale: string;
};

const Menu = ({ children, locale }: Props) => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState(locale === "es" ? "MX" : "US");
    const text = useTranslations("Admin.Menu");
    const { data: session } = useSession();
    const theme = useTheme();
    const drawerwidth = 240;

    const user = session?.user as UserFrontend;

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

    const handleCountry = (country: string) => {
        setCountry(country);

    }

    return (
        <>
            <Box>
                <AppBar
                    position="absolute"
                    open={open}
                    drawerwidth={drawerwidth}
                    sx={{ backgroundColor: theme.palette.primary.main }}
                >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawer}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Overview
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <ToggleButtonGroup
                                color="primary"
                                value={country}
                                exclusive
                                // onChange={(e) => handleCountry(e.target.value)}
                                aria-label="Platform"
                            >
                                <ToggleButton value="es">
                                    <MX style={{ width: 20, height: 20 }} />
                                </ToggleButton>
                                <ToggleButton value="en">
                                    <US style={{ width: 20, height: 20 }} />
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <IconButton>
                                <NotificationsOutlined />
                            </IconButton>

                            <Avatar>{user?.firstName.charAt(0)}</Avatar>
                        </Box>
                    </Toolbar>
                </AppBar>
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
                                    width: "auto",
                                    height: "auto",
                                    maxWidth: "100%",
                                }}
                            />
                        </Link>
                    </DrawerHeader>
                    <Divider />
                    <List sx={{ color: theme.palette.text.secondary }}>
                        {list.map((item, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ display: "block" }}
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
