/**
 * Shared Navigation Hook
 *
 * Provides consistent navigation state management across all variants.
 * Handles route, tab, and sub-tab state with URL synchronization.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  type RouteId,
  type NavigationState,
  routeConfig,
  getDefaultTab,
  buildBreadcrumbPath,
  getRouteTabs,
  isLeafRoute,
  settingsAccountSubTabs,
} from './navConfig';

export interface UseNavigationOptions {
  persistPanelState?: boolean; // For Panels variant - remember last sub-panel
}

export interface UseNavigationReturn {
  // Current state
  currentRoute: RouteId;
  currentTab: string | null;
  currentSubTab: string | null;

  // Navigation actions
  navigateToRoute: (routeId: RouteId) => void;
  navigateToTab: (tabId: string) => void;
  navigateToSubTab: (subTabId: string) => void;

  // Breadcrumbs
  breadcrumbs: { label: string; id: string }[];
  navigateToBreadcrumb: (index: number) => void;

  // Route info
  currentRouteConfig: typeof routeConfig[RouteId];
  availableTabs: { id: string; label: string }[];
  availableSubTabs: { id: string; label: string }[];
  isCurrentRouteLeaf: boolean;

  // Panel-specific state (for Panels variant)
  lastVisitedSubPanels: Record<RouteId, string>;
  setLastVisitedSubPanel: (routeId: RouteId, tabId: string) => void;
}

const STORAGE_KEY = 'nav-test-panel-state';

/**
 * Load persisted panel state from localStorage
 */
function loadPersistedPanelState(): Record<RouteId, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore storage errors
  }
  return {} as Record<RouteId, string>;
}

/**
 * Save panel state to localStorage
 */
function savePersistedPanelState(state: Record<RouteId, string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

export function useNavigation(options: UseNavigationOptions = {}): UseNavigationReturn {
  const { persistPanelState = false } = options;

  // Core navigation state
  const [currentRoute, setCurrentRoute] = useState<RouteId>('home');
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [currentSubTab, setCurrentSubTab] = useState<string | null>(null);

  // Panel persistence state
  const [lastVisitedSubPanels, setLastVisitedSubPanels] = useState<Record<RouteId, string>>(() => {
    if (persistPanelState) {
      return loadPersistedPanelState();
    }
    return {} as Record<RouteId, string>;
  });

  // Get current route configuration
  const currentRouteConfig = useMemo(() => routeConfig[currentRoute], [currentRoute]);

  // Get available tabs for current route
  const availableTabs = useMemo(() => {
    return getRouteTabs(currentRoute).map(t => ({ id: t.id, label: t.label }));
  }, [currentRoute]);

  // Get available sub-tabs (currently only for Settings > Account)
  const availableSubTabs = useMemo(() => {
    if (currentRoute === 'settings' && currentTab === 'account') {
      return settingsAccountSubTabs.map(t => ({ id: t.id, label: t.label }));
    }
    return [];
  }, [currentRoute, currentTab]);

  // Check if current route is a leaf node
  const isCurrentRouteLeaf = useMemo(() => isLeafRoute(currentRoute), [currentRoute]);

  // Navigate to a route
  const navigateToRoute = useCallback((routeId: RouteId) => {
    setCurrentRoute(routeId);

    // Set default tab for the route
    const defaultTab = getDefaultTab(routeId);

    // If we have a persisted sub-panel for this route, use it
    if (persistPanelState && lastVisitedSubPanels[routeId]) {
      setCurrentTab(lastVisitedSubPanels[routeId]);
    } else {
      setCurrentTab(defaultTab || null);
    }

    // Set default sub-tab for settings
    if (routeId === 'settings') {
      setCurrentSubTab('account-info');
    } else {
      setCurrentSubTab(null);
    }
  }, [persistPanelState, lastVisitedSubPanels]);

  // Navigate to a tab within current route
  const navigateToTab = useCallback((tabId: string) => {
    setCurrentTab(tabId);

    // Persist panel state if enabled
    if (persistPanelState) {
      const newState = { ...lastVisitedSubPanels, [currentRoute]: tabId };
      setLastVisitedSubPanels(newState);
      savePersistedPanelState(newState);
    }

    // Reset sub-tab when changing main tab
    if (currentRoute === 'settings' && tabId === 'account') {
      setCurrentSubTab('account-info');
    } else {
      setCurrentSubTab(null);
    }
  }, [currentRoute, persistPanelState, lastVisitedSubPanels]);

  // Navigate to a sub-tab
  const navigateToSubTab = useCallback((subTabId: string) => {
    setCurrentSubTab(subTabId);
  }, []);

  // Set last visited sub-panel for a route
  const setLastVisitedSubPanel = useCallback((routeId: RouteId, tabId: string) => {
    const newState = { ...lastVisitedSubPanels, [routeId]: tabId };
    setLastVisitedSubPanels(newState);
    if (persistPanelState) {
      savePersistedPanelState(newState);
    }
  }, [lastVisitedSubPanels, persistPanelState]);

  // Build breadcrumbs for current state
  const breadcrumbs = useMemo(() => {
    return buildBreadcrumbPath(currentRoute, currentTab || undefined);
  }, [currentRoute, currentTab]);

  // Navigate to a breadcrumb (go back in hierarchy)
  const navigateToBreadcrumb = useCallback((index: number) => {
    if (index === 0) {
      // Clicked on route level - reset to default tab
      setCurrentTab(getDefaultTab(currentRoute) || null);
      setCurrentSubTab(null);
    }
    // If index > 0, we're already at the tab level, nothing to do
  }, [currentRoute]);

  return {
    currentRoute,
    currentTab,
    currentSubTab,
    navigateToRoute,
    navigateToTab,
    navigateToSubTab,
    breadcrumbs,
    navigateToBreadcrumb,
    currentRouteConfig,
    availableTabs,
    availableSubTabs,
    isCurrentRouteLeaf,
    lastVisitedSubPanels,
    setLastVisitedSubPanel,
  };
}

export default useNavigation;
