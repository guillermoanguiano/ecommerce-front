"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as S from "./Navbar.styled";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
    session: Session | null;
};

const Navbar = ({ session }: Props) => {
    const t = useTranslations("Navbar");
    const router = useRouter();
    const user = session?.user;

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: "#fff", boxShadow: "none", py: 1 }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
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
                    <S.Search sx={{ display: { xs: "none", md: "flex" } }}>
                        <S.SearchIconWrapper>
                            <SearchIcon />
                        </S.SearchIconWrapper>
                        <S.StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </S.Search>

                    <S.Links>
                        {user?.admin && (
                            <Button
                                onClick={() => router.push("/admin/dashboard")}
                                style={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                }}
                            >
                                Admin
                            </Button>
                        )}
                        {user ? (
                            <Button
                                sx={{ color: "#000", fontWeight: "bold", minWidth: "10rem", justifyContent: "flex-end" }}
                                onClick={() => signOut()}
                            >
                                {t("signOut")}
                            </Button>
                        ) : (
                            <Button sx={{ color: "#000", fontWeight: "bold" }}>
                                <Link href="/login">{t("signIn")}</Link>
                            </Button>
                        )}
                    </S.Links>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
