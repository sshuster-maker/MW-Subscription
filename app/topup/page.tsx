'use client';
import {
  Box, Button, Card, CardContent, Checkbox, Divider,
  FormControlLabel, InputAdornment, TextField, Typography,
} from '@mui/material';
import AppShell from '@/components/AppShell';

const PAYMENT_METHODS = [
  { label: 'Visa', color: '#1A1F71', text: '#fff', content: 'VISA' },
  { label: 'Mastercard', color: '#EB001B', text: '#fff', content: 'MC' },
  { label: 'PayPal', color: '#003087', text: '#fff', content: 'PayPal' },
  { label: 'Crypto', color: '#F7931A', text: '#fff', content: '₿' },
  { label: 'Apple Pay', color: '#000', text: '#fff', content: '' },
  { label: 'Google Pay', color: '#4285F4', text: '#fff', content: 'G Pay' },
];

export default function TopUpPage() {
  return (
    <AppShell>
      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: '"Poppins", sans-serif' }}>
          Billing
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500, fontSize: 13, letterSpacing: '0.06em' }}
        >
          GENERATE INVOICE
        </Button>
      </Box>

      {/* Add credits card */}
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600 }}>
            Add credits
          </Typography>

          <TextField
            label="Enter amount"
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ fontFamily: '"Poppins", sans-serif', color: 'text.primary', fontWeight: 500 }}>$</Typography>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& .MuiInputBase-root': { fontFamily: '"Poppins", sans-serif' } }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2" sx={{ fontFamily: '"Poppins", sans-serif' }}>
                I agree to{' '}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontFamily: '"Poppins", sans-serif', color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  terms and conditions
                </Typography>
              </Typography>
            }
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500, fontSize: 15, px: 4, letterSpacing: '0.06em' }}
            >
              NEXT
            </Button>
          </Box>

          <Divider />

          {/* We accept */}
          <Box>
            <Typography variant="body2" sx={{ fontFamily: '"Poppins", sans-serif', color: 'text.secondary', mb: 1.5 }}>
              We accept
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {PAYMENT_METHODS.map((pm) => (
                <Box
                  key={pm.label}
                  sx={{
                    bgcolor: pm.color,
                    color: pm.text,
                    borderRadius: 1,
                    px: 2,
                    py: 0.75,
                    minWidth: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                  }}
                >
                  {pm.content || pm.label}
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </AppShell>
  );
}
