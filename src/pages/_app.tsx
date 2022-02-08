import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/inter';
import { ThemeProvider } from '@mui/material';

import { setup } from 'twind';
import twindConfig from '../twind.config';
import { theme } from '../theme';

if (typeof window !== `undefined`) {
  setup(twindConfig);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
