import Navbar from "@/components/Navbar/Navbar";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const text = await getTranslations({
        locale,
        namespace: "Metadata.Home",
    });

    return {
        title: text("title"),
        description: text("description"),
    };
}

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                px: { xs: "1rem", md: "2rem" },
                backgroundColor: "#fff",
                minHeight: "100vh",
            }}
        >
            <Navbar />

            <Box sx={{ padding: "0 2rem", paddingTop: "2rem" }}>{children}</Box>
        </Box>
    );
}
