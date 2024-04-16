import React, { useState } from "react";
import { Dialog, Typography } from "@mui/material";
import * as S from "./Modal.styled";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { productApi } from "@/api/products";
import Snack from "@/utils/snack/snack";
import { IProductCategory } from "@/types/Product.interface";

type Props = {
    open: boolean;
    handleModalClose: () => void;
};

const ModalCategories = ({ open, handleModalClose }: Props) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<any>();
    const t = useTranslations("Admin.Modals.Categories");

    const formik = useFormik({
        initialValues: {
            category: ""
        },
        validationSchema: Yup.object().shape({
            category: Yup.string().required(t("Required")),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const category = {
                name: values.category
            }
            await saveCategory(category);
            formik.resetForm();
            handleClose();
            setLoading(false);
        },
    });

    const saveCategory = async (values: IProductCategory) => {
        try {
            const res = await productApi.addCategory(values);
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
