// Shared Navigation Components and Utilities

// Navigation configuration - single source of truth
export * from './navConfig';

// Navigation hook
export { useNavigation } from './useNavigation';
export type { UseNavigationOptions, UseNavigationReturn } from './useNavigation';

// Breadcrumb components
export { Breadcrumb, BackBreadcrumb } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';

// Existing shared components
export { HomeContent } from './HomeContent';

// Re-export types
export * from './types';
