'use client';
import {
  Box, Button, Card, CardContent, Divider, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import FeatureChip from './FeatureChip';
import type { DowngradeFeature } from '@/lib/tierData';

interface Props {
  fromTier: string;
  toTier: string;
  features: DowngradeFeature[];
  effectiveDate: string;
  activeUntil: string;
}

export default function DowngradeReview({ fromTier, toTier, features, effectiveDate, activeUntil }: Props) {
  const router = useRouter();

  const grouped = features.reduce<Record<string, DowngradeFeature[]>>((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2, textTransform: 'none', color: '#1A1D23', fontWeight: 400, fontSize: 15 }}
      >
        Subscription management
      </Button>

      <Card sx={{ maxWidth: 720, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Downgrade subscription</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            You&apos;re downgrading from {fromTier} to {toTier}. Here&apos;s what you&apos;ll lose access to on {effectiveDate}.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your tier stays active until {activeUntil}
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}
            >
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
