import Navbar from "@/components/Navbar/Navbar";
import { authOptions } from "@/utils/options";
import { getServerSession } from "next-auth";

export default async function SiteLayout({children}: {children: React.ReactNode}) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}      