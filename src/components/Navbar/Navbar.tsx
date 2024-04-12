"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as S from "./Navbar.styled";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (session) {
            setUser(session.user as unknown as User);
        } else {
            setUser(undefined);
        }
    }, [session]);

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none", py: 1 }}>
                <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                    <Link style={{ maxHeight: "3rem" }} href="/admin/dashboard">
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
                    <S.Search>
                        <S.SearchIconWrapper>
                            <SearchIcon />
                        </S.SearchIconWrapper>
                        <S.StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </S.Search>

                    {user ? (
                        <Button
                            sx={{ color: "#000", fontWeight: "bold" }}
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button sx={{ color: "#000", fontWeight: "bold" }}>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
