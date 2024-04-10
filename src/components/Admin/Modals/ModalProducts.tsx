import {
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./Modal.styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Product } from "@/types/Product.interface";
import Snack from "@/utils/snack/snack";
import { getSizeOnMb } from "@/utils";
import { productApi } from "@/api/admin/products";

interface Category {
    id: number;
    name: string;
}

type Props = {
    open: boolean;
    handleModalClose: () => void;
    categories: Category[];
};

const ModalProducts = ({ open, handleModalClose, categories }: Props) => {
    const [image, setImage] = useState<any>();
    const t = useTranslations("Admin.Modals.Products");

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "" as Category | any,
            price: "",
            description: "",
            stock: "",
            image: "" as any,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            category: Yup.string().required("Category is required"),
            price: Yup.string().required("Price is required"),
            description: Yup.string().required("Description is required"),
            stock: Yup.string().required("Stock is required"),
            image: Yup.string().required("Image is required"),
        }),
        onSubmit: async (values) => {
            const product = {
                ...values,
                image: image as string,
                category: values.category.label,
                stock: Number(values.stock),
            };
            console.log(product);
            await saveProduct(product);
            formik.resetForm();
            setImage(null);
            handleClose();
        },
    });

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const sizeMB = getSizeOnMb(reader.result as string);
            if (sizeMB > 1.5) {
                Snack.error("Image size should be less than 1.5MB");
                return;
            } else {
                setImage(reader.result);
                formik.setFieldValue("image", file.name);
                formik.setFieldTouched("image", true);
                formik.setFieldError("image", "");
            }
        };
    };

    const saveProduct = async (values: Product) => {
        try {
            const res = await productApi.addProduct(values);
            if (res.ok) {
                Snack.success("Product added successfully");
                console.log(res);
            } else {
                Snack.error("Error adding product");
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            Snack.error("Error adding product");
        }
    };

    const handleClose = () => {
        handleModalClose();
        formik.resetForm();
        setImage(null);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <S.ModalContainer>
                <Typography variant="h6">{t("AddProduct")}</Typography>
                <S.Form onSubmit={formik.handleSubmit}>
                    <S.Rows>
                        <S.InputText
                            label={t("Name")}
                            variant="outlined"
                            fullWidth
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.name && formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                        <FormControl fullWidth>
                            <InputLabel id="category-label">
                                {t("Category")}
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={formik.values.category}
                                onChange={(event) => {
                                    formik.setFieldValue(
                                        "category",
                                        event.target.value
                                    );
                                }}
                                error={
                                    !!(
                                        formik.touched.category &&
                                        formik.errors.category
                                    )
                                }
                            >
                                {categories.map((category: Category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </S.Rows>
                    <S.Rows>
                        <S.InputText
                            label={t("Price")}
                            variant="outlined"
                            fullWidth
                            type="number"
                            id="price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.price && formik.errors.price)
                            }
                            helperText={
                                formik.touched.price && formik.errors.price
                            }
                        />
                        <S.InputText
                            label={t("Stock")}
                            variant="outlined"
                            fullWidth
                            type="number"
                            id="stock"
                            name="stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.stock && formik.errors.stock)
                            }
                            helperText={
                                formik.touched.stock && formik.errors.stock
                            }
                        />
                    </S.Rows>
                    <S.InputText
                        label={t("Description")}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            !!(
                                formik.touched.description &&
                                formik.errors.description
                            )
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />

                    <S.FileButton>
                        <label htmlFor="image">
                            <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span>{formik.values.image || "Select image"}</span>
                            <S.Input
                                id="image"
                                type="file"
                                name="image"
                                onChange={getFile}
                                value={formik.values.image.name}
                                style={{ display: "none" }}
                                onError={() =>
                                    formik.setFieldError("image", "")
                                }
                            />
                        </label>
                    </S.FileButton>

                    <S.SaveButton
                        type="submit"
                        sx={{
                            alignSelf: { sm: "flex-end" },
                        }}
                    >
                        {t("AddProduct")}
                    </S.SaveButton>
                </S.Form>
            </S.ModalContainer>
        </Dialog>
    );
};

export default ModalProducts;
