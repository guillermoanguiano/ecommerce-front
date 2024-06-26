import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { NextIntlClientProvider, useMessages } from "next-intl";
import SnackProvider from "@/utils/snack/snackProvider";
import Session from "@/providers/session";
import './globals.css'

export const metadata: Metadata = {
  title: "eShop",
  description: "eShop App description page",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline /> 
              <Session>
                <SnackProvider>{children}</SnackProvider>
              </Session>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
