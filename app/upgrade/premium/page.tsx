import AppShell from '@/components/AppShell';
import UpgradeReview from '@/components/UpgradeReview';
import { UPGRADE_BASIC_TO_PREMIUM } from '@/lib/tierData';

export default function UpgradePremiumPage() {
  return (
    <AppShell>
      <UpgradeReview
        fromTier="Basic"
        toTier="Premium"
        features={UPGRADE_BASIC_TO_PREMIUM}
        priceNow="$95.60"
        proratedNote="Prorated for 20 remaining days (Apr 11–30)"
        priceNext="$114.00"
        nextBillingDate="1 May 2026"
      />
    </AppShell>
  );
}
