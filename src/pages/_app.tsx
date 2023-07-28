import React from 'react';
import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/inter';
import { ThemeProvider } from '@mui/material';

import { theme } from '../theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
