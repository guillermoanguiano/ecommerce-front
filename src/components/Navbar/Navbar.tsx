"use client";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as S from './Navbar.styled';
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User.interface";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    } else {
      setUser(undefined);
    }
  }, [session]);

  return (
    <Box component="header" sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "green" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
          >
            LOGO
          </Typography>
          <S.Search>
            <S.SearchIconWrapper>
              <SearchIcon />
            </S.SearchIconWrapper>
            <S.StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </S.Search>

          {/* //TODO: arreglar bug de que al inciar sesion no aparece el usuario logueado hasta que se recargue la pagina */}

          {
            user ? (
              <Button sx={{ color: "white" }} onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Button sx={{ color: "white" }} >
                <Link href="/login">Login</Link>
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
