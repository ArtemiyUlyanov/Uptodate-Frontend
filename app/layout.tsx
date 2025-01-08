'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import './globals.css';
import clsx from "clsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale, locales } from "@/next-intl.config";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const queryClient = new QueryClient();

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const { lang } = useParams();
  const [locale, setLocale] = useState<string>(defaultLocale);

  useEffect(() => {
    if (locales.includes(lang as 'en' | 'ru')) {
      setLocale(lang as string);
    } else {
      setLocale(defaultLocale);
    }
  }, [lang]);

  const loadMessages = (locale: string) => {
    try {
      return require(`@/public/locales/${locale}/lang.json`);
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-backgroundColor',
          'antialiased'
        )}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={loadMessages(locale)}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;