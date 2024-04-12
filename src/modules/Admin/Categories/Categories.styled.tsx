import { Button, styled } from "@mui/material";

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#FFF",
    color: theme.palette.primary.dark,
    transition: "all 0.3s ease",
    fontWeight: "bold",
    padding: "0.25rem 1.25rem",
    "&:hover": {
        opacity: 0.9,
        backgroundColor: "#F1F1F1",
    }
}));

export { AddButton };
