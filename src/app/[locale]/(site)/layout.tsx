import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";


export default async function SiteLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar user={session?.user} />
      {children}
    </>
  );
}