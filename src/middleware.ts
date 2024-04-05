import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    defaultLocale: "en",
    locales: ["en", "es"],
    pathnames: {
      '/': '/',
      '/sign-up': {
        'en': '/sign-up',
        'es': '/registrarse',
      },
      '/login': {
        'en': '/login',
        'es': '/iniciar-sesion',
      },
      '/admin/dashboard': {
        'en': '/admin/dashboard',
        'es': '/admin/panel-de-control',
      }
    }
});

export const config = {
    matcher: [
        "/",
        "/((?!api|_next|_vercel|.*\\..*).*)",
        // add more generic routes here
    ],
};
