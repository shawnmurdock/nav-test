/**
 * Navigation Configuration - Single Source of Truth
 *
 * This config drives:
 * - Left navigation order
 * - Dropdown options
 * - Panel hierarchy
 * - Tab definitions
 * - Breadcrumb labels
 *
 * All navigation variants (Dropdown, Panels, Tabs) must derive behavior from this config.
 */

import type { IconName } from '../../../components/Icon';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface TabDefinition {
  id: string;
  label: string;
  icon?: IconName;
}

export interface SubPanelDefinition {
  id: string;
  label: string;
  icon?: IconName;
  children?: SubPanelDefinition[];
}

export interface RouteConfig {
  id: string;
  path: string;
  label: string;
  icon: IconName;
  order: number;
  breadcrumbLabel: string;

  // Tab configuration (if route has tabs)
  hasTabs: boolean;
  tabs?: TabDefinition[];
  defaultTab?: string;

  // Panel configuration (for Panels variant)
  hasSubPanels: boolean;
  subPanels?: SubPanelDefinition[];
  isLeafNode?: boolean; // True if no drill-down is available

  // Visibility flags
  showInMainNav: boolean;
  showInMobileNav: boolean;
}

export type RouteId = 'home' | 'people' | 'my-info' | 'hiring' | 'files' | 'reports' | 'settings';

// =============================================================================
// TAB DEFINITIONS
// =============================================================================

export const peopleTabs: TabDefinition[] = [
  { id: 'list', label: 'List' },
  { id: 'directory', label: 'Directory' },
  { id: 'orgChart', label: 'Org Chart' },
];

export const myInfoTabs: TabDefinition[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job' },
  { id: 'time-off', label: 'Time Off' },
  { id: 'documents', label: 'Documents' },
  { id: 'timesheets', label: 'Timesheets' },
  { id: 'performance', label: 'Performance' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'training', label: 'Training' },
];

export const hiringTabs: TabDefinition[] = [
  { id: 'openings', label: 'Job Openings' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'pools', label: 'Talent Pools' },
];

export const reportsTabs: TabDefinition[] = [
  { id: 'recent', label: 'Recent' },
  { id: 'general', label: 'General' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'compensation', label: 'Compensation' },
  { id: 'time-attendance', label: 'Time & Attendance' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'training', label: 'Training' },
  { id: 'performance', label: 'Performance & Culture' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'custom', label: 'Custom Folder' },
];

export const settingsTabs: TabDefinition[] = [
  { id: 'account', label: 'Account', icon: 'wrench' },
  { id: 'access-levels', label: 'Access Levels', icon: 'lock' },
  { id: 'employee-fields', label: 'Employee Fields', icon: 'pen-to-square' },
  { id: 'approvals', label: 'Approvals', icon: 'thumbs-up' },
  { id: 'apps', label: 'Apps', icon: 'table-cells' },
  { id: 'ask-bamboohr', label: 'Ask BambooHR', icon: 'circle-question' },
  { id: 'benefits', label: 'Benefits', icon: 'heart' },
  { id: 'company-directory', label: 'Company Directory', icon: 'user-group' },
  { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' },
  { id: 'email-alerts', label: 'Email Alerts', icon: 'bell' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge' },
  { id: 'time-off', label: 'Time Off', icon: 'plane' },
];

export const settingsAccountSubTabs: TabDefinition[] = [
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

export const filesTabs: TabDefinition[] = [
  { id: 'all', label: 'All Files' },
  { id: 'signature-templates', label: 'Signature Templates' },
  { id: 'benefits-docs', label: 'Benefits Docs' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'trainings', label: 'Trainings' },
  { id: 'company-policies', label: 'Company Policies' },
];

// =============================================================================
// SUB-PANEL DEFINITIONS (for Panels variant)
// =============================================================================

export const filesSubPanels: SubPanelDefinition[] = [
  { id: 'all', label: 'All Files', icon: 'folder' },
  { id: 'signature-templates', label: 'Signature Templates', icon: 'folder' },
  { id: 'benefits-docs', label: 'Benefits Docs', icon: 'folder' },
  { id: 'payroll', label: 'Payroll', icon: 'folder' },
  { id: 'trainings', label: 'Trainings', icon: 'folder' },
  { id: 'company-policies', label: 'Company Policies', icon: 'folder' },
];

export const reportsSubPanels: SubPanelDefinition[] = reportsTabs.map(tab => ({
  id: tab.id,
  label: tab.label,
  icon: 'chart-pie-simple' as IconName,
}));

export const settingsSubPanels: SubPanelDefinition[] = settingsTabs.map(tab => ({
  id: tab.id,
  label: tab.label,
  icon: tab.icon,
}));

export const peopleSubPanels: SubPanelDefinition[] = peopleTabs.map(tab => ({
  id: tab.id,
  label: tab.label,
  icon: 'users' as IconName,
}));

export const myInfoSubPanels: SubPanelDefinition[] = myInfoTabs.map(tab => ({
  id: tab.id,
  label: tab.label,
  icon: 'circle-user' as IconName,
}));

export const hiringSubPanels: SubPanelDefinition[] = hiringTabs.map(tab => ({
  id: tab.id,
  label: tab.label,
  icon: 'user-group' as IconName,
}));

// =============================================================================
// MAIN ROUTE CONFIGURATION
// =============================================================================

export const routeConfig: Record<RouteId, RouteConfig> = {
  home: {
    id: 'home',
    path: '/home',
    label: 'Home',
    icon: 'house',
    order: 1,
    breadcrumbLabel: 'Home',
    hasTabs: false,
    hasSubPanels: false,
    isLeafNode: true, // Home has no sub-panels or drill-down
    showInMainNav: true,
    showInMobileNav: true,
  },
  'my-info': {
    id: 'my-info',
    path: '/my-info',
    label: 'My Info',
    icon: 'circle-user',
    order: 2,
    breadcrumbLabel: 'My Info',
    hasTabs: true,
    tabs: myInfoTabs,
    defaultTab: 'personal',
    hasSubPanels: true,
    subPanels: myInfoSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
  people: {
    id: 'people',
    path: '/people',
    label: 'People',
    icon: 'user-group',
    order: 3,
    breadcrumbLabel: 'People',
    hasTabs: true,
    tabs: peopleTabs,
    defaultTab: 'list',
    hasSubPanels: true,
    subPanels: peopleSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
  hiring: {
    id: 'hiring',
    path: '/hiring',
    label: 'Hiring',
    icon: 'id-badge',
    order: 4,
    breadcrumbLabel: 'Hiring',
    hasTabs: true,
    tabs: hiringTabs,
    defaultTab: 'openings',
    hasSubPanels: true,
    subPanels: hiringSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
  reports: {
    id: 'reports',
    path: '/reports',
    label: 'Reports',
    icon: 'chart-pie-simple',
    order: 5,
    breadcrumbLabel: 'Reports',
    hasTabs: true,
    tabs: reportsTabs,
    defaultTab: 'recent',
    hasSubPanels: true,
    subPanels: reportsSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
  files: {
    id: 'files',
    path: '/files',
    label: 'Files',
    icon: 'file-lines',
    order: 6,
    breadcrumbLabel: 'Files',
    hasTabs: true,
    tabs: filesTabs,
    defaultTab: 'all',
    hasSubPanels: true,
    subPanels: filesSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
  settings: {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: 'gear',
    order: 7,
    breadcrumbLabel: 'Settings',
    hasTabs: true,
    tabs: settingsTabs,
    defaultTab: 'account',
    hasSubPanels: true,
    subPanels: settingsSubPanels,
    showInMainNav: true,
    showInMobileNav: true,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all routes sorted by order
 */
export function getOrderedRoutes(): RouteConfig[] {
  return Object.values(routeConfig).sort((a, b) => a.order - b.order);
}

/**
 * Get routes visible in main navigation
 */
export function getMainNavRoutes(): RouteConfig[] {
  return getOrderedRoutes().filter(route => route.showInMainNav);
}

/**
 * Get routes visible in mobile navigation
 */
export function getMobileNavRoutes(): RouteConfig[] {
  return getOrderedRoutes().filter(route => route.showInMobileNav);
}

/**
 * Get a specific route config by ID
 */
export function getRouteConfig(routeId: RouteId): RouteConfig {
  return routeConfig[routeId];
}

/**
 * Get tabs for a specific route
 */
export function getRouteTabs(routeId: RouteId): TabDefinition[] {
  const route = routeConfig[routeId];
  return route.hasTabs ? (route.tabs || []) : [];
}

/**
 * Get default tab for a route
 */
export function getDefaultTab(routeId: RouteId): string | undefined {
  return routeConfig[routeId]?.defaultTab;
}

/**
 * Get sub-panels for a specific route (for Panels variant)
 */
export function getRouteSubPanels(routeId: RouteId): SubPanelDefinition[] {
  const route = routeConfig[routeId];
  return route.hasSubPanels ? (route.subPanels || []) : [];
}

/**
 * Check if a route is a leaf node (no drill-down)
 */
export function isLeafRoute(routeId: RouteId): boolean {
  return routeConfig[routeId]?.isLeafNode === true;
}

/**
 * Build breadcrumb path for a given route and optional tab
 */
export function buildBreadcrumbPath(routeId: RouteId, tabId?: string): { label: string; id: string }[] {
  const route = routeConfig[routeId];
  const breadcrumbs: { label: string; id: string }[] = [
    { label: route.breadcrumbLabel, id: route.id }
  ];

  if (tabId && route.tabs) {
    const tab = route.tabs.find(t => t.id === tabId);
    if (tab) {
      breadcrumbs.push({ label: tab.label, id: tabId });
    }
  }

  return breadcrumbs;
}

/**
 * Get the label for a tab within a route
 */
export function getTabLabel(routeId: RouteId, tabId: string): string {
  const route = routeConfig[routeId];
  const tab = route.tabs?.find(t => t.id === tabId);
  return tab?.label || tabId;
}

/**
 * Convert route tabs to MobilePageSelect options
 */
export function getTabsAsSelectOptions(routeId: RouteId): { value: string; label: string }[] {
  const tabs = getRouteTabs(routeId);
  return tabs.map(tab => ({ value: tab.id, label: tab.label }));
}

/**
 * Get settings account sub-tabs as select options
 */
export function getSettingsAccountSubTabsAsOptions(): { value: string; label: string }[] {
  return settingsAccountSubTabs.map(tab => ({ value: tab.id, label: tab.label }));
}

// =============================================================================
// NAVIGATION STATE TYPES
// =============================================================================

export interface NavigationState {
  currentRoute: RouteId;
  currentTab: string | null;
  currentSubTab: string | null; // For nested tabs like Settings > Account > sub-tabs
}

/**
 * Create initial navigation state
 */
export function createInitialNavState(routeId: RouteId = 'home'): NavigationState {
  const route = routeConfig[routeId];
  return {
    currentRoute: routeId,
    currentTab: route.defaultTab || null,
    currentSubTab: routeId === 'settings' ? 'account-info' : null,
  };
}

// =============================================================================
// EXPORTS FOR BACKWARD COMPATIBILITY
// =============================================================================

// Export nav items in the format expected by existing components
export const navItems = getMainNavRoutes().map(route => ({
  id: route.id,
  label: route.label,
  icon: route.icon,
}));

// Export tab options in format expected by MobilePageSelect
export const hiringTabOptions = hiringTabs.map(t => ({ value: t.id, label: t.label }));
export const peopleViewOptions = peopleTabs.map(t => ({ value: t.id, label: t.label }));
export const reportsCategoryOptions = reportsTabs.map(t => ({ value: t.id, label: t.label }));
export const myInfoTabOptions = myInfoTabs.map(t => ({ value: t.id, label: t.label }));
export const settingsNavOptions = settingsTabs.map(t => ({ value: t.id, label: t.label }));
export const filesTabOptions = filesTabs.map(t => ({ value: t.id, label: t.label }));
