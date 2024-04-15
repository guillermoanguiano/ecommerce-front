import { IProductCategory } from "@/types/Product.interface";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import * as S from "./CategoryTable.styled";
import Image from "next/image";

type Props = {
    categories: IProductCategory[];
};

const CategoriesTable = ({ categories }: Props) => {
    return (
        <S.Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Icon</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <Image
                                    src={category.icon}
                                    alt={category.name}
                                    width={50}
                                    height={50}
                                    style={{ objectFit: "contain" }}
                                    priority
                                />
                            </TableCell>
                            <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1,  width: "20%" }}>
                                    <Button
                                        variant="outlined"
                                        color="info"
                                        onClick={() => console.log("edit")}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => console.log("delete")}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </S.Container>
    );
};

export default CategoriesTable;
