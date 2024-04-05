import React from "react";
import Authentication from "@/components/Auth/Authentication";
import MenuDrawer from "@/components/Menu";

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

const AdminLayout = ({ children, params: { locale } }: Props) => {
    return (
        <Authentication>
            <MenuDrawer locale={locale}>{children}</MenuDrawer>
        </Authentication>
    );
};

export default AdminLayout;
