"use client";
import React, { useState } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import * as S from './Categories.styled';
import ModalCategories from '@/components/Admin/Modals/ModalCategories';
import { IProductCategory } from '@/types/Product.interface';

type Props = {
    categories: IProductCategory[];
}

const Categories = (props: Props) => {
    const [modalCategories, setModalCategories] = useState(false);
    const t = useTranslations("Admin.Categories");

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
                    {t("Categories")}
                </Typography>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <S.AddButton
                        variant="contained"
                        onClick={handleModalCategories}
                    >
                        {t("AddCategory")}
                    </S.AddButton>
                </Box>
            </Stack>

            {JSON.stringify(props.categories)}

            <ModalCategories
                open={modalCategories}
                handleModalClose={handleModalCategories}
            />
        </Box>
  )
}

export default Categories