import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { ButtonBase, useTheme } from '@mui/material';
import LogoSvg from '@/constants/svg/logo_color.svg';
import { useUser } from '@/context/UserContext';
import { ApiResponse, ApiResponseError } from '@/core/types/ApiResponse';
import { signOut } from '@/pages/api/auth/logout';
import { useFirebaseError } from '@/hooks/FirebaseError';
import { MobileDrawer } from './MobileDrawer';

const pages = [`Products`, `Pricing`, `Blog`];
const settings = [`Profile`, `Account`, `Dashboard`, `Logout`];

// Desktop Navigation component
function DesktopNavigation() {
  const router = useRouter();

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
}

// Main Navigation component
function Navigation() {
  const theme = useTheme();
  const router = useRouter();
  const { user, setLoading } = useUser();
  const { handleFirebaseError, clearFirebaseError } = useFirebaseError();

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

    if (anchorElUser) handleCloseUserMenu(); // Close the settings menu after clicking "Logout"
    if (openDrawer) handleCloseDrawer(); // Close the mobile drawer after clicking "Logout"
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
          <MobileDrawer pages={pages} open={openDrawer} onClose={handleCloseDrawer} />

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: `flex`, md: `none` } }}>
            <LogoSvg width={70} height={70} />
          </Typography>

          {/* Render the DesktopNavigation component for desktop devices */}
          <DesktopNavigation />

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>

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
                    <MenuItem key={setting} onClick={setting === `Logout` ? handleLogout : handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              // Render login and registration buttons
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  width: `fit-content`,
                }}
              >
                {/* Use ButtonBase with variant="text" for a simple button without borders */}
                <ButtonBase
                  onClick={() => router.push(`/login`)}
                  sx={{ color: theme.palette.secondary.contrastText, mr: 1 }}
                >
                  Login
                </ButtonBase>
                {/* Set the color of the Divider */}
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ height: `20px`, borderColor: theme.palette.secondary.contrastText }}
                />
                <ButtonBase
                  onClick={() => router.push(`/registration`)}
                  sx={{ color: theme.palette.secondary.contrastText, ml: 1 }}
                >
                  Registration
                </ButtonBase>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
