import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

export default createMiddleware({
    defaultLocale: "en",
    localePrefix,
    locales,
    pathnames
});

export const config = {
    matcher: [
        "/",
        "/((?!api|_next|_vercel|.*\\..*).*)",
        // add more generic routes here
    ],
};
