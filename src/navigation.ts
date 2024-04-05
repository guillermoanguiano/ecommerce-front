import {
    Pathnames,
    createLocalizedPathnamesNavigation,
} from "next-intl/navigation";

export const locales = ["en", "es"] as const;
export const localePrefix = "always";
export const pathnames = {
    "/": "/",
    "/sign-up": {
        en: "/sign-up",
        es: "/registrarse",
    },
    "/login": {
        en: "/login",
        es: "/iniciar-sesion",
    },
    "/admin/dashboard": {
        en: "/admin/dashboard",
        es: "/admin/panel-de-control",
    },
    "/admin/products": {
        en: "/admin/products",
        es: "/admin/productos",
    },
    "/admin/orders": {
        en: "/admin/orders",
        es: "/admin/compras",
    },
    "/admin/users": {
        en: "/admin/users",
        es: "/admin/usuarios",
    },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
