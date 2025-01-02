'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import './globals.css';
import clsx from "clsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={clsx(
            'bg-backgroundColor',
            'antialiased'
          )}
        >
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}

export default RootLayout;