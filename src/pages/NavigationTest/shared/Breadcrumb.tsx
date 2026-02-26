/**
 * Shared Breadcrumb Component
 *
 * Renders a breadcrumb navigation based on the current route and tab state.
 * Used across all navigation variants for consistent breadcrumb behavior.
 */

import React from 'react';
import { Icon } from '../../../components';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  id: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (index: number) => void;
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  showHomeIcon = false,
  className = '',
}) => {
  if (items.length === 0) return null;

  const handleClick = (index: number) => {
    if (onNavigate && index < items.length - 1) {
      onNavigate(index);
    }
  };

  return (
    <nav className={`shared-breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="shared-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;
          const isClickable = !isLast && onNavigate;

          return (
            <li key={item.id} className="shared-breadcrumb-item">
              {index > 0 && (
                <Icon
                  name="chevron-right"
                  size={12}
                  className="shared-breadcrumb-separator"
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleClick(index)}
                  className="shared-breadcrumb-link"
                  type="button"
                >
                  {isFirst && showHomeIcon && (
                    <Icon name="home" size={14} className="shared-breadcrumb-home-icon" />
                  )}
                  <span>{item.label}</span>
                </button>
              ) : (
                <span className="shared-breadcrumb-current" aria-current="page">
                  {isFirst && showHomeIcon && (
                    <Icon name="home" size={14} className="shared-breadcrumb-home-icon" />
                  )}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Simple back button breadcrumb for mobile/compact views
 */
interface BackBreadcrumbProps {
  label?: string;
  onClick: () => void;
  className?: string;
}

export const BackBreadcrumb: React.FC<BackBreadcrumbProps> = ({
  label = 'Back',
  onClick,
  className = '',
}) => {
  return (
    <nav className={`shared-breadcrumb-back ${className}`}>
      <button onClick={onClick} className="shared-breadcrumb-back-button" type="button">
        <Icon name="chevron-left" size={14} />
        <span>{label}</span>
      </button>
    </nav>
  );
};

export default Breadcrumb;
