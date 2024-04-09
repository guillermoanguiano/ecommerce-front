import { Box, Button, Dialog, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Rows, SelectStyled, TextFieldStyled } from "./styledComponents";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ProductCategory } from "@/types/Product.interface";

type Props = {
    open: boolean;
    handleClose: () => void;
    categories: string[];
};

const ModalProducts = ({ open, handleClose, categories }: Props) => {
    const [image, setImage] = useState<any>();
    const theme = useTheme();
    const t = useTranslations("Admin.Modals.Products");

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            price: "",
            description: "",
            stock: "",
            image: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            category: Yup.string().required("Category is required"),
            price: Yup.string().required("Price is required"),
            description: Yup.string().required("Description is required"),
            stock: Yup.string().required("Stock is required"),
            image: Yup.string().required("Image is required"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const getFile = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
        formik.setFieldValue("image", target.value);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <Box
                    sx={{
                        p: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                    }}
                >
                    <Typography variant="h6">{t("AddProduct")}</Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "35rem",
                            maxWidth: "100%",
                        }}
                    >
                        <Rows>
                            <TextFieldStyled
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
                                    !!(
                                        formik.touched.name &&
                                        formik.errors.name
                                    )
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <SelectStyled
                                labelId="category"
                                fullWidth
                                required
                                variant="outlined"
                                id="category"
                                name="category"
                                placeholder="Category"
                                value={formik.values.category}
                                label="Category"
                                onChange={formik.handleChange}
                                error={
                                    !!(
                                        formik.touched.category &&
                                        formik.errors.category
                                    )
                                }
                            >
                                {categories.map((category: ProductCategory | any) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </SelectStyled>
                        </Rows>
                        <Rows>
                            <TextFieldStyled
                                label="Price"
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="price"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={
                                    !!(
                                        formik.touched.price &&
                                        formik.errors.price
                                    )
                                }
                                helperText={
                                    formik.touched.price && formik.errors.price
                                }
                            />
                            <TextFieldStyled
                                label="Stock"
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="stock"
                                name="stock"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                error={
                                    !!(
                                        formik.touched.stock &&
                                        formik.errors.stock
                                    )
                                }
                                helperText={
                                    formik.touched.stock && formik.errors.stock
                                }
                            />
                        </Rows>
                        <TextFieldStyled
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

                        <input
                            type="file"
                            name="image"
                            onChange={getFile}
                            required
                            accept="image/*"
                            multiple
                            value={formik.values.image}
                        />

                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: "#075dd6",
                                color: theme.palette.primary.main,
                                transition: "all 0.3s ease",
                                fontWeight: "bold",
                                px: "1.5rem",
                                alignSelf: { sm: "flex-end" },
                                "&:hover": {
                                    backgroundColor: "#126be9",
                                    opacity: 0.9,
                                },
                            }}
                        >
                            {t("AddProduct")}
                        </Button>
                    </form>
                </Box>
            </Dialog>
        </>
    );
};

export default ModalProducts;
