import AppShell from '@/components/AppShell';
import DowngradeReview from '@/components/DowngradeReview';
import { DOWNGRADE_ENTERPRISE_TO_PREMIUM } from '@/lib/tierData';

export default function DowngradePremiumPage() {
  return (
    <AppShell>
      <DowngradeReview
        fromTier="Enterprise"
        toTier="Premium"
        features={DOWNGRADE_ENTERPRISE_TO_PREMIUM}
        effectiveDate="1 May 2026"
        activeUntil="30 April 2026"
      />
    </AppShell>
  );
}
