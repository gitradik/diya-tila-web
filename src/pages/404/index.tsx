import { NextSeo } from 'next-seo';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Page from '@/components/page';
import Footer from '@/components/footer';

export default function NotFound() {
  return (
    <Page>
      <NextSeo title="Etagi" description="Page is not found 404" />
      <Box padding="10% 0" textAlign="center">
        <Typography variant="h3" component="p">
          Page is Not Found 404
        </Typography>
      </Box>
      <Footer />
    </Page>
  );
}
