import Login from "@/modules/Login";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const text = await getTranslations({
      locale,
      namespace: "Metadata.Login",
  });

  return {
      title: text("title"),
      description: text("description"),
  };
}

type Props = {
  params: {
    locale: string;
  }
}

export default function LoginPage({ params: { locale } }: Props) {
  return <Login locale={locale} /> 
}