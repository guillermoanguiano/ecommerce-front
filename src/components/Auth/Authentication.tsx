import { authOptions } from "@/utils/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Authentication = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const {
    user: { admin },
  }: any = session;

  if (!admin) redirect("/");

  //? Cambio a client side y lo hago con el hook useSession de next-auth y pongo un toast por si se le niega el acceso o por si entra el admin

  return <>{props.children}</>;
};

export default Authentication;
