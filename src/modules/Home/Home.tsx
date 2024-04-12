"use client";
import { IProductCategory } from "@/types/Product.interface";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import * as S from "./Home.styled";
import React from "react";
import IconMapper from "@/utils/constants/IconMapper";

type Props = {
    categories: IProductCategory[];
};

const Home = ({ categories }: Props) => {
    return (
        <React.Fragment>
            <Box component={"section"}>
                <Link href="#" style={{ textDecoration: "none" }}>
                    <Image
                        src="/banner.jpeg"
                        alt="banner"
                        width={450}
                        height={250}
                        priority
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "25rem",
                            borderRadius: "0.75rem",
                        }}
                    />
                </Link>
            </Box>

            <Box component={"section"} mt={3} width={"100%"}>
                <Typography variant="h6" fontWeight="bold">
                    Select Categories
                </Typography>

                <S.ContainerCategories>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/${category.id}`}
                            style={{ textDecoration: "none", width: "10rem" }}
                        >
                            <S.Category>
                                <Typography>{category.name}</Typography>
                                <IconMapper iconName={category.icon} />
                            </S.Category>
                        </Link>
                    ))}
                </S.ContainerCategories>
            </Box>
        </React.Fragment>
    );
};

export default Home;
