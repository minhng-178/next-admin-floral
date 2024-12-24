import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { viVN, enUS } from "@clerk/localizations";
import { Locale } from "locale";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "%s | Floral Shop",
    absolute: "Floral Shop",
  },
  description: "Floral Shop",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const localization = locale === "vi" ? viVN : enUS;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className}  antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers localization={localization}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
