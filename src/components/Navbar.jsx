import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  MdMenu as MenuIcon,
  MdClose as CloseIcon,
  MdExpandMore as ExpandMore,
  MdVideoLibrary as VideoLibrary,
  MdSmartToy as SmartToy,
  MdPerson as Person,
  MdOutlineWbSunny,
  MdOutlineDarkMode,
} from 'react-icons/md';
import { useColorMode } from '../theme/ThemeContext';
import logo from '../../public/uinsports-logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiMenuAnchor, setAiMenuAnchor] = useState(null);
  const [getStartedMenuAnchor, setGetStartedMenuAnchor] = useState(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode } = useColorMode();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Community", href: "/community" },
    // { name: "Support", href: "/support" },
    { name: "Organizers", href: "/organizers" },
    // { name: "Tracker", href: "/tracker" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleAiMenuOpen = (event) => {
  //   setAiMenuAnchor(event.currentTarget);
  // };

  const handleAiMenuClose = () => {
    setAiMenuAnchor(null);
  };

  const handleGetStartedMenuOpen = (event) => {
    setGetStartedMenuAnchor(event.currentTarget);
  };

  const handleGetStartedMenuClose = () => {
    setGetStartedMenuAnchor(null);
  };

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <img src={logo} alt="UinSports Logo" style={{ height: '80px' }} />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link
              to={item.href}
              style={{
                textDecoration: 'none',
                color: isActive(item.href) ? theme.palette.primary.main : theme.palette.text.primary,
                fontWeight: isActive(item.href) ? 600 : 400,
                padding: '12px 16px',
                display: 'block',
                width: '100%',
              }}
            >
              {item.name}
            </Link>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {/* <ListItem>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#111827' }}>
            AI Features
          </Typography>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/video-analysis"
            style={{
              textDecoration: 'none',
              color: '#6B7280',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <VideoLibrary sx={{ mr: 1, fontSize: 20 }} />
            Video Analysis
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            to="/ai-agents"
            style={{
              textDecoration: 'none',
              color: '#6B7280',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <SmartToy sx={{ mr: 1, fontSize: 20 }} />
            AI Agents
          </Link>
        </ListItem> */}
        {/* <ListItem disablePadding>
          <Link
            to="/profile/player"
            style={{
              textDecoration: 'none',
              color: '#6B7280',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Person sx={{ mr: 1, fontSize: 20 }} />
            Player Profiles
          </Link>
        </ListItem> */}
        <Divider sx={{ my: 1 }} />
        {/* <ListItem>
          <Link to="/plans" style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F26A27',
                color: 'white',
                width: '100%',
                '&:hover': {
                  backgroundColor: 'rgba(242, 106, 39, 0.9)',
                },
              }}
            >
              Get Started
            </Button>
          </Link>
        </ListItem> */}
        <ListItem sx={{ flexDirection: 'column', gap: 1 }}>
          <Link to="/signup" style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#418BCA',
                color: '#418BCA',
                width: '100%',
                '&:hover': {
                  borderColor: '#418BCA',
                  backgroundColor: 'rgba(65, 139, 202, 0.04)',
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#418BCA',
                color: '#418BCA',
                width: '100%',
                '&:hover': {
                  borderColor: '#418BCA',
                  backgroundColor: 'rgba(65, 139, 202, 0.04)',
                },
              }}
            >
              Login
            </Button>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: 'blur(10px)',
          borderBottom: theme.palette.mode === 'light'
            ? '1px solid rgba(229, 231, 235, 0.5)'
            : '1px solid rgba(51, 65, 85, 0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="UinSports Logo" style={{ height: '80px' }} />
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item.href) ? theme.palette.primary.main : theme.palette.text.primary,
                    fontWeight: isActive(item.href) ? 600 : 400,
                    fontSize: '14px',
                    paddingBottom: 6,
                    borderBottom: isActive(item.href) ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.borderBottomColor = theme.palette.divider;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* <Button
                onClick={handleAiMenuOpen}
                endIcon={<ExpandMore />}
                sx={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#418BCA',
                  },
                }}
              >
                AI Features
              </Button> */}

              <Button
                // onClick={handleGetStartedMenuOpen}
                sx={{
                  backgroundColor: '#F26A27',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(242, 106, 39, 0.9)',
                  },
                }}
              >
                Login
              </Button>

              <Button
                // onClick={handleGetStartedMenuOpen}
                sx={{
                  backgroundColor: '#F26A27',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(242, 106, 39, 0.9)',
                  },
                }}
              >
                Sign up
              </Button>

              <IconButton
                onClick={toggleColorMode}
                sx={{
                  ml: 1,
                  color: theme.palette.mode === 'light' ? '#374151' : '#f1f5f9',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
                    transform: 'rotate(15deg)'
                  }
                }}
                aria-label="Toggle theme"
              >
                {theme.palette.mode === 'dark' ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
              </IconButton>
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  color: theme.palette.mode === 'light' ? '#374151' : '#f1f5f9',
                }}
                aria-label="Toggle theme"
              >
                {theme.palette.mode === 'dark' ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: theme.palette.mode === 'light' ? '#374151' : '#f1f5f9' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* AI Features Menu */}
      {/* <Menu
        anchorEl={aiMenuAnchor}
        open={Boolean(aiMenuAnchor)}
        onClose={handleAiMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <MenuItem
          component={Link}
          to="/video-analysis"
          onClick={handleAiMenuClose}
          sx={{ fontWeight: 600 }}
        >
          <VideoLibrary sx={{ mr: 2, fontSize: 20 }} />
          Video Analysis
        </MenuItem>
        <MenuItem
          component={Link}
          to="/ai-agents"
          onClick={handleAiMenuClose}
          sx={{ fontWeight: 600 }}
        >
          <SmartToy sx={{ mr: 2, fontSize: 20 }} />
          AI Agents
        </MenuItem>
        <MenuItem
          component={Link}
          to="/profile/player"
          onClick={handleAiMenuClose}
          sx={{ fontWeight: 600 }}
        >
          <Person sx={{ mr: 2, fontSize: 20 }} />
          Player Profiles
        </MenuItem>
      </Menu> */}

      {/* Get Started Menu */}
      <Menu
        anchorEl={getStartedMenuAnchor}
        open={Boolean(getStartedMenuAnchor)}
        onClose={handleGetStartedMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <MenuItem
          component={Link}
          to="/signup"
          onClick={handleGetStartedMenuClose}
          sx={{ fontWeight: 600 }}
        >
          Sign Up
        </MenuItem>
        {/* <MenuItem
          component={Link}
          to="/plans"
          onClick={handleGetStartedMenuClose}
          sx={{ fontWeight: 600 }}
        >
          View Plans
        </MenuItem> */}
        <MenuItem
          component={Link}
          to="/login"
          onClick={handleGetStartedMenuClose}
          sx={{ fontWeight: 600 }}
        >
          Login
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
