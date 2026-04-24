'use client';
import { Chip } from '@mui/material';

type Tag = 'new' | 'increased' | 'removed' | 'reduced';

const CONFIG: Record<Tag, { label: string; color: string; bg: string; border: string }> = {
  new: { label: 'New', color: '#2E7D32', bg: '#F0FBF1', border: '#2E7D32' },
  increased: { label: 'Increased', color: '#1565C0', bg: '#EBF2FF', border: '#1565C0' },
  removed: { label: 'Will be removed', color: '#C62828', bg: '#FFF5F5', border: '#C62828' },
  reduced: { label: 'Reduced', color: '#E65100', bg: '#FFF8F0', border: '#E65100' },
};

export default function FeatureChip({ tag }: { tag: Tag }) {
  const cfg = CONFIG[tag];
  return (
    <Chip
      label={cfg.label}
      size="small"
      variant="outlined"
      sx={{
        color: cfg.color,
        borderColor: cfg.border,
        bgcolor: cfg.bg,
        fontWeight: 500,
        fontSize: 11,
        height: 22,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
}
