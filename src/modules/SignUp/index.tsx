"use client";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "@/types/User.interface";
import { useRouter } from "next/navigation";
import Snack from "@/utils/snack/snack";
import { usersApi } from "@/api/admin/users";

type Props = {
    locale: string;
};

const SignUp = ({ locale }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("SignUp");
    const v = useTranslations("Validation");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required(v("name")),
            lastName: Yup.string().required(v("name")),
            email: Yup.string().required(v("email")).email(),
            password: Yup.string()
                .required(v("password"))
                .min(8, v("min", { min: 8 })),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            await signUp(values);
            formik.resetForm();
            setIsLoading(false);
        },
    });

    const signUp = async (data: User) => {
        try {
            const res = await usersApi.signUp(data);

            if (!res.ok) {
                Snack.error(res.statusText);
                return;
            }

            Snack.success(v("success"));
            router.push("/login");
        } catch (error) {
            Snack.error(v("error"));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
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
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label={t("firstName")}
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                error={
                                    !!(
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    )
                                }
                                helperText={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label={t("lastName")}
                                name="lastName"
                                autoComplete="family-name"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                error={
                                    !!(
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                    )
                                }
                                helperText={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label={t("email")}
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={
                                    !!(
                                        formik.touched.email &&
                                        formik.errors.email
                                    )
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label={t("password")}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="new-password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={
                                    !!(
                                        formik.touched.password &&
                                        formik.errors.password
                                    )
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {t("register")}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href={`/${locale}/login`}>
                                {t("alreadyHaveAnAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
