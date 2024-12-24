"use client";

import React from "react";
import { appearance } from "@/configs";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

interface ProvidersProps {
  localization?: any;
  children: React.ReactNode;
}

const Providers: React.FC<Readonly<ProvidersProps>> = (props) => {
  const { localization, children } = props;
  const queryClient = new QueryClient();
  return (
    <ClerkProvider localization={localization} appearance={appearance}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <SonnerToaster />
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default Providers;
