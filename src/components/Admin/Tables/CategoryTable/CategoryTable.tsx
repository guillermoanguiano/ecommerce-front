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
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
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
