// "use client";

// import { useSession } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  // TODO: Con esto tengo el email por lo que puedo hacer un fetch a la base de datos del user y asi ver si es admin o no. 
  // De eso me ayudara a validar si es admin o no con un componente de authentication.
  //! Esto se usaria en el rootLayout, con un wrapper de authentication y de esa forma ponerlo en redux y hacerlo persistente si es admin o no en el store global.
  console.log(session);

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}