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
        color: "#495057",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#495057",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#ced4da;",
        },
        "&:hover fieldset": {
            borderColor: "#ced4da;",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#ced4da;",
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
    padding: "0.25rem 1.25rem",
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

const FileButton = style.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16rem;
    background-color: #f3f4f6;
    border-radius: 0.75rem;
    margin: 1rem auto;

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 16rem;
        padding: 1.5rem 1rem;
        background-color: white;
        color: #3490dc;
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-width: 1px;
        border-color: #3490dc;
        cursor: pointer;
    }

    label svg {
        width: 2rem;
        height: 2rem;
    }

    label span {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }

    label:hover {
        background-color: #3490dc;
        color: #fff;
    }
`;

export { Form, Rows, InputText, Input, SaveButton, ModalContainer, FileButton };
