import type { NavItem, Folder, SettingsSection, StatCard, HomeTab } from './types';

export const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', path: '/home' },
  { id: 'files', label: 'Files', icon: 'folder', path: '/files' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

export const homeTabs: HomeTab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'team', label: 'Team' },
  { id: 'projects', label: 'Projects' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'messages', label: 'Messages' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'finance', label: 'Finance' },
];

export const statCards: StatCard[] = [
  { id: 'revenue', label: 'TOTAL REVENUE', value: '$128,430', change: '+12.5% vs last month', changeType: 'positive' },
  { id: 'users', label: 'ACTIVE USERS', value: '43,201', change: '+3.2% vs last month', changeType: 'positive' },
  { id: 'leads', label: 'NEW LEADS', value: '1,240', change: '-1.4% vs last month', changeType: 'negative' },
  { id: 'conversion', label: 'CONVERSION', value: '3.42%', change: '+0.8% vs last month', changeType: 'positive' },
];

export const folders: Folder[] = [
  {
    id: 'documents',
    name: 'Documents',
    icon: 'folder',
    files: [
      { id: '1', name: 'Resume.pdf', size: '2.4 MB', modified: 'Oct 12, 2023' },
      { id: '2', name: 'Project_Plan.docx', size: '2.4 MB', modified: 'Oct 12, 2023' },
      { id: '3', name: 'Budget.xlsx', size: '2.4 MB', modified: 'Oct 12, 2023' },
    ],
  },
  {
    id: 'images',
    name: 'Images',
    icon: 'image',
    files: [
      { id: '4', name: 'Photo_001.jpg', size: '3.2 MB', modified: 'Oct 10, 2023' },
      { id: '5', name: 'Screenshot.png', size: '1.8 MB', modified: 'Oct 11, 2023' },
    ],
  },
  {
    id: 'videos',
    name: 'Videos',
    icon: 'video',
    files: [
      { id: '6', name: 'Tutorial.mp4', size: '2.4 MB', modified: 'Oct 12, 2023' },
      { id: '7', name: 'Demo_Day.mov', size: '2.4 MB', modified: 'Oct 12, 2023' },
    ],
  },
  {
    id: 'downloads',
    name: 'Downloads',
    icon: 'download',
    files: [],
  },
  {
    id: 'work',
    name: 'Work',
    icon: 'briefcase',
    files: [],
  },
];

export const settingsSections: SettingsSection[] = [
  {
    id: 'account',
    label: 'Account',
    icon: 'user',
    categories: [
      { id: 'general', label: 'General' },
      { id: 'profile', label: 'Profile' },
      { id: 'preferences', label: 'Preferences' },
      { id: 'sessions', label: 'Sessions' },
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bell',
    categories: [
      { id: 'email', label: 'Email' },
      { id: 'push', label: 'Push' },
      { id: 'sms', label: 'SMS' },
      { id: 'activity', label: 'Activity' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'shield',
    categories: [
      { id: 'password', label: 'Password' },
      { id: 'two-factor', label: 'Two-Factor Auth' },
      { id: 'login-history', label: 'Login History' },
      { id: 'active-sessions', label: 'Active Sessions' },
    ],
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: 'palette',
    categories: [
      { id: 'theme', label: 'Theme' },
      { id: 'layout', label: 'Layout' },
    ],
  },
  {
    id: 'language',
    label: 'Language',
    icon: 'globe',
    categories: [
      { id: 'display', label: 'Display Language' },
      { id: 'region', label: 'Region' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: 'credit-card',
    categories: [
      { id: 'subscription', label: 'Subscription' },
      { id: 'payment-methods', label: 'Payment Methods' },
      { id: 'invoices', label: 'Invoices' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'plug',
    categories: [
      { id: 'connected', label: 'Connected Apps' },
      { id: 'api', label: 'API Keys' },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: 'lock',
    categories: [
      { id: 'data', label: 'Data' },
      { id: 'sharing', label: 'Sharing' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    icon: 'help-circle',
    categories: [
      { id: 'ticket', label: 'Support Ticket' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'sales', label: 'Sales' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'mail',
    categories: [
      { id: 'support-ticket', label: 'Support Ticket' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'sales', label: 'Sales' },
    ],
  },
];

export const user = {
  name: 'John Doe',
  email: 'john@example.com',
  initials: 'JD',
};
