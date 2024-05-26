import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { UserDisplayDto } from '../models/userDtos';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/firebaseAuthServices';

export default function HeaderNavbar() {
  const userDetails: UserDisplayDto | null = useAuth();
  const { profilePicture, displayName, email } = userDetails ?? { profilePicture: "", displayName: "", email: "" };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
  }

  return (
    <Box marginBottom={11}>
      <AppBar position="fixed" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PlaylistAddCheckIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO APP
            </Typography>
            <PlaylistAddCheckIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO APP
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={displayName} src={profilePicture} />
                </IconButton>
              </Tooltip>
              <Menu
                variant='menu'
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography variant='h5' textAlign="center">{displayName}</Typography>
                </MenuItem>

                <MenuItem disabled>
                  <Typography variant='subtitle2' textAlign="center">{email}</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}