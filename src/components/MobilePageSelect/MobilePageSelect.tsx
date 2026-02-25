import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface MobilePageSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MobilePageSelect({ options, value, onChange, className = '' }: MobilePageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`mobile-page-select relative ${className}`} ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          mobile-page-select-trigger
          inline-flex items-center justify-between gap-2
          w-full h-[44px]
          px-4 py-2
          bg-[var(--surface-neutral-white)]
          border border-[var(--border-neutral-medium)]
          rounded-[var(--radius-full)]
          text-[15px] text-[var(--text-neutral-strong)]
          transition-colors duration-200
        "
        style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown menu */}
          <div
            className="
              absolute z-50 top-full left-0 mt-2
              w-full min-w-max
              bg-[var(--surface-neutral-white)]
              border border-[var(--border-neutral-medium)]
              rounded-[var(--radius-small)]
              shadow-lg
              overflow-hidden
              max-h-[300px]
              overflow-y-auto
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-3 text-left text-[15px]
                  flex items-center gap-3
                  transition-colors duration-150
                  ${
                    option.value === value
                      ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--color-primary-strong)] font-semibold'
                      : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                  }
                `}
              >
                {option.icon && (
                  <Icon name={option.icon as any} size={16} className={option.value === value ? 'text-[var(--color-primary-strong)]' : 'text-[var(--icon-neutral-strong)]'} />
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MobilePageSelect;
