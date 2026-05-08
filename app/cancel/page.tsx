'use client';
import {
  Box, Button, Card, CardContent, Checkbox, Divider,
  IconButton, TextField, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import FeatureChip from '@/components/FeatureChip';
import { DOWNGRADE_TO_BASIC } from '@/lib/tierData';

const REASONS = [
  { id: 'expensive', label: 'Too expensive', desc: 'The subscription price doesn\'t fit my current budget' },
  { id: 'missing', label: 'Missing features', desc: 'I need features that aren\'t available in my current tier' },
  { id: 'unused', label: 'Not using it enough', desc: 'The tier doesn\'t match my current messaging volume' },
  { id: 'switch', label: 'Switching to another provider', desc: 'I found a solution that better fits my needs' },
  { id: 'pause', label: 'Temporary pause', desc: 'My business needs have changed for now, but I may return' },
  { id: 'other', label: 'Other', desc: 'Something else not listed above' },
];

function CancelContent() {
  const router = useRouter();
  const params = useSearchParams();
  const isV2 = params.get('v') === '2';
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState('');

  function toggle(id: string) {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  const grouped = DOWNGRADE_TO_BASIC.reduce<Record<string, typeof DOWNGRADE_TO_BASIC>>((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <Box>
        {/* Page heading */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton
            size="small"
            onClick={() => step === 2 ? setStep(1) : router.push('/subscription')}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5">Subscription management</Typography>
        </Box>

        {/* ── STEP 1: Questionnaire ── */}
        {step === 1 && (
          <Card sx={{ maxWidth: 600, mx: 'auto', borderRadius: 1 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>{isV2 ? 'Why are you canceling?' : 'Why are you downgrading?'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your feedback helps us improve. Select all that apply.
              </Typography>

              {REASONS.map((r) => (
                <Box
                  key={r.id}
                  onClick={() => toggle(r.id)}
                  sx={{
                    display: 'flex', alignItems: 'flex-start', gap: 1,
                    minHeight: 48, py: 0.5, cursor: 'pointer', borderRadius: 1,
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Checkbox
                    checked={selected.has(r.id)}
                    size="small"
                    sx={{ mt: 0.25, p: 0.5, flexShrink: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggle(r.id)}
                  />
                  <Box sx={{ pt: 0.5 }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4 }}>{r.label}</Typography>
                    <Typography variant="body2" color="text.secondary">{r.desc}</Typography>
                  </Box>
                </Box>
              ))}

              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Leave the comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, py: 1, mt: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push(isV2 ? '/subscription?v=2' : '/subscription')}
                >
                  {isV2 ? 'KEEP PLAN' : 'KEEP PREMIUM'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(2)}
                >
                  CONFIRM
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 2: Feature loss confirmation ── */}
        {step === 2 && (
          <Card sx={{ maxWidth: 600, mx: 'auto', borderRadius: 1 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>{isV2 ? 'Cancel subscription' : 'Downgrade subscription'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {isV2
                  ? "You're canceling your subscription. Here's what you'll lose access to on 1 May 2026."
                  : "You're downgrading from Premium to Basic. Here's what you'll lose access to on 1 May 2026."}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                Your tier stays active until 30 April 2026
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                The money is non-refundable.
              </Typography>

              {Object.entries(grouped).map(([category, items]) => (
                <Box key={category} sx={{ mb: 2 }}>
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, py: 1, mt: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push('/subscription?downgraded=true' + (isV2 ? '&v=2' : ''))}
                >
                  CONFIRM
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(isV2 ? '/subscription?v=2' : '/subscription')}
                >
                  {isV2 ? 'KEEP PLAN' : 'KEEP PREMIUM'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
  );
}

export default function CancelPage() {
  return (
    <AppShell>
      <Suspense fallback={<Box sx={{ p: 3 }}><Typography>Loading…</Typography></Box>}>
        <CancelContent />
      </Suspense>
    </AppShell>
  );
}
