import React from "react";
import { MantineProvider, ColorSchemeScript, Flex, Title } from "@mantine/core";
import { theme } from "../theme";

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css'

import Navbar from '../components/navbar/Navbar'

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
          <Flex>
            <Navbar />
            {children}
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
