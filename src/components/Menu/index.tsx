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
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";

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
    const { data: session } = useSession();
    const theme = useTheme();

    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

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
        // @ts-expect-error
        router.push(`/admin/${link}`);
    };

    const handleCountry = (
        event: React.MouseEvent<HTMLElement>,
        country: string
    ) => {
        router.replace(
            // @ts-expect-error
            { pathname, params },
            { locale: country }
        );
        router.refresh();
    };

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
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <ToggleButtonGroup
                                color="standard"
                                value={lang}
                                exclusive
                                onChange={handleCountry}
                                aria-label="Platform"
                            >
                                <ToggleButton value="es" sx={{ padding: 0.5 }}>
                                    <MX style={{ width: 22, height: 22 }} />
                                </ToggleButton>
                                <ToggleButton value="en" sx={{ padding: 0.5 }}>
                                    <US style={{ width: 22, height: 22 }} />
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
