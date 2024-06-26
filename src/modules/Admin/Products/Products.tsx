"use client";
import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import ModalProducts from "@/components/Admin/Modals/ModalProducts";
import ProductTable from "@/components/Admin/Tables/ProductTable/ProductTable";
import * as S from "./Products.styled";
import { IProductCategory, IProductResponse } from "@/types/Product.interface";

type Props = {
    categories: IProductCategory[];
    products: IProductResponse;
};

const Products = (props: Props) => {
    const [modalProducts, setModalProducts] = useState(false);
    const t = useTranslations("Admin.Products");

    const handleModalProducts = () => {
        setModalProducts(!modalProducts);
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
