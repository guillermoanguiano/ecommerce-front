import { Button, styled } from "@mui/material";

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#075dd6",
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
    fontWeight: "bold",
    padding: "0.25rem 1.25rem",
    "&:hover": {
        opacity: 0.9,
        backgroundColor: '#126be9',
    },
}));

export { AddButton }