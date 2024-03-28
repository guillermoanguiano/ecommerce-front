import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
}

const IsAuthenticated = (props: Props) => {

  if(true) return redirect("/login")

  return (
    <>
      {props.children}
    </>
  )
}

export default IsAuthenticated