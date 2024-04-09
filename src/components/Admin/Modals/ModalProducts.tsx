import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    Typography,
    useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styledComponents";
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
    const theme = useTheme();
    const t = useTranslations("Admin.Modals.Products");

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "" as Category | any,
            price: "",
            description: "",
            stock: "",
            image: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            category: Yup.mixed().required("Category is required"),
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
                formik.setFieldValue("image", target.value);
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
                            label="Name"
                            variant="outlined"
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        <Autocomplete
                            id="category"
                            fullWidth
                            freeSolo
                            value={formik.values.category}
                            options={categories.map((category: Category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            isOptionEqualToValue={(option, value) =>
                                option.value === value.value
                            }
                            renderInput={(params) => (
                                <S.InputText
                                    {...params}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Category"
                                    error={
                                        !!(
                                            formik.touched.category &&
                                            formik.errors.category
                                        )
                                    }
                                />
                            )}
                            onChange={(_, value) => {
                                formik.setFieldValue("category", value);
                            }}
                        />
                    </S.Rows>
                    <S.Rows>
                        <S.InputText
                            label="Price"
                            variant="outlined"
                            fullWidth
                            required
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            label="Stock"
                            variant="outlined"
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
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

                    <S.Input
                        type="file"
                        name="image"
                        onChange={getFile}
                        required
                        multiple
                        value={formik.values.image}
                    />

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
