import React, { useState } from "react";
import { Button, Dialog, Typography } from "@mui/material";
import * as S from "./Modal.styled";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { productApi } from "@/api/products";
import Snack from "@/utils/snack/snack";
import { getSizeOnMb } from "@/utils";
import { CloudUpload } from "@mui/icons-material";
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
            category: "",
            icon: "" as any,
        },
        validationSchema: Yup.object().shape({
            category: Yup.string().required(t("Required")),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const category = {
                name: values.category,
                icon: image as string
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

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const sizeMB = getSizeOnMb(reader.result as string);
            if (sizeMB > 5) {
                Snack.error(t("ImageTooLarge"));
                return;
            } else {
                setImage(reader.result);
                formik.setFieldValue("icon", file.name);
                formik.setFieldTouched("icon", true);
                formik.setFieldError("icon", "");
            }
        };
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

                        <Button
                            component="label"
                            htmlFor="icon"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                            sx={{ width: "100%" }}
                            color="info"
                        >
                            {formik.values.icon || t("UploadIcon")}
                            <S.hiddenInput
                                type="file"
                                onChange={getFile}
                                name="icon"
                                id="icon"
                                accept="image/png, image/icon"
                                value={formik.values.icon.name}
                                onError={() =>
                                    formik.setFieldError("icon", "Invalid icon")
                                }
                            />
                        </Button>
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
