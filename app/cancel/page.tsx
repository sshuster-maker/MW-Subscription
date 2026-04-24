'use client';
import {
  Alert, Box, Button, Card, CardContent, Checkbox, Dialog,
  DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel,
  LinearProgress, TextField, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS = [
  'Subscription info',
  'Reason',
  'What you\'ll lose',
  'Before you go',
  'Confirm',
  'Done',
];

export default function CancelPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <AppShell>
      <Box sx={{ p: 3 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => (step > 1 ? setStep((s) => (s - 1) as Step) : router.back())}
          sx={{ mb: 2, textTransform: 'none', color: '#1A1D23', fontWeight: 400, fontSize: 15 }}
        >
          Subscription management
        </Button>

        {/* Progress bar */}
        <Box sx={{ maxWidth: 720, mx: 'auto', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            {STEP_LABELS.map((label, i) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  color: i + 1 === step ? '#1565C0' : i + 1 < step ? '#2E7D32' : '#9CA3AF',
                  fontWeight: i + 1 === step ? 700 : 400,
                  fontSize: 11,
                }}
              >
                {i + 1 < step ? '✓ ' : ''}{label}
              </Typography>
            ))}
          </Box>
          <LinearProgress
            variant="determinate"
            value={(step / 6) * 100}
            sx={{ height: 4, borderRadius: 2, bgcolor: '#E5E7EB', '& .MuiLinearProgress-bar': { bgcolor: '#1565C0' } }}
          />
        </Box>

        {/* ── STEP 1: Subscription overview ── */}
        {step === 1 && (
          <Card sx={{ maxWidth: 720, mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Cancel / Downgrade to Basic</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You&apos;re about to downgrade from Premium to Basic (Free). Review what changes on 1 May 2026.
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                <Box sx={{ p: 2, bgcolor: '#F0F7FF', borderRadius: 1, border: '1px solid #BFDBFE' }}>
                  <Typography variant="caption" color="text.secondary">Current tier</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 16, color: 'primary.main' }}>Premium — $114/month</Typography>
                  <Typography variant="caption">Active until 30 April 2026</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: '#F8F9FA', borderRadius: 1, border: '1px solid #E5E7EB' }}>
                  <Typography variant="caption" color="text.secondary">After downgrade</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 16, color: 'text.secondary' }}>Basic — Free</Typography>
                  <Typography variant="caption">Starting 1 May 2026</Typography>
                </Box>
              </Box>

              <Alert severity="warning" sx={{ mb: 3 }}>
                Your Premium features remain active until <strong>30 April 2026</strong>. After that, access will change to Basic.
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button variant="outlined" onClick={() => router.back()} sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}>
                  KEEP PREMIUM
                </Button>
                <Button variant="contained" onClick={() => setStep(2)}>CONTINUE</Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 2: Reason ── */}
        {step === 2 && (
          <Card sx={{ maxWidth: 720, mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Why are you downgrading?</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your feedback helps us improve. Select the option that best describes your situation.
              </Typography>

              {REASONS.map((r) => (
                <Box
                  key={r.id}
                  onClick={() => toggle(r.id)}
                  sx={{
                    display: 'flex', alignItems: 'flex-start', gap: 1,
                    py: 1.5, cursor: 'pointer', borderRadius: 1,
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Checkbox
                    checked={selected.has(r.id)}
                    size="small"
                    sx={{ mt: -0.25, p: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggle(r.id)}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{r.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{r.desc}</Typography>
                  </Box>
                </Box>
              ))}

              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Leave a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 2, mb: 3 }}
                size="small"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button variant="outlined" onClick={() => router.back()} sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}>
                  KEEP PREMIUM
                </Button>
                <Button variant="contained" onClick={() => setStep(3)}>CONTINUE</Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 3: What you'll lose ── */}
        {step === 3 && (
          <Card sx={{ maxWidth: 720, mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Downgrade subscription</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                You&apos;re downgrading from Premium to Basic. Here&apos;s what you&apos;ll lose access to on 1 May 2026.
              </Typography>
              <Typography variant="body2" sx={{ color: '#E65100', mb: 3, fontWeight: 500 }}>
                Your tier stays active until 30 April 2026
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
                        {feat.detail && <Typography variant="caption" color="text.secondary">{feat.detail}</Typography>}
                      </Box>
                      <FeatureChip tag={feat.tag} />
                    </Box>
                  ))}
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
                <Button variant="outlined" onClick={() => router.back()} sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}>
                  KEEP PREMIUM
                </Button>
                <Button variant="contained" onClick={() => setStep(4)}>CONTINUE</Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 4: Before you go (retention) ── */}
        {step === 4 && (
          <Card sx={{ maxWidth: 720, mx: 'auto' }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64, height: 64, borderRadius: '50%', bgcolor: '#FFF3E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 2,
                }}
              >
                <WarningAmberRoundedIcon sx={{ fontSize: 36, color: '#E65100' }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>Before you go…</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You&apos;re about to downgrade to Basic. Here&apos;s what you&apos;ll permanently lose:
              </Typography>

              <Box sx={{ textAlign: 'left', mb: 3 }}>
                {[
                  { text: 'Viber, WhatsApp, RCS, Telegram', tag: 'removed' as const },
                  { text: 'Campaign Manager & Chat Manager', tag: 'removed' as const },
                  { text: 'Call Center Connect: 25 agents → 5 agents', tag: 'reduced' as const },
                  { text: 'Chatbot support', tag: 'removed' as const },
                  { text: 'Multimedia messages & Branded stickers', tag: 'removed' as const },
                  { text: 'Dedicated CSM (24/7 → standard online)', tag: 'removed' as const },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      py: 1, borderBottom: '1px solid #F1F5F9',
                    }}
                  >
                    <Typography variant="body2">{item.text}</Typography>
                    <FeatureChip tag={item.tag} />
                  </Box>
                ))}
              </Box>

              <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
                All these features will be unavailable from <strong>1 May 2026</strong>. This change cannot be undone until you upgrade again.
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/subscription?tier=premium')}
                  sx={{ color: '#1565C0', borderColor: '#1565C0' }}
                >
                  KEEP MY PLAN
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setStep(5)}
                >
                  CONFIRM DOWNGRADE
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 5: Final confirmation dialog ── */}
        {step === 5 && (
          <>
            <Card sx={{ maxWidth: 720, mx: 'auto', opacity: 0.4, pointerEvents: 'none' }}>
              <CardContent sx={{ p: 4, height: 200 }}>
                <Typography variant="h6" color="text.disabled">Subscription management</Typography>
              </CardContent>
            </Card>

            <Dialog open maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 2 } } }}>
              <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Confirm downgrade to Basic?</Typography>
              </DialogTitle>
              <DialogContent>
                <Alert severity="warning" icon={<WarningAmberRoundedIcon />} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Your Premium features will remain active until 30 April 2026.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    After that date, access to all Premium-only features will be permanently removed and cannot be undone.
                  </Typography>
                </Alert>
                <Typography variant="body2" color="text.secondary">
                  Are you sure you want to downgrade to Basic?
                </Typography>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/subscription?tier=premium')}
                  sx={{ color: '#5C6370', borderColor: '#D1D5DB' }}
                >
                  NO, KEEP PLAN
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setStep(6)}
                >
                  YES, DOWNGRADE TO BASIC
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}

        {/* ── STEP 6: Success ── */}
        {step === 6 && (
          <Card sx={{ maxWidth: 600, mx: 'auto' }}>
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80, height: 80, borderRadius: '50%', bgcolor: '#E8F5E9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 3,
                }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#2E7D32' }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Downgrade scheduled
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Your subscription will change to Basic on 1 May 2026.<br />
                You can continue using all Premium features until 30 April 2026.
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              {[
                { label: 'Current tier', value: 'Premium (Active until 30 Apr 2026)' },
                { label: 'Next tier', value: 'Basic (Starting 1 May 2026)' },
                { label: 'Next billing', value: 'Free — $0/month' },
              ].map((row) => (
                <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.value}</Typography>
                </Box>
              ))}

              <Button
                variant="contained"
                sx={{ mt: 4, px: 5 }}
                onClick={() => router.push('/subscription?tier=basic')}
              >
                DONE
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </AppShell>
  );
}
