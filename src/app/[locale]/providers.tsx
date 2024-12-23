/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { appearance } from "@/configs";
import { ClerkProvider } from "@clerk/nextjs";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/common";

interface ProvidersProps {
  messages?: AbstractIntlMessages | undefined;
  localization?: any;
  children: React.ReactNode;
}

const Providers: React.FC<Readonly<ProvidersProps>> = (props) => {
  const { messages, localization, children } = props;
  return (
    <NextIntlClientProvider messages={messages}>
      <ClerkProvider localization={localization} appearance={appearance}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
