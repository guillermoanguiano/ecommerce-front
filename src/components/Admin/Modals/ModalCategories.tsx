import React, { useState } from "react";
import {
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import * as S from "./Modal.styled";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { productApi } from "@/api/products";
import Snack from "@/utils/snack/snack";

type Props = {
    open: boolean;
    handleModalClose: () => void;
};

const ModalCategories = ({ open, handleModalClose }: Props) => {
    const [loading, setLoading] = useState(false);
    const t = useTranslations("Admin.Modals.Categories");

    const formik = useFormik({
        initialValues: {
            category: "",
            icon: "",
        },
        validationSchema: Yup.object().shape({
            category: Yup.string().required(t("Required")),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const category = values.category;
            const icon = values.icon;
            await saveCategory(category, icon);
            formik.resetForm();
            handleClose();
            setLoading(false);
        },
    });

    const saveCategory = async (name: string, icon: string) => {
        try {
            const res = await productApi.addCategory(name, icon);
            if (res.ok) {
                Snack.success(t("CategoryAdded"));
                console.log(res);
            } else {
                Snack.error(t("ErrorAddingCategory"));
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            Snack.error(t("ErrorAddingCategory"));
        }
    };

    const handleClose = () => {
        handleModalClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <S.ModalContainer sx={{ gap: "1rem" }}>
                <Typography variant="h6">{t("AddCategory")}</Typography>
                <S.Form onSubmit={formik.handleSubmit}>
                    <S.Rows>
                        <S.InputText
                            label={t("Category")}
                            variant="outlined"
                            fullWidth
                            type="text"
                            id="category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={
                                !!(
                                    formik.touched.category &&
                                    formik.errors.category
                                )
                            }
                            helperText={
                                formik.touched.category &&
                                formik.errors.category
                            }
                        />
                        <S.InputText
                            label={"Icon"}
                            variant="outlined"
                            fullWidth
                            type="text"
                            id="icon"
                            name="icon"
                            value={formik.values.icon}
                            onChange={formik.handleChange}
                            error={
                                !!(
                                    formik.touched.icon &&
                                    formik.errors.icon
                                )
                            }
                            helperText={
                                formik.touched.icon &&
                                formik.errors.icon
                            }
                        />
                        {/* TODO: Cambiar el servicio del lado del back a subir category-icons a cloudinary entonces tendriamos imagenes de categorias */}
                    </S.Rows>

                    <S.SaveButton
                        type="submit"
                        disabled={loading}
                        sx={{
                            alignSelf: { sm: "flex-end" },
                            marginTop: "1rem",
                        }}
                    >
                        {t("AddCategory")}
                    </S.SaveButton>
                </S.Form>
            </S.ModalContainer>
        </Dialog>
    );
};

export default ModalCategories;
