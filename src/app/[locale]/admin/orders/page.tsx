import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const text = await getTranslations({
      locale,
      namespace: "Metadata.Orders",
  });

  return {
      title: text("title"),
      description: text("description"),
  };
}

export default function OrdersPage() {
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}