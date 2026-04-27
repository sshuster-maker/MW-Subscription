'use client';
import {
  AppBar, Avatar, Box, Chip, Collapse, Divider, Drawer, List,
  ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem,
  Switch, Toolbar, Tooltip, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SendIcon from '@mui/icons-material/Send';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import { BalanceProvider, useBalance } from '@/contexts/BalanceContext';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Chats', icon: <ChatOutlinedIcon fontSize="small" />, path: null },
  { label: 'Analytics', icon: <BarChartOutlinedIcon fontSize="small" />, path: null },
  { label: 'Database', icon: <StorageOutlinedIcon fontSize="small" />, path: null },
  { label: 'Workspace', icon: <GroupsOutlinedIcon fontSize="small" />, path: null },
  { label: 'Billing', icon: <CreditCardOutlinedIcon fontSize="small" />, path: '/topup' },
];

function AppShellInner({ children }: { children: React.ReactNode }) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { lowBalance, toggleLowBalance } = useBalance();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  };
  const handleMenuClose = () => setMenuAnchor(null);

  const navigate = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: '#fff',
          borderBottom: '1px solid #E5E7EB',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', px: 3, gap: 2 }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', mr: 2, cursor: 'pointer', flexShrink: 0 }}
            onClick={() => router.push('/subscription')}
          >
            <Logo />
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* ADD CREDIT */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer',
              px: 1.5, py: 0.75, borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(41,121,255,0.06)' },
              transition: 'background 0.15s',
            }}
          >
            <AddIcon fontSize="small" sx={{ color: '#FFA000' }} />
            <Typography sx={{ fontWeight: 500, fontSize: 13, color: '#FFA000', fontFamily: '"Poppins", sans-serif', letterSpacing: '0.046em' }}>
              ADD CREDIT
            </Typography>
          </Box>

          {/* Balance */}
          <Chip
            icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: '18px !important', color: lowBalance ? '#C62828 !important' : '#663c00 !important' }} />}
            label={lowBalance ? 'My balance $23.00' : 'My balance $17,503'}
            size="small"
            sx={{
              bgcolor: lowBalance ? '#FFEBEE' : '#FFF4E5',
              color: lowBalance ? '#C62828' : '#663c00',
              fontWeight: 500,
              fontSize: 13,
              fontFamily: '"Poppins", sans-serif',
              '& .MuiChip-label': { px: 1 },
              height: 36,
              borderRadius: 1,
              border: 'none',
            }}
          />

          {/* Low-balance demo toggle */}
          <Tooltip title={lowBalance ? 'Switch to sufficient balance' : 'Simulate insufficient balance'} arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 0.5 }}>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', fontFamily: '"Poppins", sans-serif', whiteSpace: 'nowrap' }}>
                Low $
              </Typography>
              <Switch
                size="small"
                checked={lowBalance}
                onChange={toggleLowBalance}
                color="error"
              />
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidenav */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
            border: 'none',
            bgcolor: '#fff',
            borderRight: '1px solid #E5E7EB',
            px: 1,
            py: 1.5,
          },
        }}
      >
        {/* SEND button */}
        <Box sx={{ px: 1, pb: 1.5 }}>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              bgcolor: 'primary.main', color: '#fff', borderRadius: 1.5, py: 1.25, cursor: 'pointer',
              fontWeight: 700, fontSize: 13, fontFamily: '"Poppins", sans-serif', letterSpacing: '0.08em',
              '&:hover': { bgcolor: 'primary.dark' },
              transition: 'background 0.15s',
            }}
          >
            <SendIcon sx={{ fontSize: 15 }} />
            SEND
          </Box>
        </Box>

        <List dense disablePadding sx={{ px: 0.5 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => item.path && router.push(item.path)}
              sx={{
                px: 1.5, py: 0.875, mb: 0.25, borderRadius: 1.5,
                '&:hover': { bgcolor: 'rgba(41,121,255,0.06)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 13.5,
                      fontWeight: 400,
                      color: 'text.primary',
                      fontFamily: '"Poppins", sans-serif',
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Bottom user — click to open My Account menu */}
        <Box
          onClick={handleMenuOpen}
          sx={{
            mt: 'auto', px: 1.5, py: 1,
            display: 'flex', alignItems: 'center', gap: 1.5,
            borderTop: '1px solid #F1F5F9',
            cursor: 'pointer', borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(41,121,255,0.04)' },
            transition: 'background 0.15s',
          }}
        >
          <Box
            sx={{
              width: 34, height: 34, borderRadius: '50%',
              bgcolor: 'secondary.main',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PersonOutlinedIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', fontFamily: '"Poppins", sans-serif', lineHeight: 1.2 }}>
              My Account
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary', fontFamily: '"Poppins", sans-serif', lineHeight: 1.2 }}>
              alexndrashus-2659
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* My Account dropdown menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: { width: 280, borderRadius: 1 },
          },
        }}
      >
        {/* User info header */}
        <Box sx={{ px: 2, pt: 1, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main', flexShrink: 0 }}>
              <PersonOutlinedIcon sx={{ fontSize: 22 }} />
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 14, color: 'text.primary', fontFamily: '"Poppins", sans-serif', lineHeight: 1.43, letterSpacing: '0.17px' }}>
                alexndrashus@gmail.com
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'text.secondary', fontFamily: '"Poppins", sans-serif', lineHeight: 1.43, letterSpacing: '0.17px' }}>
                alexndrashus-2659
              </Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#EFF8FF', borderRadius: 1, px: 1, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 14, fontFamily: '"Poppins", sans-serif', color: 'text.primary' }}>
              Tier
            </Typography>
            <Chip
              label="Premium"
              size="small"
              sx={{
                bgcolor: 'rgba(2,11,34,0.08)',
                color: 'text.primary',
                fontSize: 13,
                fontFamily: '"Poppins", sans-serif',
                height: 24,
                borderRadius: '100px',
              }}
            />
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={() => navigate('/account')} sx={{ py: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Account
        </MenuItem>
        <MenuItem onClick={() => navigate('/users')} sx={{ py: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Users management
        </MenuItem>
        <MenuItem
          onClick={() => navigate('/subscription')}
          sx={{
            py: 1.5,
            fontFamily: '"Poppins", sans-serif',
            fontSize: 16,
            bgcolor: 'rgba(41,121,255,0.04)',
            '&:hover': { bgcolor: 'rgba(41,121,255,0.08)' },
          }}
        >
          Subscription management
        </MenuItem>
        <MenuItem onClick={() => navigate('/teams')} sx={{ py: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Teams management
        </MenuItem>
        <MenuItem onClick={() => navigate('/roles')} sx={{ py: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Roles management
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')} sx={{ py: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between', fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          Switch team
          <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5, gap: 1.5, fontFamily: '"Poppins", sans-serif', fontSize: 16 }}>
          <LogoutIcon sx={{ fontSize: 20, color: 'text.primary' }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: 0,
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <BalanceProvider>
      <AppShellInner>{children}</AppShellInner>
    </BalanceProvider>
  );
}
