import React from 'react';
import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/inter';
import { ThemeProvider } from '@mui/material';

import { UserProvider } from '@/context/UserContext';
import { theme } from '../theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        {` `}
        {/* Wrap your entire application with the UserProvider */}
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
