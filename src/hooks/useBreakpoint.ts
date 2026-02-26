import { useState, useEffect } from 'react';

// Breakpoint definitions based on design specs
export const BREAKPOINTS = {
  minimum: 320,
  mobile: 360,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  monitor: 1655,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

export interface BreakpointInfo {
  name: BreakpointName;
  width: number;
  isMinimum: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isMonitor: boolean;
  // Helpers for "at least" queries
  isLaptopOrAbove: boolean; // >= 1024px (laptop, desktop, monitor)
  isDesktopOrAbove: boolean; // >= 1280px (desktop, monitor)
  isTabletOrAbove: boolean; // >= 768px
  isMobileOrAbove: boolean; // >= 360px
}

function getBreakpointName(width: number): BreakpointName {
  if (width >= BREAKPOINTS.monitor) return 'monitor';
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.laptop) return 'laptop';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  if (width >= BREAKPOINTS.mobile) return 'mobile';
  return 'minimum';
}

function getBreakpointInfo(width: number): BreakpointInfo {
  const name = getBreakpointName(width);

  return {
    name,
    width,
    isMinimum: name === 'minimum',
    isMobile: name === 'mobile',
    isTablet: name === 'tablet',
    isLaptop: name === 'laptop',
    isDesktop: name === 'desktop',
    isMonitor: name === 'monitor',
    // "At least" helpers
    isLaptopOrAbove: width >= BREAKPOINTS.laptop,
    isDesktopOrAbove: width >= BREAKPOINTS.desktop,
    isTabletOrAbove: width >= BREAKPOINTS.tablet,
    isMobileOrAbove: width >= BREAKPOINTS.mobile,
  };
}

export function useBreakpoint(): BreakpointInfo {
  const [breakpoint, setBreakpoint] = useState<BreakpointInfo>(() =>
    getBreakpointInfo(typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktop)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpointInfo(window.innerWidth));
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export default useBreakpoint;
