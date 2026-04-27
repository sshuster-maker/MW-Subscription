'use client';
import {
  Alert, Box, Button, Card, CardContent, Chip, Divider, Snackbar,
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AppShell from '@/components/AppShell';
import { FEATURES, TIER_PRICES, Tier, TIER_LABELS } from '@/lib/tierData';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const TIER_ORDER: Tier[] = ['basic', 'premium', 'enterprise'];

function SubscriptionContent() {
  const router = useRouter();
  const params = useSearchParams();
  const currentTier = (params.get('tier') as Tier) || 'premium';
  const downgraded = params.get('downgraded') === 'true';
  const upgraded = params.get('upgraded') === 'true';
  const [toastOpen, setToastOpen] = useState(downgraded || upgraded);
  // Persists the two-card layout even after the URL param is cleared
  const [showScheduled, setShowScheduled] = useState(downgraded);

  useEffect(() => {
    if (downgraded || upgraded) setToastOpen(true);
    if (downgraded) setShowScheduled(true);
  }, [downgraded, upgraded]);

  const currentIdx = TIER_ORDER.indexOf(currentTier);

  const TIER_INFO = {
    basic: { label: 'Basic', price: 'Free', period: '1 – 31 Mar 2026', billing: 'Free' },
    premium: { label: 'Premium', price: '$114', period: '1 – 28 Feb 2026', billing: '$114' },
    enterprise: { label: 'Enterprise', price: '$345', period: '1 – 31 Mar 2026', billing: '$345' },
  };

  const info = TIER_INFO[currentTier];

  function getUpgradePath(target: Tier) {
    if (currentTier === 'basic' && target === 'premium') return '/upgrade/premium';
    if (currentTier === 'basic' && target === 'enterprise') return '/upgrade/enterprise';
    if (currentTier === 'premium' && target === 'enterprise') return '/upgrade/enterprise?from=premium';
    return null;
  }

  function getDowngradePath(target: Tier) {
    if (currentTier === 'enterprise' && target === 'premium') return '/downgrade/premium';
    if ((currentTier === 'premium' || currentTier === 'enterprise') && target === 'basic') return '/cancel';
    if (currentTier === 'premium' && target === 'basic') return '/cancel?from=premium';
    return null;
  }

  function renderCell(value: string | boolean) {
    if (value === true) return <CheckIcon sx={{ fontSize: 18, color: '#1A1D23' }} />;
    if (value === false) return null;
    return <Typography variant="caption" sx={{ color: '#5C6370', fontSize: 11, lineHeight: 1.3 }}>{value as string}</Typography>;
  }

  return (
    <Box>
        {/* Toast notifications */}
        <Snackbar
          open={toastOpen}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => {
            setToastOpen(false);
            router.replace('/subscription' + (currentTier !== 'premium' ? `?tier=${currentTier}` : ''));
          }}
        >
          <Alert
            severity="success"
            onClose={() => {
              setToastOpen(false);
              router.replace('/subscription' + (currentTier !== 'premium' ? `?tier=${currentTier}` : ''));
            }}
            sx={{ width: '100%' }}
          >
            {downgraded
              ? 'Downgrade scheduled. Your plan changes on 1 May 2026.'
              : `Upgrade successful! You now have access to ${TIER_LABELS[currentTier]} features.`}
          </Alert>
        </Snackbar>

        {/* Page heading */}
        <Typography variant="h5" sx={{ mb: 3 }}>Subscription management</Typography>

        {/* Current tier card — two cards when downgrade is scheduled */}
        {showScheduled ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
            {/* Left: current active tier */}
            <Card>
              <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, lineHeight: 2.66 }}>
                  Current tier
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Premium</Typography>
                  <Chip label="Active" size="small" variant="outlined" color="success" />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Billing</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>$114</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Tier period</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>1 – 30 Apr 2026</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Button size="small" variant="text" endIcon={<ExpandMoreIcon />} sx={{ fontSize: 13, px: 0 }}>
                    VIEW LIMITS
                  </Button>
                  <Button size="small" variant="contained" onClick={() => router.push('/subscription')} sx={{ fontSize: 12 }}>
                    CHANGE TIER
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Right: scheduled future tier */}
            <Card>
              <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, lineHeight: 2.66 }}>
                  Scheduled tier
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>Basic</Typography>
                  <Chip label="Scheduled" size="small" variant="outlined" color="warning" />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Billing</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Free</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Tier period</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>1 – 31 May 2026</Typography>
                </Box>
                <Divider />
                <Button size="small" variant="text" endIcon={<ExpandMoreIcon />} sx={{ fontSize: 13, px: 0, alignSelf: 'flex-start' }}>
                  VIEW LIMITS
                </Button>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                CURRENT TIER
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
                <Typography variant="h5">{info.label}</Typography>
                <Chip label="Active" size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, fontSize: 11, height: 22 }} />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, maxWidth: 400, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Billing</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{info.billing}{currentTier !== 'basic' && '/month'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Tier period</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{info.period}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button size="small" variant="text" startIcon={<VisibilityOutlinedIcon />} sx={{ textTransform: 'none', fontSize: 13 }}>
                  VIEW LIMITS
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => router.push(`/subscription?tier=${currentTier}`)}
                  sx={{ fontSize: 12 }}
                >
                  CHANGE TIER
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* All tiers */}
        <Typography variant="h6" sx={{ mb: 2 }}>All tiers</Typography>

        <Card sx={{ overflow: 'visible' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '28%', border: 'none', pb: 0 }} />
                {TIER_ORDER.map((tier) => {
                  const isCurrentTier = tier === currentTier;
                  const tierIdx = TIER_ORDER.indexOf(tier);
                  const canUpgrade = tierIdx > currentIdx;
                  const canDowngrade = tierIdx < currentIdx;
                  const upgradePath = canUpgrade ? getUpgradePath(tier) : null;
                  const downgradePath = canDowngrade ? getDowngradePath(tier) : null;

                  return (
                    <TableCell
                      key={tier}
                      align="center"
                      sx={{
                        border: 'none',
                        pb: 1,
                        pt: isCurrentTier ? 0 : 2,
                        position: 'relative',
                        ...(isCurrentTier && {
                          bgcolor: '#F0F7FF',
                          '&::before': {
                            content: '""', position: 'absolute', top: 0, left: 0, right: 0,
                            height: 3, bgcolor: 'primary.main',
                          },
                        }),
                      }}
                    >
                      {isCurrentTier && (
                        <Chip
                          label="Current tier"
                          size="small"
                          sx={{ bgcolor: 'primary.main', color: '#fff', fontWeight: 600, fontSize: 11, height: 22, mb: 1 }}
                        />
                      )}
                      <Typography variant="caption" sx={{ display: 'block', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {tier}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {TIER_PRICES[tier]}
                        {tier !== 'basic' && (
                          <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 400, ml: 0.3 }}>
                            /month
                          </Typography>
                        )}
                        {tier === 'enterprise' && (
                          <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 400, ml: 0.5 }}>
                            Starting from
                          </Typography>
                        )}
                      </Typography>

                      {canDowngrade && downgradePath && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ArrowDownwardIcon />}
                          onClick={() => router.push(downgradePath)}
                          sx={{
                            mt: 1, width: '90%', fontSize: 11,
                            borderColor: '#D1D5DB', color: '#5C6370',
                            '&:hover': { borderColor: '#C62828', color: '#C62828' },
                          }}
                        >
                          DOWNGRADE
                        </Button>
                      )}
                      {canUpgrade && upgradePath && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ArrowUpwardIcon />}
                          onClick={() => router.push(upgradePath)}
                          sx={{ mt: 1, width: '90%', fontSize: 11, borderColor: 'primary.main', color: 'primary.main' }}
                        >
                          UPGRADE
                        </Button>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {FEATURES.map((group) => (
                <>
                  <TableRow key={`cat-${group.category}`}>
                    <TableCell
                      colSpan={4}
                      sx={{
                        bgcolor: '#F8FAFC', py: 0.75, px: 2,
                        border: '1px solid #F1F5F9',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#94A3B8', letterSpacing: 1 }}>
                        {group.category}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {group.features.map((feat) => (
                    <TableRow
                      key={feat.name}
                      sx={{ '&:hover': { bgcolor: '#FAFAFA' } }}
                    >
                      <TableCell sx={{ py: 1.5, px: 2, fontSize: 13, color: '#1A1D23', borderColor: '#F1F5F9' }}>
                        {feat.name}
                      </TableCell>
                      {TIER_ORDER.map((tier) => (
                        <TableCell
                          key={tier}
                          align="center"
                          sx={{
                            py: 1.5, fontSize: 12, borderColor: '#F1F5F9',
                            bgcolor: tier === currentTier ? '#F0F7FF' : 'transparent',
                          }}
                        >
                          {renderCell(feat[tier])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </Card>
    </Box>
  );
}

export default function SubscriptionPage() {
  return (
    <AppShell>
      <Suspense fallback={<Box sx={{ p: 3 }}><Typography>Loading…</Typography></Box>}>
        <SubscriptionContent />
      </Suspense>
    </AppShell>
  );
}
