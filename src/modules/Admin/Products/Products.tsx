"use client";
import React, { useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import ModalCategories from "@/components/Admin/Modals/ModalCategories";
import ModalProducts from "@/components/Admin/Modals/ModalProducts";
import ProductTable from "@/components/Admin/Tables/ProductTable";
import * as S from "./Products.styled";
import { IProductCategory, IProductResponse } from "@/types/Product.interface";

type Props = {
    categories: IProductCategory[];
    products: IProductResponse;
};

const Products = (props: Props) => {
    const [modalProducts, setModalProducts] = useState(false);
    const [modalCategories, setModalCategories] = useState(false);
    const theme = useTheme();
    const t = useTranslations("Admin.Products");

    const handleModalProducts = () => {
        setModalProducts(!modalProducts);
    };

    const handleModalCategories = () => {
        setModalCategories(!modalCategories);
    };

    return (
        <Box component={"main"}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
                my={3}
                mx={3}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    {t("Products")}
                </Typography>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <S.AddButton
                        variant="contained"
                        onClick={handleModalProducts}
                    >
                        {t("AddProduct")}
                    </S.AddButton>
                </Box>
            </Stack>

            <ProductTable products={props.products} />

            <ModalProducts
                open={modalProducts}
                handleModalClose={handleModalProducts}
                categories={props.categories}
            />
        </Box>
    );
};

export default Products;
