"use client";
import { Menu as MenuIcon, NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, ToggleButton, ToggleButtonGroup, Toolbar, useTheme } from "@mui/material";
import React from "react";
import { MX, US } from 'country-flag-icons/react/3x2';
import { AppBar } from "./Navbar.styled";
import { useSession } from "next-auth/react";
import { useRouter } from "@/navigation";
import { useParams } from "next/navigation";

type Props = {
    locale: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    drawerwidth: number;
};

const Navbar = ({ locale: lang, open, setOpen, drawerwidth }: Props) => {
    const { data: session } = useSession();
    const router = useRouter();
    const params = useParams();
    const theme = useTheme();

    const user = session?.user;

    const handleDrawer = () => {
        setOpen((prev) => !prev);
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
        <AppBar
            position="absolute"
            open={open}
            drawerwidth={drawerwidth}
            sx={{ backgroundColor: theme.palette.primary.main }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        aria-label="open drawer"
                        color="inherit"
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
                        <ToggleButton value="es" sx={{ py: 0.5, px: 1 }}>
                            <MX style={{ width: 22, height: 22 }} />
                        </ToggleButton>
                        <ToggleButton value="en" sx={{ py: 0.5, px: 1 }}>
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
    );
};

export default Navbar;
