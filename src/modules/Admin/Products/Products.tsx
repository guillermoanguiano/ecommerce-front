"use client";
import ModalProducts from "@/components/Admin/Modals/ModalProducts";
import ProductTable from "@/components/Admin/Tables/ProductTable";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

type Props = {
    categories: [];
};

const Products = (props: Props) => {
    const [modal, setModal] = useState(false);
    const theme = useTheme();
    const t = useTranslations("Admin.Products");

    const handleClickOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
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
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#075dd6",
                        color: theme.palette.primary.main,
                        transition: "all 0.3s ease",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#126be9",
                            opacity: 0.9,
                        },
                    }}
                    onClick={handleClickOpen}
                >
                    {t("AddProduct")}
                </Button>
            </Stack>

            <ProductTable />

            <ModalProducts
                open={modal}
                handleClose={handleClose}
                categories={props.categories}
            />
        </Box>
    );
};

export default Products;
