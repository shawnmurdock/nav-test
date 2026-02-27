import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  variant?: 'standard' | 'primary' | 'outlined';
  size?: 'small' | 'medium';
  label?: string; // For accessibility
}

export function IconButton({
  icon,
  variant = 'outlined',
  size = 'small',
  label,
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-full
    transition-all duration-200
    cursor-pointer
  `;

  const variantStyles = {
    standard: `
      bg-[var(--surface-neutral-white)]
      border border-[var(--border-neutral-medium)]
      text-[var(--text-neutral-strong)]
      hover:bg-[var(--surface-neutral-xx-weak)]
    `,
    primary: `
      bg-[var(--color-primary-strong)]
      border border-transparent
      text-white
      hover:bg-[var(--color-primary-medium)]
    `,
    outlined: `
      bg-[var(--surface-neutral-white)]
      border border-[var(--color-primary-strong)]
      text-[var(--color-primary-strong)]
      hover:bg-[var(--surface-neutral-xx-weak)]
    `,
  };

  const sizeStyles = {
    small: 'h-8 px-3',
    medium: 'h-10 px-4',
  };

  const iconColor = {
    standard: 'var(--icon-neutral-x-strong)',
    primary: 'white',
    outlined: 'var(--color-primary-strong)',
  };

  const iconSize = size === 'small' ? 16 : 20;

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{ boxShadow: 'var(--shadow-100)' }}
      aria-label={label}
      {...props}
    >
      <Icon name={icon} size={iconSize} style={{ color: iconColor[variant] }} />
    </button>
  );
}

export default IconButton;
