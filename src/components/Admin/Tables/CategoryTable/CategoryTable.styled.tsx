import { TableContainer, styled } from "@mui/material";

const Container = styled(TableContainer)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#fff",
    padding: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0.5px 3px 3px",
    borderRadius: "5px",
    margin: "0 auto",
}));

export { Container };
