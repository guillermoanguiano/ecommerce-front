"use client";
import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  locale: string;
}

const Login = (props: Props) => {
  const t = useTranslations("Login");
  const v = useTranslations("Validation");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(v("email")).email(),
      password: Yup.string()
        .required(v("password"))
        .min(8, v("min", { min: 8 })),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      formik.resetForm();
    },
  });

  return (
    <Box
      sx={{
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("title")}
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1, minWidth: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("email")}
          name="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("password")}
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("title")}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#">{t("forgotPassword")}</Link>
          </Grid>
          <Grid item>
            <Link href={`/${props.locale}/sign-up`}>{t("register")}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
