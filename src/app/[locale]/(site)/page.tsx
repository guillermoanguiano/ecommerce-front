"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session)

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}