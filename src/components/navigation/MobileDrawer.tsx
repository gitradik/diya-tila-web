import { Box, Drawer, MenuItem, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

interface MobileDrawerProps {
  pages: string[];
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ pages, open, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const theme = useTheme();

  // Calculate the width of the drawer as 2/3 of the screen
  const drawerWidth = theme.breakpoints.values.sm * (2 / 4);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: drawerWidth,
          height: `100%`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `flex-start`,
          p: 2,
        }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page}
            onClick={() => {
              onClose();
              router.push(`/${page.toLowerCase()}`);
            }}
          >
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Box>
    </Drawer>
  );
}
