import type { IconName } from '../components/Icon';

export interface SettingsNavItem {
  id: string;
  label: string;
  icon: IconName;
}

export interface SubTab {
  id: string;
  label: string;
}

export interface AddOn {
  id: string;
  title: string;
  subtitle?: string;
  employees?: string;
  icon: IconName;
}

export interface Upgrade {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
}

export interface AccountInfo {
  companyName: string;
  accountNumber: string;
  url: string;
  owner: {
    name: string;
    avatar: string;
    role: string;
  };
}

export interface Subscription {
  plan: string;
  packageType: string;
  employees: number;
}

export const settingsNavItems: SettingsNavItem[] = [
  { id: 'account', label: 'Account', icon: 'wrench' },
  { id: 'access-levels', label: 'Access Levels', icon: 'lock' },
  { id: 'employee-fields', label: 'Employee Fields', icon: 'pen-to-square' },
  { id: 'approvals', label: 'Approvals', icon: 'thumbs-up' },
  { id: 'apps', label: 'Apps', icon: 'table-cells' },
  { id: 'ask-bamboohr', label: 'Ask BambooHR', icon: 'circle-question' },
  { id: 'benefits', label: 'Benefits', icon: 'heart' },
  { id: 'company-directory', label: 'Company Directory', icon: 'user-group' },
  { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' },
  { id: 'core-values', label: 'Core Values', icon: 'heart' },
  { id: 'custom-fields', label: 'Custom Fields & Tables', icon: 'sliders' },
  { id: 'email-alerts', label: 'Email Alerts', icon: 'bell' },
  { id: 'employee-community', label: 'Employee Community', icon: 'user-group' },
  { id: 'employee-satisfaction', label: 'Employee Satisfaction', icon: 'face-smile' },
  { id: 'employee-wellbeing', label: 'Employee Wellbeing', icon: 'spa' },
  { id: 'global-employment', label: 'Global Employment', icon: 'location-dot' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge' },
  { id: 'holidays', label: 'Holidays', icon: 'calendar' },
  { id: 'logo-color', label: 'Logo & Color', icon: 'palette' },
  { id: 'offboarding', label: 'Offboarding', icon: 'door-open' },
  { id: 'onboarding', label: 'Onboarding', icon: 'door-closed' },
  { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' },
  { id: 'performance', label: 'Performance', icon: 'chart-line' },
  { id: 'time-off', label: 'Time Off', icon: 'plane' },
  { id: 'time-tracking', label: 'Time Tracking', icon: 'clock' },
  { id: 'total-rewards', label: 'Total Rewards', icon: 'heart' },
  { id: 'training', label: 'Training', icon: 'graduation-cap' },
];

export const accountSubTabs: SubTab[] = [
  { id: 'account-info', label: 'Account Info' },
  { id: 'billing', label: 'Billing' },
  { id: 'aca-settings', label: 'ACA Settings' },
  { id: 'general-settings', label: 'General Settings' },
  { id: 'icalendar-feeds', label: 'iCalendar Feeds' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'import-hours', label: 'Import Hours' },
  { id: 'login-settings', label: 'Login Settings' },
  { id: 'api-app-access', label: 'API & App Access' },
  { id: 'company-ownership', label: 'Company Ownership' },
];

export const accountInfo: AccountInfo = {
  companyName: 'BambooHR User Testing',
  accountNumber: 'Account #91457',
  url: 'usabilitytesting.bamboohr.com',
  owner: {
    name: 'Janet Parker',
    avatar: 'https://i.pravatar.cc/300?img=47',
    role: 'Account Owner',
  },
};

export const subscription: Subscription = {
  plan: 'Pro',
  packageType: 'HR Package',
  employees: 129,
};

export const addOns: AddOn[] = [
  { id: 'payroll', title: 'Payroll', icon: 'circle-dollar' },
  { id: 'time-tracking', title: 'Time Tracking', employees: '23 Employees', icon: 'clock' },
];

export const jobPostings = {
  current: 4,
  max: 55,
};

export const fileStorage = {
  used: 0,
  total: 85,
  unit: 'GB',
};

export const upgrades: Upgrade[] = [
  {
    id: 'elite',
    title: 'Elite',
    subtitle: 'HR Package',
    icon: 'shield',
  },
  {
    id: 'benefits-admin',
    title: 'Benefits Administration',
    subtitle: 'Add-On',
    icon: 'heart',
  },
  {
    id: 'global-employment',
    title: 'Global Employment',
    subtitle: 'Powered by Remote',
    icon: 'location-dot',
  },
];

export const dataCenter = {
  location: 'Ohio',
};

// =============================================================================
// SETTINGS CONTENT DATA - For all settings sections
// =============================================================================

// Access Levels Data
export const accessLevels = [
  { id: 'admin', name: 'Administrator', users: 3, description: 'Full access to all features and settings' },
  { id: 'hr-manager', name: 'HR Manager', users: 5, description: 'Access to employee records, hiring, and reports' },
  { id: 'manager', name: 'Manager', users: 12, description: 'Access to direct reports and team information' },
  { id: 'employee', name: 'Employee', users: 109, description: 'Access to personal information only' },
  { id: 'payroll', name: 'Payroll Admin', users: 2, description: 'Access to payroll and compensation data' },
];

// Employee Fields Data
export const employeeFieldCategories = [
  { id: 'personal', name: 'Personal Information', fields: 15, required: 8 },
  { id: 'job', name: 'Job Information', fields: 12, required: 6 },
  { id: 'compensation', name: 'Compensation', fields: 8, required: 4 },
  { id: 'emergency', name: 'Emergency Contacts', fields: 6, required: 2 },
  { id: 'custom', name: 'Custom Fields', fields: 4, required: 0 },
];

// Approvals Data
export const approvalWorkflows = [
  { id: 'time-off', name: 'Time Off Requests', approvers: 'Direct Manager', status: 'active' },
  { id: 'expense', name: 'Expense Reports', approvers: 'Manager → Finance', status: 'active' },
  { id: 'training', name: 'Training Requests', approvers: 'HR Manager', status: 'active' },
  { id: 'job-change', name: 'Job Changes', approvers: 'HR → Executive', status: 'active' },
  { id: 'new-hire', name: 'New Hire Approval', approvers: 'HR Manager', status: 'inactive' },
];

// Apps Data
export const installedApps = [
  { id: 'slack', name: 'Slack', category: 'Communication', status: 'connected', lastSync: 'Today' },
  { id: 'google', name: 'Google Workspace', category: 'Productivity', status: 'connected', lastSync: 'Today' },
  { id: 'zoom', name: 'Zoom', category: 'Communication', status: 'connected', lastSync: 'Yesterday' },
  { id: 'quickbooks', name: 'QuickBooks', category: 'Finance', status: 'connected', lastSync: '2 days ago' },
];

export const availableApps = [
  { id: 'microsoft', name: 'Microsoft 365', category: 'Productivity', description: 'Sync with Microsoft apps' },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', description: 'Connect employee data' },
  { id: 'jira', name: 'Jira', category: 'Project Management', description: 'Track employee projects' },
];

// Benefits Data
export const benefitPlans = [
  { id: 'medical', name: 'Medical Insurance', provider: 'Blue Cross', enrolled: 98, eligible: 129 },
  { id: 'dental', name: 'Dental Insurance', provider: 'Delta Dental', enrolled: 87, eligible: 129 },
  { id: 'vision', name: 'Vision Insurance', provider: 'VSP', enrolled: 72, eligible: 129 },
  { id: '401k', name: '401(k) Plan', provider: 'Fidelity', enrolled: 104, eligible: 129 },
  { id: 'life', name: 'Life Insurance', provider: 'MetLife', enrolled: 129, eligible: 129 },
];

// Company Directory Settings
export const directorySettings = {
  showPhotos: true,
  showJobTitles: true,
  showDepartments: true,
  showPhoneNumbers: true,
  showEmail: true,
  showBirthdays: false,
  showAnniversaries: true,
  allowExport: false,
};

// Compensation Data
export const compensationSettings = {
  currency: 'USD',
  payFrequencies: ['Weekly', 'Bi-Weekly', 'Semi-Monthly', 'Monthly'],
  defaultPayFrequency: 'Bi-Weekly',
  showSalaryToManagers: true,
  requireApprovalForChanges: true,
};

export const payGrades = [
  { id: 'l1', name: 'Level 1', minSalary: 40000, maxSalary: 55000, employees: 23 },
  { id: 'l2', name: 'Level 2', minSalary: 55000, maxSalary: 75000, employees: 34 },
  { id: 'l3', name: 'Level 3', minSalary: 75000, maxSalary: 100000, employees: 28 },
  { id: 'l4', name: 'Level 4', minSalary: 100000, maxSalary: 140000, employees: 19 },
  { id: 'l5', name: 'Level 5', minSalary: 140000, maxSalary: 200000, employees: 8 },
];

// Email Alerts Data
export const emailAlerts = [
  { id: 'new-hire', name: 'New Hire Announcements', recipients: 'All Employees', enabled: true },
  { id: 'birthday', name: 'Birthday Reminders', recipients: 'Managers', enabled: true },
  { id: 'anniversary', name: 'Work Anniversary', recipients: 'Managers', enabled: true },
  { id: 'time-off', name: 'Time Off Notifications', recipients: 'Direct Manager', enabled: true },
  { id: 'review-due', name: 'Performance Review Due', recipients: 'Managers + HR', enabled: true },
  { id: 'document-expiry', name: 'Document Expiration', recipients: 'HR Admins', enabled: false },
];

// Hiring Settings
export const hiringSettings = {
  jobBoardIntegrations: ['Indeed', 'LinkedIn', 'Glassdoor'],
  autoRejectAfterDays: 30,
  requireInterviewScorecard: true,
  backgroundCheckProvider: 'Checkr',
  offerLetterTemplates: 3,
};

export const hiringStages = [
  { id: 'applied', name: 'Applied', order: 1 },
  { id: 'screening', name: 'Phone Screen', order: 2 },
  { id: 'interview', name: 'Interview', order: 3 },
  { id: 'assessment', name: 'Assessment', order: 4 },
  { id: 'offer', name: 'Offer', order: 5 },
  { id: 'hired', name: 'Hired', order: 6 },
];

// Time Off Settings
export const timeOffPolicies = [
  { id: 'pto', name: 'Paid Time Off', accrualRate: '1.25 days/month', maxBalance: 20, employees: 129 },
  { id: 'sick', name: 'Sick Leave', accrualRate: '0.5 days/month', maxBalance: 10, employees: 129 },
  { id: 'personal', name: 'Personal Days', accrualRate: '3 days/year', maxBalance: 3, employees: 129 },
  { id: 'bereavement', name: 'Bereavement', accrualRate: 'As needed', maxBalance: 5, employees: 129 },
  { id: 'parental', name: 'Parental Leave', accrualRate: '12 weeks', maxBalance: 60, employees: 45 },
];

// Billing Data
export const billingInfo = {
  planName: 'Pro',
  billingCycle: 'Monthly',
  nextBillingDate: 'March 1, 2026',
  amount: 1290,
  paymentMethod: 'Visa ending in 4242',
  invoiceEmail: 'billing@bamboohr-testing.com',
};

export const billingHistory = [
  { id: '1', date: 'Feb 1, 2026', amount: 1290, status: 'Paid', invoice: 'INV-2026-0201' },
  { id: '2', date: 'Jan 1, 2026', amount: 1290, status: 'Paid', invoice: 'INV-2026-0101' },
  { id: '3', date: 'Dec 1, 2025', amount: 1290, status: 'Paid', invoice: 'INV-2025-1201' },
  { id: '4', date: 'Nov 1, 2025', amount: 1290, status: 'Paid', invoice: 'INV-2025-1101' },
];

// General Settings
export const generalSettings = {
  timezone: 'America/Denver (MST)',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12-hour',
  language: 'English (US)',
  fiscalYearStart: 'January',
  weekStartsOn: 'Sunday',
};

// Login Settings
export const loginSettings = {
  passwordMinLength: 8,
  requireSpecialChars: true,
  requireNumbers: true,
  passwordExpireDays: 90,
  maxLoginAttempts: 5,
  sessionTimeoutMinutes: 30,
  twoFactorEnabled: true,
  ssoEnabled: false,
  ssoProvider: null,
};

// API & App Access
export const apiKeys = [
  { id: '1', name: 'Production API Key', created: 'Jan 15, 2026', lastUsed: 'Today', status: 'active' },
  { id: '2', name: 'Integration Key', created: 'Dec 1, 2025', lastUsed: '3 days ago', status: 'active' },
  { id: '3', name: 'Test Key', created: 'Nov 10, 2025', lastUsed: 'Never', status: 'inactive' },
];

// Webhooks
export const webhooks = [
  { id: '1', name: 'New Employee Webhook', url: 'https://api.example.com/new-employee', events: ['employee.created'], status: 'active' },
  { id: '2', name: 'Time Off Webhook', url: 'https://api.example.com/time-off', events: ['timeoff.requested', 'timeoff.approved'], status: 'active' },
];

// Ask BambooHR Settings
export const askBamboohrSettings = {
  enabled: true,
  allowAnonymous: true,
  categories: ['Benefits', 'Time Off', 'Payroll', 'IT Support', 'General HR'],
  autoResponseEnabled: true,
  escalationEmail: 'hr@bamboohr-testing.com',
};
