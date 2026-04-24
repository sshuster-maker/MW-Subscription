export type Tier = 'basic' | 'premium' | 'enterprise';

export const TIER_PRICES: Record<Tier, string> = {
  basic: 'Free',
  premium: '$114',
  enterprise: '$345',
};

export const TIER_LABELS: Record<Tier, string> = {
  basic: 'Basic',
  premium: 'Premium',
  enterprise: 'Enterprise',
};

export interface FeatureGroup {
  category: string;
  features: Feature[];
}

export interface Feature {
  name: string;
  basic: string | boolean;
  premium: string | boolean;
  enterprise: string | boolean;
}

export const FEATURES: FeatureGroup[] = [
  {
    category: 'CORE',
    features: [
      { name: 'Global SMS Connectivity with quality SMS Routes', basic: true, premium: true, enterprise: true },
      { name: 'Web Portal access', basic: true, premium: true, enterprise: true },
      { name: 'Web Portal access (advanced)', basic: true, premium: true, enterprise: true },
      { name: '24/7 Online Support', basic: true, premium: 'Includes a dedicated CSM', enterprise: 'Includes a dedicated CSM' },
      { name: 'Reporting and Analytics', basic: true, premium: true, enterprise: true },
      { name: 'Prepaid Terms', basic: true, premium: true, enterprise: true },
    ],
  },
  {
    category: 'ENTERPRISE FEATURES',
    features: [
      { name: 'Option for Discounted Volume-Based pricing', basic: false, premium: false, enterprise: true },
      { name: 'Optional Credit Limit', basic: false, premium: false, enterprise: true },
    ],
  },
  {
    category: 'CALL CENTER CONNECT',
    features: [
      { name: 'Access to Call Center Connect', basic: 'Access to UI, Up to 5 Agents', premium: 'Includes 25 Agents, Campaign Manager, SIP-Trunk creation', enterprise: 'Includes 50 Agents, Campaign Manager, SIP-Trunk creation' },
    ],
  },
  {
    category: '2-WAY MESSAGING',
    features: [
      { name: 'Access to MessageWhiz 2-Way Platform', basic: false, premium: 'Viber, WhatsApp, RCS, Telegram, Chat Manager', enterprise: 'Viber, WhatsApp, RCS, Telegram, Chat Manager' },
      { name: 'Access to MessageWhiz Email (API or Platform)', basic: false, premium: false, enterprise: true },
      { name: 'WhatsApp Service Provider fee', basic: false, premium: 'Up to 10K business-initiated messages/month', enterprise: 'Up to 50K business-initiated messages/month' },
    ],
  },
  {
    category: 'MESSAGING FEATURES',
    features: [
      { name: 'Chatbot Support', basic: false, premium: true, enterprise: true },
      { name: 'Channel Setup', basic: false, premium: true, enterprise: true },
      { name: 'Branded Messaging / Verified Status Icon Assistance', basic: false, premium: true, enterprise: true },
      { name: 'Multimedia Messages', basic: false, premium: true, enterprise: true },
      { name: 'Branded Stickers / Interactive Buttons', basic: false, premium: true, enterprise: true },
    ],
  },
  {
    category: 'AI & OPTIMIZATION',
    features: [
      { name: 'Optimization Tools (CTR-Threshold & AI-based Text Optimization)', basic: false, premium: false, enterprise: true },
    ],
  },
];

export interface UpgradeFeature {
  category: string;
  name: string;
  detail?: string;
  tag: 'new' | 'increased';
  from?: string;
  to?: string;
}

export const UPGRADE_BASIC_TO_PREMIUM: UpgradeFeature[] = [
  { category: '2-WAY MESSAGING CHANNELS', name: 'Viber, WhatsApp, RCS, Telegram', detail: 'WhatsApp: Incl. up to 10K business-initiated messages / month', tag: 'new' },
  { category: '2-WAY MESSAGING CHANNELS', name: 'Chat manager', tag: 'new' },
  { category: 'CALL CENTER CONNECT', name: 'Campaign Manager, SIP-Trunk', tag: 'new' },
  { category: 'CALL CENTER CONNECT', name: 'Number of agents', detail: '5 → 25 agents', tag: 'increased' },
  { category: 'USER MANAGEMENT', name: 'Number of users', detail: '5 → 25 users', tag: 'increased' },
  { category: 'MESSAGING FEATURES', name: 'Chatbot support', tag: 'new' },
  { category: 'MESSAGING FEATURES', name: 'Branded Messaging / Verified Status Icon Assistance', tag: 'new' },
  { category: 'MESSAGING FEATURES', name: 'Multimedia messages', detail: 'Branded stickers & interactive buttons', tag: 'new' },
  { category: 'MESSAGING FEATURES', name: 'Dedicated CSM', detail: '24/7 support with a customer success manager', tag: 'new' },
];

export const UPGRADE_BASIC_TO_ENTERPRISE: UpgradeFeature[] = [
  ...UPGRADE_BASIC_TO_PREMIUM,
  { category: 'NEW FEATURES', name: 'Email (API or Platform)', tag: 'new' },
  { category: 'NEW FEATURES', name: 'Volume-based discounted pricing', tag: 'new' },
  { category: 'NEW FEATURES', name: 'Optional credit limit', tag: 'new' },
  { category: 'NEW FEATURES', name: 'Ai-based text optimization', detail: 'CTR-Threshold & optimization tools', tag: 'new' },
];

export const UPGRADE_PREMIUM_TO_ENTERPRISE: UpgradeFeature[] = [
  { category: 'NEW CHANNEL', name: 'Email (API or Platform)', tag: 'new' },
  { category: 'CALL CENTER CONNECT', name: 'WhatsApp business-initiated messages', detail: '10K → 50K messages / month', tag: 'increased' },
  { category: 'CALL CENTER CONNECT', name: 'Call Center Connect agents', detail: '25 → 50 agents', tag: 'increased' },
  { category: 'USER MANAGEMENT', name: 'Number of users', detail: '25 → 50 users', tag: 'increased' },
  { category: 'NEW FEATURES', name: 'Volume-based discounted pricing', tag: 'new' },
  { category: 'NEW FEATURES', name: 'Optional credit limit', detail: 'Branded stickers & interactive buttons', tag: 'new' },
  { category: 'NEW FEATURES', name: 'Ai-based text optimization', detail: 'CTR-Threshold & optimization tools', tag: 'new' },
];

export interface DowngradeFeature {
  category: string;
  name: string;
  detail?: string;
  tag: 'removed' | 'reduced';
  from?: string;
  to?: string;
}

export const DOWNGRADE_ENTERPRISE_TO_PREMIUM: DowngradeFeature[] = [
  { category: 'CHANNEL', name: 'Email (API or Platform)', tag: 'removed' },
  { category: 'CALL CENTER CONNECT', name: 'WhatsApp business-initiated messages', detail: '50K → 10K messages / month', tag: 'reduced' },
  { category: 'CALL CENTER CONNECT', name: 'Call Center Connect agents', detail: '50 → 25 agents', tag: 'reduced' },
  { category: 'USER MANAGEMENT', name: 'Number of users', detail: '50 → 25 users', tag: 'reduced' },
  { category: 'FEATURES REMOVED', name: 'Volume-based discounted pricing', tag: 'removed' },
  { category: 'FEATURES REMOVED', name: 'Optional credit limit', tag: 'removed' },
  { category: 'FEATURES REMOVED', name: 'Ai-based text optimization', tag: 'removed' },
];

export const DOWNGRADE_TO_BASIC: DowngradeFeature[] = [
  { category: '2-WAY MESSAGING CHANNELS', name: 'Viber, WhatsApp, RCS, Telegram', tag: 'removed' },
  { category: '2-WAY MESSAGING CHANNELS', name: 'Chat manager', tag: 'removed' },
  { category: 'CALL CENTER CONNECT', name: 'Campaign Manager, SIP-Trunk', tag: 'removed' },
  { category: 'CALL CENTER CONNECT', name: 'Number of agents', detail: '25 → 5 agents', tag: 'reduced' },
  { category: 'USER MANAGEMENT', name: 'Number of users', detail: '25 → 5 users', tag: 'reduced' },
  { category: 'MESSAGING FEATURES', name: 'Chatbot support', tag: 'removed' },
  { category: 'MESSAGING FEATURES', name: 'Channel setup & branded messaging', detail: 'Verified status icon assistance', tag: 'removed' },
  { category: 'MESSAGING FEATURES', name: 'Multimedia messages', detail: 'Branded stickers & interactive buttons', tag: 'removed' },
  { category: 'MESSAGING FEATURES', name: 'Dedicated CSM', detail: '24/7 support reverts to standard online', tag: 'removed' },
];
