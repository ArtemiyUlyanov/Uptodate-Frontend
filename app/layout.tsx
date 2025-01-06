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

// const interTight = localFont({
//   src: [
//     {
//       path: 'fonts/InterTight/InterTight-Regular.ttf',
//       weight: '400',
//       style: 'normal'
//     }
//   ],
//   display: 'swap'
// });

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-backgroundColor',
          'antialiased'
        )}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;