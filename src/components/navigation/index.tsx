import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Drawer, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoSvg from '@/constants/svg/logo_color.svg';
import { useUser } from '@/context/UserContext';
import { ApiResponse, ApiResponseError } from '@/core/types/ApiResponse';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { signOut } from '@/pages/api/auth/logout';
import { useFirebaseError } from '@/hooks/FirebaseError';

const pages = [`Products`, `Pricing`, `Blog`, `Login`];
const settings = [`Profile`, `Account`, `Dashboard`, `Logout`];

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const theme = useTheme();

  // Calculate the width of the drawer as 2/3 of the screen
  const drawerWidth = theme.breakpoints.values.sm * (2 / 4);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2 }}>
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
};

// Desktop Navigation component
const DesktopNavigation = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: `none`, md: `flex` } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => {
            router.push(`/${page.toLowerCase()}`);
          }}
          sx={{ my: 2, color: `white`, display: `block` }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

// Main Navigation component
const Navigation = () => {
  const router = useRouter();
  const { user, loading, setLoading, setUser } = useUser();
  const { error, handleFirebaseError, clearFirebaseError, getErrorMessage } = useFirebaseError();

  const [openDrawer, setOpenDrawer] = React.useState(false); // State to control the mobile drawer
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    if (user != null) {
      setLoading(true);
      const response: ApiResponse<User, FirebaseError> = await signOut(user);

      if (response.success) {
        clearFirebaseError();
      } else {
        const err: ApiResponseError<FirebaseError> = response;
        handleFirebaseError(err.error);
      }
    }
    anchorElUser && handleCloseUserMenu(); // Close the settings menu after clicking "Logout"
    openDrawer && handleCloseDrawer(); // Close the mobile drawer after clicking "Logout"
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: `none`, md: `flex` } }}>
            <LogoSvg width={70} height={70} />
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: `flex`, md: `none` } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleToggleDrawer} // Use the handleToggleDrawer function to open/close the mobile drawer
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Render the MobileDrawer component for mobile devices */}
          <MobileDrawer open={openDrawer} onClose={handleCloseDrawer} />

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: `flex`, md: `none` } }}>
            <LogoSvg width={70} height={70} />
          </Typography>

          {/* Render the DesktopNavigation component for desktop devices */}
          <DesktopNavigation />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            {/* Conditional rendering for the settings menu */}
            {user ? (
              <Menu
                sx={{ mt: `45px` }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                keepMounted
                transformOrigin={{
                  vertical: `top`,
                  horizontal: `right`,
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
