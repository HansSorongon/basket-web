import { Suspense } from 'react'
import React from "react";
import { MantineProvider, Container, Loader, ColorSchemeScript, Flex } from "@mantine/core";

import NextTopLoader from 'nextjs-toploader'

import '@mantine/dates/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css'
import '@mantine/notifications/styles.css';

import { theme } from "../theme";

export const metadata = {
  title: "Basket",
  description: "An asset manager for every company.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Suspense fallback={<Loader />}>
            <NextTopLoader />
            {children}
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
