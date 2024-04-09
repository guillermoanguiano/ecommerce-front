import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const text = await getTranslations({
      locale,
      namespace: "Metadata.Users",
  });

  return {
      title: text("title"),
      description: text("description"),
  };
}

export default function UsersPage() {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}