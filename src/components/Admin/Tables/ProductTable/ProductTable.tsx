import { IProductResponse } from "@/types/Product.interface";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import * as S from "./ProductTable.styled";
import { convertToMoney } from "@/utils";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { productApi } from "@/api/products";
import Snack from "@/utils/snack/snack";

type Props = {
    products: IProductResponse;
};

const ProductTable = ({ products }: Props) => {
    const router = useRouter();
    const t = useTranslations("Admin.Products");
    const { get } = useSearchParams();
    const { list, total } = products;
    const limit = Number(get("limit")) || 10;

    const handleDelete = async (id: number | undefined) => {
        if (!id) return;
        try {
            const deleteProduct = await productApi.deleteProduct(id);
            if (deleteProduct) {
                Snack.success(t("ProductDeleted"));
                router.push(`?page=1&limit=${limit}`);
            }
        } catch (error) {
            Snack.error(t("ErrorDeletingProduct"));
        }
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        router.push(`?page=${value}&limit=${limit}`);
    };

    const handleChangeLimit = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        router.push(`?page=1&limit=${event.target.value}`);
        router.refresh();
    }

    return (
        <S.ContainerTable>
            <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {list.map((product) => (
                    <Grid item xs="auto" sm="auto" md="auto" key={product.id}>
                        <Card sx={{ maxWidth: "15rem" }}>
                            <CardMedia>
                                <S.CardBox>
                                    <Image
                                        src={product.imageUrls[0]}
                                        alt={product.name}
                                        height={150}
                                        width={350}
                                        priority
                                        style={{
                                            objectFit: "cover",
                                            width: "14rem",
                                            maxHeight: "100%",
                                            height: "14rem",
                                        }}
                                    />
                                </S.CardBox>
                            </CardMedia>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" fontWeight={"bold"}>
                                    {convertToMoney(Number(product.price))}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.category}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0.75rem",
                                    gap: "0.5rem",
                                }}
                            >
                                <S.EditButton
                                    variant="outlined"
                                    size="small"
                                    startIcon={<S.EditIcon />}
                                >
                                    {t("EditProduct")}
                                </S.EditButton>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleDelete(product.id)}
                                    startIcon={<S.DeleteIcon />}
                                >
                                    {t("DeleteProduct")}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={2}>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Pagination
                        count={Math.ceil(total / limit)}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <Select
                            value={String(limit)}
                            onChange={handleChangeLimit}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                        <p>{t("RowsPerPage")}</p>
                    </Box>
                </Box>
            </Box>
        </S.ContainerTable>
    );
};

export default ProductTable;
