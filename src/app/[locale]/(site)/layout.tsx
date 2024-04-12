import Navbar from "@/components/Navbar/Navbar";
import { authOptions } from "@/utils/options";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession(authOptions);
    return (
        <Box
            sx={{
                px: { xs: "1rem", md: "2rem" },
                backgroundColor: "#fff",
                minHeight: "100vh",
            }}
        >
            <Navbar session={session} />

            <Box sx={{ padding: "0 2rem", paddingTop: "2rem" }}>{children}</Box>
        </Box>
    );
}
