import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {

    const text = await getTranslations({
        locale,
        namespace: "Metadata.Dashboard"
    });

    return { 
      title: text("title"), 
      description: text("description") 
    };
}

const DashboardHome = () => {
    return (
        <div>
            <h1>Dashboard Home</h1>
        </div>
    );
};

export default DashboardHome;
