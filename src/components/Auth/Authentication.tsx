import { authOptions } from "@/utils/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Authentication = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  if (!session.user.admin) redirect("/");


  return <>{props.children}</>;
};

export default Authentication;
