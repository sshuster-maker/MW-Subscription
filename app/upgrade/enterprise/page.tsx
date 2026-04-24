'use client';
import AppShell from '@/components/AppShell';
import UpgradeReview from '@/components/UpgradeReview';
import { UPGRADE_BASIC_TO_ENTERPRISE, UPGRADE_PREMIUM_TO_ENTERPRISE } from '@/lib/tierData';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';

function Content() {
  const params = useSearchParams();
  const fromPremium = params.get('from') === 'premium';

  return (
    <UpgradeReview
      fromTier={fromPremium ? 'Premium' : 'Basic'}
      toTier="Enterprise"
      features={fromPremium ? UPGRADE_PREMIUM_TO_ENTERPRISE : UPGRADE_BASIC_TO_ENTERPRISE}
      priceNow="$95.60"
      proratedNote="Prorated for 20 remaining days (Apr 11–30)"
      priceNext={fromPremium ? '$345.00' : '$345.00'}
      nextBillingDate="1 May 2026"
    />
  );
}

export default function UpgradeEnterprisePage() {
  return (
    <AppShell>
      <Suspense fallback={<Box sx={{ p: 3 }}><Typography>Loading…</Typography></Box>}>
        <Content />
      </Suspense>
    </AppShell>
  );
}
