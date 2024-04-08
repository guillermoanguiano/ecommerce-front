import { authOptions } from "@/utils/options";
import { getServerSession } from "next-auth";

export default function HomePage() {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}