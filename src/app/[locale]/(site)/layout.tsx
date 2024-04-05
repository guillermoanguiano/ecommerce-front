import Navbar from "@/components/Navbar/Navbar";
import { Box } from "@mui/material";

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