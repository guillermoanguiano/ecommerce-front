import { Box, Select, TextField, styled } from "@mui/material";

const Rows = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    "& .MuiTextField-root": {
        width: "100%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
        color: "#b8b6b6", 
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#b8b6b6",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#E1E1E1", 
        },
        "&:hover fieldset": {
            borderColor: "#E1E1E1", 
        },
        "&.Mui-focused fieldset": {
            borderColor: "#E1E1E1"
        },
    },
}));

const SelectStyled = styled(Select)(({ theme }) => ({
 
    "& .MuiSelect-outlined": {
        borderColor: "#9e3434", 
    },
}))

export { Rows, TextFieldStyled, SelectStyled };
