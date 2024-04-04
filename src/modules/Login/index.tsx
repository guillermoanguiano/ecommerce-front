"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

// Validation
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";

// Translations
import { useTranslations } from "next-intl";

// Utils
import Snack from "@/utils/snack/snack";

interface Props {
  locale: string;
}

const Login = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Login");
  const v = useTranslations("Validation");
  const router = useRouter();

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
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        Snack.error(t("error"));
      } else {
        router.push("/");
      }
      formik.resetForm();
      setIsLoading(false);
    },
  });

  return (
    <Container maxWidth="xs" component={"main"}>
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
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
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
    </Container>
  );
};

export default Login;
