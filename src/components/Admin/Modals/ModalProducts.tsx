import {
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./Modal.styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { IProductAPI, IProductCategory } from "@/types/Product.interface";
import Snack from "@/utils/snack/snack";
import { getSizeOnMb } from "@/utils";
import { productApi } from "@/api/products";
import { useRouter } from "next/navigation";

type Props = {
    open: boolean;
    handleModalClose: () => void;
    categories: IProductCategory[];
};

const ModalProducts = ({ open, handleModalClose, categories }: Props) => {
    const [image, setImage] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations("Admin.Modals.Products");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "" as IProductCategory | any,
            price: "",
            description: "",
            stock: "",
            image: [] as any,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            category: Yup.string().required("Category is required"),
            price: Yup.string().required("Price is required"),
            description: Yup.string().required("Description is required"),
            stock: Yup.string().required("Stock is required"),
            image: Yup.array().required("Image is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const product = {
                ...values,
                images: image as string[],
                category: values.category,
                stock: Number(values.stock),
            };
            console.log(values);
            await saveProduct(product);
            formik.resetForm();
            setImage([]);
            handleClose();
            setLoading(false);
            router.refresh();
        },
    });

    const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        const files = Object.keys(target.files);
        let names: string[] = [];
        for (const file of files) {
            names.push(target.files?.[Number(file)].name);
            const img = target.files?.[Number(file)];
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = () => {
                const sizeMB = getSizeOnMb(reader.result as string);
                if (sizeMB > 5) {
                    Snack.error(t("ImageTooLarge"));
                    return;
                } else {
                    setImage([ reader.result, ...image ]);
                }
            };
        }
        formik.setFieldValue("image", names);
        formik.setFieldError("image", "Invalid image");
    };

    const saveProduct = async (values: IProductAPI) => {
        try {
            const res = await productApi.addProduct(values);
            if (res.ok) {
                Snack.success(t("ProductAdded"));
                console.log(res);
            } else {
                Snack.error(t("ErrorAddingProduct"));
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            Snack.error(t("ErrorAddingProduct"));
        }
    };

    const handleClose = () => {
        handleModalClose();
        formik.resetForm();
        setImage([]);
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
                                {categories.map((category: IProductCategory) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
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
                                multiple
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
                        disabled={loading}
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
