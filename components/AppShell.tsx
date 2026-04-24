'use client';
import {
  AppBar, Box, Chip, Collapse, Drawer, IconButton, List, ListItemButton,
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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DRAWER_WIDTH = 256;

const navItems = [
  { label: 'Chats', icon: <ChatOutlinedIcon /> },
  { label: 'Analytics', icon: <BarChartOutlinedIcon /> },
  { label: 'Database', icon: <StorageOutlinedIcon /> },
  { label: 'Workspace', icon: <GroupsOutlinedIcon /> },
  { label: 'Billing', icon: <CreditCardOutlinedIcon />, active: true },
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
        <Toolbar sx={{ minHeight: '65px !important', px: 3, gap: 2 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
            <Box
              sx={{
                width: 36, height: 36,
                bgcolor: '#1565C0',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 14, fontStyle: 'italic' }}>M</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1, color: '#1565C0' }}>
                Message<span style={{ color: '#E59A24' }}>W</span>hiz
              </Typography>
              <Typography sx={{ fontSize: 9, color: '#9CA3AF', lineHeight: 1 }}>POWERED BY MNDSMART</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* ADD CREDIT */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#1565C0' }}
          >
            <AddIcon fontSize="small" />
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#1565C0' }}>ADD CREDIT</Typography>
          </Box>

          {/* Balance */}
          <Chip
            icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: '16px !important', color: '#E59A24 !important' }} />}
            label="My balance $17,503"
            variant="outlined"
            size="small"
            sx={{
              borderColor: '#E59A24', color: '#E59A24', fontWeight: 600, fontSize: 13,
              '& .MuiChip-label': { px: 1 },
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
            top: '65px',
            height: 'calc(100% - 65px)',
            border: 'none',
            bgcolor: '#fff',
            borderRight: '1px solid #E5E7EB',
          },
        }}
      >
        {/* SEND button */}
        <Box sx={{ p: 1.5 }}>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              bgcolor: '#1565C0', color: '#fff', borderRadius: 1, py: 1, cursor: 'pointer',
              fontWeight: 700, fontSize: 14,
            }}
          >
            <SendIcon sx={{ fontSize: 16 }} />
            SEND
          </Box>
        </Box>

        <List dense disablePadding>
          {navItems.map((item) => (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => item.label === 'Billing' && setBillingOpen((o) => !o)}
                sx={{
                  px: 2, py: 1,
                  bgcolor: item.active ? 'rgba(21,101,192,0.06)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(21,101,192,0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: item.active ? '#1565C0' : '#5C6370' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontSize: 14, fontWeight: item.active ? 600 : 400, color: item.active ? '#1565C0' : '#1A1D23' } } }}
                />
                {item.label === 'Billing' && (
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18, color: '#5C6370',
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
                    sx={{ pl: 7, py: 0.75, '&:hover': { bgcolor: 'rgba(21,101,192,0.04)' } }}
                  >
                    <ListItemText
                      primary="Subscription"
                      slotProps={{ primary: { sx: { fontSize: 13, color: '#1565C0', fontWeight: 500 } } }}
                    />
                  </ListItemButton>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        {/* Bottom user */}
        <Box sx={{ mt: 'auto', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: '50%',
              bgcolor: '#E59A24', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Box>
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#1A1D23' }}>My Account</Typography>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flex: 1, ml: `${DRAWER_WIDTH}px`, mt: '65px', minHeight: 'calc(100vh - 65px)' }}>
        {children}
      </Box>
    </Box>
  );
}
