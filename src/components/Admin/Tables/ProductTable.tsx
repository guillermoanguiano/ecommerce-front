import { IProductResponse } from "@/types/Product.interface";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import * as S from "./ProductTable.styled";
import { convertToMoney } from "@/utils";
import { useTranslations } from "next-intl";

type Props = {
    products: IProductResponse;
};

const ProductTable = ({ products }: Props) => {
    const t = useTranslations("Admin.Products");
    const { list, total } = products;

    return (
        <S.ContainerTable >
            <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {list.map((product) => (
                    <Grid item xs="auto" sm="auto" md="auto" key={product.id}>
                        <Card sx={{ maxWidth: "14rem" }}>
                            <CardMedia>
                                <S.CardBox>
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        height={150}
                                        width={250}
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "14rem",
                                        }}
                                    />
                                </S.CardBox>
                            </CardMedia>
                            <CardContent >
                                <Typography gutterBottom variant="h6" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
                                    startIcon={
                                        <S.EditIcon />
                                    }
                                >
                                    {t("EditProduct")}
                                </S.EditButton>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => console.log("delete")}
                                    startIcon={
                                        <S.DeleteIcon />
                                    }
                                >
                                    {t("DeleteProduct")}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </S.ContainerTable>
    );
};

export default ProductTable;
