import { IProductCategory } from "@/types/Product.interface";
import { FoodBank, Laptop, LocalDrink, Smartphone } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// TODO: Upload icons to the cloud and get the link via API
const Icons: any = {
  "Celulares": <Smartphone fontSize="large" />,
  "Tablets": <Laptop fontSize="large" />,
  "Comida": <FoodBank fontSize="large" />,
  "Bebidas": <LocalDrink fontSize="large" />,
}

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

                <Box mt={2} sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/${category.id}`}
                            style={{ textDecoration: "none", width: "10rem" }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column-reverse",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.75rem",
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.24) 0.5px 3px 3px",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#f3f4f6",
                                    },
                                }}
                            >
                                <Typography>{category.name}</Typography>
                                {Icons[category.name]}
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Home;
