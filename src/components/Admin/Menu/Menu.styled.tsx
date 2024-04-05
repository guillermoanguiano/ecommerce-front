import {  styled } from "@mui/material";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
  img: {
    padding: 0,
  }
}));


export { DrawerHeader };