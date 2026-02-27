import { useState, useRef, useEffect } from 'react';
import { Icon, IconTile } from '../../components';
import { favoriteReports, recentReports, reportsByCategory } from '../../data/analytics';
import './Reports.css';

export type ReportsCategory = 'recent' | 'general' | 'compliance' | 'payroll' | 'compensation' | 'time-attendance' | 'benefits' | 'training' | 'performance' | 'hiring' | 'custom';

interface ReportsProps {
  controlledCategory?: ReportsCategory;
  onCategoryChange?: (category: ReportsCategory) => void;
}

export function Reports({ controlledCategory, onCategoryChange }: ReportsProps = {}) {
  const [internalCategory, setInternalCategory] = useState<ReportsCategory>('recent');
  const [folderMenuOpen, setFolderMenuOpen] = useState<string | null>(null);
  const folderMenuRef = useRef<HTMLDivElement>(null);

  // Use controlled mode if props are provided
  const selectedCategory = controlledCategory ?? internalCategory;
  const setSelectedCategory = onCategoryChange ?? setInternalCategory;

  // Close folder menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (folderMenuRef.current && !folderMenuRef.current.contains(event.target as Node)) {
        setFolderMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories: { id: ReportsCategory; label: string; icon: 'chart-pie-simple' | 'clock' | 'file-lines' | 'circle-question' | 'circle-dollar' | 'user-group' }[] = [
    { id: 'recent', label: 'Recent', icon: 'clock' },
    { id: 'general', label: 'General', icon: 'file-lines' },
    { id: 'compliance', label: 'Compliance', icon: 'circle-question' },
    { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' },
    { id: 'compensation', label: 'Compensation', icon: 'circle-dollar' },
    { id: 'time-attendance', label: 'Time & Attendance', icon: 'chart-pie-simple' },
    { id: 'benefits', label: 'Benefits', icon: 'file-lines' },
    { id: 'training', label: 'Training', icon: 'file-lines' },
    { id: 'performance', label: 'Performance & Culture', icon: 'chart-pie-simple' },
    { id: 'hiring', label: 'Hiring', icon: 'user-group' },
    { id: 'custom', label: 'Custom folder', icon: 'file-lines' },
  ];

  // Render content based on selected category
  const renderCategoryContent = () => {
    // Recent shows the favorites and recently viewed content
    if (selectedCategory === 'recent') {
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

    // Get reports for this category
    const categoryReports = reportsByCategory[selectedCategory] || [];

    // Other categories show a category-specific view with real data
    return (
      <div className="reports-section">
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
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                    Last Modified
                  </th>
                  <th className="px-6 py-4 text-right text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tr-[8px] rounded-br-[8px]">
                    Run Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                {categoryReports.map((report) => (
                  <tr key={report.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon name="chart-pie-simple" size={16} className="text-[#2563eb]" />
                        <a href="#" className="text-[15px] font-medium text-[#2563eb] hover:underline" onClick={(e) => e.preventDefault()}>
                          {report.name}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] text-[var(--text-neutral-medium)]">{report.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] text-[var(--text-neutral-strong)]">{report.owner}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] text-[var(--text-neutral-medium)]">{report.lastModified}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[15px] text-[var(--text-neutral-medium)]">{report.runCount}</span>
                    </td>
                  </tr>
                ))}
                {categoryReports.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[var(--text-neutral-medium)]">
                      No reports found in this category.
                    </td>
                  </tr>
                )}
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
        <div className="reports-header-actions flex items-center gap-3">
          {/* Search */}
          <div className="reports-search flex items-center gap-2 h-10 px-4 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)]">
            <Icon name="magnifying-glass" size={16} className="text-[var(--icon-neutral-strong)]" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-[200px] bg-transparent text-[14px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
            />
          </div>
          {/* New folder button */}
          <button className="reports-new-folder-button flex items-center gap-2 h-10 px-5 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)] text-[15px] font-medium text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            <Icon name="circle-plus" size={16} />
            <span>New folder</span>
          </button>
          {/* New report button */}
          <button className="reports-new-button flex items-center gap-2 h-10 px-5 bg-[var(--color-primary-strong)] text-white rounded-[var(--radius-full)] text-[15px] font-semibold hover:bg-[#267015] transition-colors">
            <Icon name="chart-pie-simple" size={16} />
            <span>New report</span>
          </button>
        </div>
      </div>

      {/* Content Area with Sidebar and Main Content */}
      <div className="reports-content flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="reports-sidebar w-[280px] pl-8 overflow-y-auto flex-shrink-0">
          <nav className="space-y-1">
            {categories.map((category) => {
              // Show overflow menu only for "custom" or category folders (not overview/favorites/all)
              const showOverflowMenu = !['overview', 'favorites', 'all'].includes(category.id);
              return (
                <div
                  key={category.id}
                  className="relative group"
                >
                  <button
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
                    <span className="flex-1 text-left">{category.label}</span>
                    {/* Overflow menu button */}
                    {showOverflowMenu && (
                      <span
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFolderMenuOpen(folderMenuOpen === category.id ? null : category.id);
                        }}
                        className={`
                          reports-folder-menu-trigger opacity-0 group-hover:opacity-100 flex items-center justify-center w-6 h-6 rounded transition-opacity
                          ${selectedCategory === category.id ? 'hover:bg-white/20' : 'hover:bg-[var(--surface-neutral-x-weak)]'}
                        `}
                      >
                        <Icon name="ellipsis" size={14} className={selectedCategory === category.id ? 'text-white' : 'text-[var(--text-neutral-medium)]'} />
                      </span>
                    )}
                  </button>
                  {/* Overflow dropdown menu */}
                  {folderMenuOpen === category.id && (
                    <div
                      ref={folderMenuRef}
                      className="reports-folder-overflow-menu absolute left-full top-0 ml-2 w-[160px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-lg shadow-lg z-20 py-2"
                    >
                      <button
                        onClick={() => {
                          setFolderMenuOpen(null);
                          // Rename action placeholder
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-[15px] text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                      >
                        <Icon name="pen" size={14} />
                        <span>Rename</span>
                      </button>
                      <button
                        onClick={() => {
                          setFolderMenuOpen(null);
                          // Delete action placeholder
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-[15px] text-[var(--color-danger-strong, #dc2626)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                      >
                        <Icon name="trash-can" size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
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
