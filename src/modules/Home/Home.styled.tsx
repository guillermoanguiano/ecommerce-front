import { Box, styled } from "@mui/material";

const ContainerCategories = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    marginTop: 2,
}));

const Category = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    borderRadius: "0.75rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0.5px 3px 3px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#f3f4f6",
    },
}));

export { ContainerCategories, Category };
