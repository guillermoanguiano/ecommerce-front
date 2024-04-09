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

export default async function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        {children}
      </Box>
    </>
  );
}      