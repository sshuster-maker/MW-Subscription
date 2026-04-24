'use client';
import {
  AppBar, Box, Chip, Collapse, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Chats', icon: <ChatOutlinedIcon fontSize="small" /> },
  { label: 'Analytics', icon: <BarChartOutlinedIcon fontSize="small" /> },
  { label: 'Database', icon: <StorageOutlinedIcon fontSize="small" /> },
  { label: 'Workspace', icon: <GroupsOutlinedIcon fontSize="small" /> },
  { label: 'Billing', icon: <CreditCardOutlinedIcon fontSize="small" />, active: true },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [billingOpen, setBillingOpen] = useState(true);
  const router = useRouter();

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
            icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: '18px !important', color: '#663c00 !important' }} />}
            label="My balance $17,503"
            size="small"
            sx={{
              bgcolor: '#FFF4E5',
              color: '#663c00',
              fontWeight: 500,
              fontSize: 13,
              fontFamily: '"Poppins", sans-serif',
              '& .MuiChip-label': { px: 1 },
              height: 36,
              borderRadius: 1,
              border: 'none',
            }}
          />
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
            <Box key={item.label}>
              <ListItemButton
                onClick={() => item.label === 'Billing' && setBillingOpen((o) => !o)}
                sx={{
                  px: 1.5, py: 0.875, mb: 0.25, borderRadius: 1.5,
                  bgcolor: item.active ? 'rgba(41,121,255,0.08)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(41,121,255,0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: item.active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 13.5,
                        fontWeight: item.active ? 600 : 400,
                        color: item.active ? 'primary.main' : 'text.primary',
                        fontFamily: '"Poppins", sans-serif',
                      },
                    },
                  }}
                />
                {item.label === 'Billing' && (
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18, color: 'text.secondary',
                      transform: billingOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                )}
              </ListItemButton>

              {item.label === 'Billing' && (
                <Collapse in={billingOpen}>
                  <ListItemButton
                    onClick={() => router.push('/subscription')}
                    sx={{
                      pl: 6, py: 0.75, mb: 0.25, borderRadius: 1.5,
                      '&:hover': { bgcolor: 'rgba(41,121,255,0.04)' },
                    }}
                  >
                    <ListItemText
                      primary="Subscription"
                      slotProps={{
                        primary: {
                          sx: { fontSize: 13, color: 'primary.main', fontWeight: 500, fontFamily: '"Poppins", sans-serif' },
                        },
                      }}
                    />
                  </ListItemButton>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        {/* Bottom user */}
        <Box sx={{ mt: 'auto', px: 1.5, py: 1, display: 'flex', alignItems: 'center', gap: 1.5, borderTop: '1px solid #F1F5F9' }}>
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

      {/* Main content — 24px padding on all sides */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: `${DRAWER_WIDTH}px`,
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          pt: 3,
          pr: 3,
          pb: 3,
          pl: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
