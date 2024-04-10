import { Box, Button, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const EditButton = styled(Button)(({ theme }) => ({
    color: "#000",
    border: "1px solid #000",
    "&:hover": {
        opacity: 0.8,
        borderColor: "#000",
        color: "#000",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ContainerTable = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0.5px 3px 3px",
    marginLeft: "2.5rem",
    marginRight: "2.5rem",
    height: "100vh",
}));

const CardBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "12rem",
    height: "100%",
}));

const EditIcon = styled(Edit)(({ theme }) => ({
    width: "1rem",
    marginBottom: "0.1rem",
    marginRight: "-0.25rem",
}));

const DeleteIcon = styled(Delete)(({ theme }) => ({
    width: "1rem",
    marginBottom: "0.1rem",
    marginRight: "-0.25rem",
}))

export { EditButton, ContainerTable, CardBox, EditIcon, DeleteIcon };
