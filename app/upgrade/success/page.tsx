'use client';
import { Alert, Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AppShell from '@/components/AppShell';
import { TIER_LABELS, Tier } from '@/lib/tierData';

function UpgradeSuccessContent() {
  const router = useRouter();
  const params = useSearchParams();

  const tier = (params.get('tier') as Tier) || 'premium';
  const charged = params.get('charged') || '$95.60';
  const nextCharge = params.get('nextCharge') || '';
  const nextDate = params.get('nextDate') || '';
  const tierLabel = TIER_LABELS[tier] ?? tier;

  return (
    <Box>
      {/* Page heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton size="small" onClick={() => router.push('/subscription')}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5">Subscription management</Typography>
      </Box>

      {/* Full-height white card */}
      <Card sx={{ minHeight: 'calc(100vh - 64px - 48px - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ maxWidth: 552, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>

            {/* Success badge */}
            <Box
              sx={{
                width: 128,
                height: 128,
                bgcolor: '#43a047',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(67,160,71,0.35)',
              }}
            >
              <CheckIcon sx={{ fontSize: 64, color: '#fff', fontWeight: 700 }} />
            </Box>

            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: 500, textAlign: 'center' }}>
              You&apos;re on {tierLabel}
            </Typography>

            {/* Subtitle */}
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.primary' }}>
              <strong>{charged}</strong> has been charged from your balance. Your new features are active now.
            </Typography>

            {/* Info alert */}
            <Alert
              severity="info"
              icon={<InfoOutlinedIcon fontSize="small" />}
              sx={{ width: '100%', alignItems: 'flex-start' }}
            >
              <Typography variant="body2" component="div" sx={{ color: 'inherit', lineHeight: 1.6 }}>
                <span>Tier — {tierLabel}</span><br />
                {nextCharge && <><span>Next charge — {nextCharge}</span><br /></>}
                {nextDate && <span>Next billing date — {nextDate}</span>}
              </Typography>
            </Alert>

            {/* CTA button */}
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push(`/subscription?tier=${tier}`)}
              sx={{ mt: 2, px: 4, textTransform: 'uppercase', fontWeight: 500 }}
            >
              Start using {tierLabel}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function UpgradeSuccessPage() {
  return (
    <AppShell>
      <Suspense fallback={<Box sx={{ p: 3 }}><Typography>Loading…</Typography></Box>}>
        <UpgradeSuccessContent />
      </Suspense>
    </AppShell>
  );
}
