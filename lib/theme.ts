'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#1976D2', dark: '#0D47A1' },
    secondary: { main: '#E59A24' },
    background: { default: '#EEF1F8', paper: '#FFFFFF' },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    text: { primary: '#1A1D23', secondary: '#5C6370' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'uppercase', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500, fontSize: 11 } },
    },
  },
});
