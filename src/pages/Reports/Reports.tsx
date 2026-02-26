import { useState } from 'react';
import { Icon, IconTile } from '../../components';
import { favoriteReports, recentReports } from '../../data/analytics';
import './Reports.css';

export type ReportsCategory = 'overview' | 'favorites' | 'all' | 'general' | 'compliance' | 'payroll' | 'compensation' | 'time-attendance' | 'benefits' | 'training' | 'performance' | 'hiring' | 'custom';

interface ReportsProps {
  controlledCategory?: ReportsCategory;
  onCategoryChange?: (category: ReportsCategory) => void;
}

export function Reports({ controlledCategory, onCategoryChange }: ReportsProps = {}) {
  const [internalCategory, setInternalCategory] = useState<ReportsCategory>('overview');

  // Use controlled mode if props are provided
  const selectedCategory = controlledCategory ?? internalCategory;
  const setSelectedCategory = onCategoryChange ?? setInternalCategory;

  const categories: { id: ReportsCategory; label: string; icon: 'chart-pie-simple' | 'face-smile' | 'file-lines' | 'circle-question' | 'circle-dollar' | 'user-group' }[] = [
    { id: 'overview', label: 'Overview', icon: 'chart-pie-simple' },
    { id: 'favorites', label: 'Favorites', icon: 'face-smile' },
    { id: 'all', label: 'All', icon: 'file-lines' },
    { id: 'general', label: 'General', icon: 'file-lines' },
    { id: 'compliance', label: 'Compliance', icon: 'circle-question' },
    { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' },
    { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' },
    { id: 'time-attendance', label: 'Time & Attendance', icon: 'chart-pie-simple' },
    { id: 'benefits', label: 'Benefits', icon: 'face-smile' },
    { id: 'training', label: 'Training', icon: 'file-lines' },
    { id: 'performance', label: 'Performance & Culture', icon: 'chart-pie-simple' },
    { id: 'hiring', label: 'Hiring', icon: 'user-group' },
    { id: 'custom', label: 'Custom folder', icon: 'file-lines' },
  ];

  // Get the current category label for display
  const currentCategoryLabel = categories.find(cat => cat.id === selectedCategory)?.label || 'Overview';

  // Render content based on selected category
  const renderCategoryContent = () => {
    // Overview and Favorites show the default content
    if (selectedCategory === 'overview' || selectedCategory === 'favorites') {
      return (
        <>
          {/* Favorites Section */}
          <div className="reports-section mb-8">
            <div className="reports-section-header flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z"
                    fill="#2e7918"
                    stroke="#2e7918"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2
                  className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
                >
                  Favorites
                </h2>
              </div>
              <button className="reports-view-all text-[15px] font-medium text-[var(--color-primary-strong)] hover:underline">
                View All
              </button>
            </div>

            <div className="reports-favorites-scroll">
              <div className="reports-favorites-grid">
                {favoriteReports.map((report) => (
                  <IconTile
                    key={report.id}
                    icon={report.icon}
                    title={report.title}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recently Viewed Section */}
          <div className="reports-section">
            <div className="reports-section-header flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="#2e7918"
                  strokeWidth="1.5"
                />
                <path d="M10 6V10L13 13" stroke="#2e7918" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h2
                className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                Recently Viewed
              </h2>
            </div>

            <div className="reports-recent-card bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
              <div className="reports-table-wrapper">
              <div className="reports-table-container px-6 py-6">
                <table className="reports-table w-full">
                  <thead>
                    <tr className="bg-[var(--surface-neutral-xx-weak)]">
                      <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tl-[8px] rounded-bl-[8px]">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                        Owner
                      </th>
                      <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tr-[8px] rounded-br-[8px]">
                        Last Viewed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                    {recentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                        <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                          <a
                            href="#"
                            className="text-[15px] font-medium text-[#2563eb] hover:underline"
                            onClick={(e) => e.preventDefault()}
                          >
                            {report.name}
                          </a>
                          {report.name === 'Age Profile' && (
                            <Icon name="user-group" size={14} className="text-[var(--icon-neutral-medium)]" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[15px] text-[var(--text-neutral-strong)]">{report.owner}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[15px] text-[var(--text-neutral-medium)]">{report.lastViewed}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    // Other categories show a category-specific view
    return (
      <div className="reports-section">
        <div className="reports-section-header flex items-center gap-2 mb-4">
          <Icon name={categories.find(c => c.id === selectedCategory)?.icon || 'file-lines'} size={20} className="text-[var(--color-primary-strong)]" />
          <h2
            className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            {currentCategoryLabel} Reports
          </h2>
        </div>

        <div className="reports-recent-card bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
          <div className="reports-table-wrapper">
          <div className="reports-table-container px-6 py-6">
            <table className="reports-table w-full">
              <thead>
                <tr className="bg-[var(--surface-neutral-xx-weak)]">
                  <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tl-[8px] rounded-bl-[8px]">
                    Report Name
                  </th>
                  <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tr-[8px] rounded-br-[8px]">
                    Last Modified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                <tr className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                      <a href="#" className="text-[15px] font-medium text-[#2563eb] hover:underline" onClick={(e) => e.preventDefault()}>
                        {currentCategoryLabel} Summary
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-strong)]">System</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-medium)]">Today</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                      <a href="#" className="text-[15px] font-medium text-[#2563eb] hover:underline" onClick={(e) => e.preventDefault()}>
                        {currentCategoryLabel} Details
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-strong)]">HR Admin</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-medium)]">Yesterday</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                      <a href="#" className="text-[15px] font-medium text-[#2563eb] hover:underline" onClick={(e) => e.preventDefault()}>
                        Monthly {currentCategoryLabel} Report
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-strong)]">System</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] text-[var(--text-neutral-medium)]">Feb 20, 2026</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="reports-page flex flex-col h-full bg-[var(--surface-neutral-xx-weak)]">
      {/* Header */}
      <div className="reports-header flex items-center justify-between pr-10 pt-10 pb-6 pl-8">
        <h1>Reports</h1>
        <div className="reports-header-actions flex items-center gap-4">
          {/* Search */}
          <div className="reports-search flex items-center gap-2 h-10 px-4 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)]">
            <Icon name="magnifying-glass" size={16} className="text-[var(--icon-neutral-strong)]" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-[200px] bg-transparent text-[14px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
            />
          </div>
          {/* New Button */}
          <button className="reports-new-button flex items-center gap-2 h-10 px-5 bg-[var(--color-primary-strong)] text-white rounded-[var(--radius-full)] text-[15px] font-medium hover:bg-[#267015] transition-colors">
            <span className="text-[18px] leading-none">+</span>
            <span>New</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="ml-1">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area with Sidebar and Main Content */}
      <div className="reports-content flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="reports-sidebar w-[280px] pl-8 overflow-y-auto flex-shrink-0">
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors
                  ${
                    selectedCategory === category.id
                      ? 'bg-[var(--color-primary-strong)] text-white'
                      : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                  }
                `}
              >
                <Icon name={category.icon} size={16} className={selectedCategory === category.id ? 'text-white' : ''} />
                <span>{category.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="reports-main flex-1 pr-10 pl-6 pb-10 overflow-y-auto">
          {renderCategoryContent()}
        </div>
      </div>
    </div>
  );
}

export default Reports;
