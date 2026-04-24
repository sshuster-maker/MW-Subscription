'use client';
import {
  Box, Button, Card, CardContent, Divider, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import FeatureChip from './FeatureChip';
import type { UpgradeFeature } from '@/lib/tierData';

interface Props {
  fromTier: string;
  toTier: string;
  features: UpgradeFeature[];
  priceNow: string;
  priceNext: string;
  nextBillingDate: string;
  proratedNote: string;
}

export default function UpgradeReview({
  fromTier, toTier, features, priceNow, priceNext, nextBillingDate, proratedNote,
}: Props) {
  const router = useRouter();

  // Group features by category
  const grouped = features.reduce<Record<string, UpgradeFeature[]>>((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <Box>
      {/* Back */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2, textTransform: 'none', color: '#1A1D23', fontWeight: 400, fontSize: 15 }}
      >
        Subscription management
      </Button>

      <Card sx={{ maxWidth: 720, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Upgrade to {toTier}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You&apos;re upgrading from {fromTier} to {toTier}. Here&apos;s what you&apos;ll gain access to immediately.
          </Typography>

          {Object.entries(grouped).map(([category, items]) => (
            <Box key={category} sx={{ mb: 2.5 }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}
              >
                {category}
              </Typography>
              {items.map((feat, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    py: 1.25,
                    borderBottom: i < items.length - 1 ? '1px solid #F1F5F9' : 'none',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{feat.name}</Typography>
                    {feat.detail && (
                      <Typography variant="caption" color="text.secondary">{feat.detail}</Typography>
                    )}
                  </Box>
                  <FeatureChip tag={feat.tag} />
                </Box>
              ))}
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}

          {/* Pricing summary */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Amount charged now</Typography>
                <Typography variant="caption" color="text.secondary">{proratedNote}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{priceNow}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">Next full charge</Typography>
              <Typography variant="body2">{priceNext} on {nextBillingDate}</Typography>
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
            <Button variant="outlined" onClick={() => router.back()} sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}>
              KEEP {fromTier.toUpperCase()}
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push('/subscription?tier=' + toTier.toLowerCase())}
            >
              CONFIRM
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
