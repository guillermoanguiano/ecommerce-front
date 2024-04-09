import SignUp from "@/modules/SignUp";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const text = await getTranslations({
        locale,
        namespace: "Metadata.SignUp",
    });

    return {
        title: text("title"),
        description: text("description"),
    };
}

type Props = {
    params: {
        locale: string;
    };
};

export default function SignUpPage({ params: { locale } }: Props) {
    return (
        <>
            <SignUp locale={locale} />
        </>
    );
}
