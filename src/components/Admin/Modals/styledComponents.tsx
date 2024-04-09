import { Box, Button, TextField, styled } from "@mui/material";
import style from "@emotion/styled";

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

const InputText = styled(TextField)(({ theme }) => ({
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
            borderColor: "#E1E1E1",
        },
    },
    "& .MuiInputBase-input[type=number]": {
        MozAppearance: "textfield",
    },
}));

const SaveButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#075dd6",
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
    fontWeight: "bold",
    paddingX: "1.5rem",
    "&:hover": {
        backgroundColor: "#126be9",
        opacity: 0.9,
    },
}));

const Input = style.input`
  &[type="file"]::-webkit-file-upload-button {
    border-radius: 4px;
    padding: 0 16px;
    height: 40px;
    cursor: pointer;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
    margin-right: 16px;
    transition: background-color 200ms;
  }

  &[type="file"]::-webkit-file-upload-button:hover {
    background-color: #f3f4f6;
  }

  &[type="file"]::-webkit-file-upload-button:active {
    background-color: #e5e7eb;
  }
`;

const Form = style.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35rem;
  max-width: 100%;
`;

const ModalContainer = styled(Box)(({ theme }) => ({
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
}));

export { Form, Rows, InputText, Input, SaveButton, ModalContainer };
