'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#1976D2', dark: '#0D47A1', contrastText: '#fff' },
    secondary: { main: '#E59A24', light: '#F0B444', dark: '#C07D10', contrastText: '#fff' },
    background: { default: '#EEF1F8', paper: '#FFFFFF' },
    error: { main: '#D32F2F' },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    info: { main: '#0288D1' },
    text: { primary: '#1A1D23', secondary: '#5C6370' },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: { fontWeight: 600, letterSpacing: '0.08em' },
    caption: { letterSpacing: '0.02em' },
    overline: { letterSpacing: '0.1em', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        sizeSmall: { fontSize: 12, padding: '4px 12px' },
        sizeMedium: { fontSize: 13, padding: '8px 20px' },
        sizeLarge: { fontSize: 14, padding: '10px 24px' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: 11, fontFamily: '"Poppins", sans-serif' },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': { fontFamily: '"Poppins", sans-serif', fontSize: 14 },
          '& .MuiInputLabel-root': { fontFamily: '"Poppins", sans-serif', fontSize: 14 },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1565C0' },
        },
        notchedOutline: { borderColor: '#D1D5DB' },
      },
    },
    MuiSelect: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        select: { fontFamily: '"Poppins", sans-serif', fontSize: 14 },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: { fontFamily: '"Poppins", sans-serif', fontSize: 14 },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: '"Poppins", sans-serif', fontSize: 14 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { fontFamily: '"Poppins", sans-serif' },
        head: { fontWeight: 600, fontSize: 12 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8, fontFamily: '"Poppins", sans-serif', fontSize: 13 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 12 },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: '#E5E7EB' } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
  },
});
