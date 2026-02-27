import React, { useState, useMemo } from 'react';
import { Icon } from '../../../components';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { useBreakpoint, useMazeTracking } from '../../../hooks';
import { files, fileCategories } from '../../../data/files';
import avatarLarge from '../../../assets/images/avatar-large.png';
import avatarSmall from '../../../assets/images/avatar-small.png';
import bamboohrLogo from '../../../assets/images/bamboohr-logo.svg';
import { Hiring } from '../../Hiring';
import type { HiringTab } from '../../Hiring';
import { MyInfo } from '../../MyInfo';
import type { MyInfoTab } from '../../MyInfo';
import { People } from '../../People';
import type { PeopleViewMode } from '../../People';
import { Reports } from '../../Reports';
import type { ReportsCategory } from '../../Reports';
import { HomeContent } from '../shared/HomeContent';
import { SettingsContent } from '../shared/SettingsContent';
import {
  type RouteId,
  navItems,
  hiringTabOptions,
  peopleViewOptions,
  reportsCategoryOptions,
  myInfoTabOptions,
  settingsTabs,
  settingsAccountSubTabs as accountSubTabs,
} from '../shared/navConfig';
import './TabsNav.css';

type View = RouteId;
type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';

// Mock user data
const user = {
  name: 'Jess',
  title: 'Director, Demand Generation',
  department: 'Marketing',
  avatar: avatarLarge,
};

export const TabsNav: React.FC = () => {
  useMazeTracking();
  const breakpoint = useBreakpoint();
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Files state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('size-largest');

  // Settings state
  const [activeNav, setActiveNav] = useState('account');
  const [activeSubTab, setActiveSubTab] = useState('account-info');

  // Controlled state for embedded pages (used on mobile)
  const [hiringTab, setHiringTab] = useState<HiringTab>('openings');
  const [peopleView, setPeopleView] = useState<PeopleViewMode>('list');
  const [reportsCategory, setReportsCategory] = useState<ReportsCategory>('recent');
  const [myInfoTab, setMyInfoTab] = useState<MyInfoTab>('personal');

  // Tab options are now imported from shared/navConfig

  return (
    <div className={`tabs-nav ${breakpoint.isLaptopOrAbove ? 'with-global-header' : ''}`}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="tabs-mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="tabs-mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="tabs-mobile-menu-header">
              <img src={bamboohrLogo} alt="BambooHR" className="tabs-mobile-logo-img" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <Icon name="xmark" size={20} />
              </button>
            </div>
            <nav className="tabs-mobile-menu-nav">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id as View); setMobileMenuOpen(false); }}
                  className={`tabs-mobile-menu-item ${currentView === item.id ? 'active' : ''}`}
                >
                  <Icon
                    name={item.icon}
                    size={18}
                    variant={currentView === item.id ? 'solid' : 'regular'}
                  />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="tabs-mobile-menu-footer">
              <img src={avatarSmall} alt="John Doe" className="tabs-mobile-avatar" />
              <div className="tabs-mobile-user-info">
                <span className="tabs-mobile-user-name">John Doe</span>
                <span className="tabs-mobile-user-email">john@example.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className={`tabs-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="tabs-logo">
          {sidebarCollapsed ? (
            <div className="tabs-logo-icon">
              <Icon name="spa" size={20} />
            </div>
          ) : (
            <img src={bamboohrLogo} alt="BambooHR" className="tabs-logo-img" />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="tabs-nav-items">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`tabs-nav-item ${currentView === item.id ? 'active' : ''}`}
            >
              <Icon
                name={item.icon}
                size={20}
                variant={currentView === item.id ? 'solid' : 'regular'}
              />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="tabs-collapse-btn"
        >
          <Icon name={sidebarCollapsed ? 'arrow-right-from-line' : 'arrow-left-from-line'} size={20} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>

        {/* User Profile */}
        <div className="tabs-user">
          <img
            src={avatarSmall}
            alt="Account"
            className="tabs-user-avatar"
          />
          {!sidebarCollapsed && (
            <span className="tabs-user-name">Account</span>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="tabs-main">
        {/* GlobalHeader - Only visible on Laptop, Desktop, Monitor (>= 1024px) */}
        {breakpoint.isLaptopOrAbove && (
          <GlobalHeader className="tabs-global-header" />
        )}

        {/* Mobile Top Bar */}
        <header className="tabs-topbar">
          {searchExpanded ? (
            /* Expanded Search Bar */
            <div className="tabs-topbar-search-expanded">
              <Icon name="magnifying-glass" size={16} className="tabs-search-icon" />
              <input
                type="text"
                placeholder="Search anything..."
                className="tabs-search-input"
                autoFocus
              />
              <button
                className="tabs-search-close"
                onClick={() => setSearchExpanded(false)}
              >
                <Icon name="xmark" size={18} />
              </button>
            </div>
          ) : (
            /* Default Top Bar */
            <>
              <div className="tabs-topbar-left">
                <button className="tabs-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                  <Icon name="bars" size={20} />
                </button>
                <img src={bamboohrLogo} alt="BambooHR" className="tabs-topbar-logo" />
              </div>
              <div className="tabs-topbar-actions">
                <button className="tabs-icon-btn" onClick={() => setSearchExpanded(true)}>
                  <Icon name="magnifying-glass" size={18} />
                </button>
                <button className="tabs-icon-btn">
                  <Icon name="bell" size={18} />
                </button>
              </div>
            </>
          )}
        </header>

        {/* View Content */}
        <div className="tabs-content">
          {currentView === 'home' && <HomeContent user={user} />}
          {currentView === 'files' && (
            <FilesView
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}
          {currentView === 'hiring' && (
            <div className="tabs-embedded-view">
              <div className="tabs-page-header-group">
                <h1 className="tabs-page-title">Hiring</h1>
              </div>
              {/* Mobile Tabs */}
              <div className="tabs-horizontal-container mobile-only">
                <div className="tabs-horizontal">
                  {hiringTabOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setHiringTab(option.value as HiringTab)}
                      className={`tabs-horizontal-tab ${hiringTab === option.value ? 'active' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <Hiring controlledTab={hiringTab} onTabChange={setHiringTab} hideTabs />
            </div>
          )}
          {currentView === 'my-info' && (
            <div className="tabs-embedded-view tabs-embedded-view-myinfo">
              <MyInfo
                controlledTab={myInfoTab}
                onTabChange={setMyInfoTab}
                mobileSelect={
                  <div className="tabs-horizontal-container mobile-only tabs-myinfo-tabs">
                    <div className="tabs-horizontal">
                      {myInfoTabOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setMyInfoTab(option.value as MyInfoTab)}
                          className={`tabs-horizontal-tab ${myInfoTab === option.value ? 'active' : ''}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          )}
          {currentView === 'people' && (
            <div className="tabs-embedded-view">
              <div className="tabs-page-header-group">
                <h1 className="tabs-page-title">People</h1>
              </div>
              {/* Mobile Tabs */}
              <div className="tabs-horizontal-container mobile-only">
                <div className="tabs-horizontal">
                  {peopleViewOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPeopleView(option.value as PeopleViewMode)}
                      className={`tabs-horizontal-tab ${peopleView === option.value ? 'active' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <People controlledView={peopleView} onViewChange={setPeopleView} />
            </div>
          )}
          {currentView === 'reports' && (
            <div className="tabs-embedded-view">
              <div className="tabs-page-header">
                <h1 className="tabs-page-title">Reports</h1>
                <div className="tabs-header-actions">
                  <button className="tabs-btn-primary-outlined">
                    <Icon name="circle-plus" size={16} />
                    <span>New Report</span>
                  </button>
                  <button className="tabs-btn-icon">
                    <Icon name="folder-plus" size={18} />
                  </button>
                </div>
              </div>
              {/* Mobile Tabs */}
              <div className="tabs-horizontal-container mobile-only">
                <div className="tabs-horizontal">
                  {reportsCategoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setReportsCategory(option.value as ReportsCategory)}
                      className={`tabs-horizontal-tab ${reportsCategory === option.value ? 'active' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <Reports controlledCategory={reportsCategory} onCategoryChange={setReportsCategory} />
            </div>
          )}
          {currentView === 'settings' && (
            <SettingsView
              activeNav={activeNav}
              activeSubTab={activeSubTab}
              onNavChange={setActiveNav}
              onSubTabChange={setActiveSubTab}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Files View Component
const FilesView: React.FC<{
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}> = ({ selectedCategory, onCategoryChange, sortBy, onSortChange }) => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  const sortOptions = [
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'date-recent', label: 'Date: Recent First' },
    { value: 'date-oldest', label: 'Date: Oldest First' },
    { value: 'size-largest', label: 'Size: Largest First' },
    { value: 'size-smallest', label: 'Size: Smallest First' },
  ];

  // Map category IDs to actual category names in the data
  const categoryIdToName: Record<string, string> = {
    'all': 'all',
    'signature-templates': 'Signature Templates',
    'benefits-docs': 'Benefits Docs',
    'payroll': 'Payroll',
    'trainings': 'Trainings',
    'company-policies': 'Company Policies',
  };

  // Get the display name for the current category
  const currentCategoryLabel = fileCategories.find(cat => cat.id === selectedCategory)?.label || 'All Files';

  const filteredAndSortedFiles = useMemo(() => {
    // First filter by category
    let filtered = [...files];
    if (selectedCategory !== 'all') {
      const categoryName = categoryIdToName[selectedCategory];
      filtered = files.filter(file => file.category === categoryName);
    }

    // Then sort
    switch (sortBy) {
      case 'name-asc': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent': return filtered.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest': return filtered.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      case 'size-largest': return filtered.sort((a, b) => b.sizeBytes - a.sizeBytes);
      case 'size-smallest': return filtered.sort((a, b) => a.sizeBytes - b.sizeBytes);
      default: return filtered;
    }
  }, [sortBy, selectedCategory]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return { name: 'file-lines' as const, color: '#dc2626' };
      case 'image': return { name: 'image' as const, color: '#2563eb' };
      case 'audio': return { name: 'file-audio' as const, color: '#7c3aed' };
      default: return { name: 'file' as const, color: '#6b7280' };
    }
  };

  const toggleFileSelection = (fileId: number) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId);
    } else {
      newSelection.add(fileId);
    }
    setSelectedFiles(newSelection);
  };

  return (
    <div className="tabs-view tabs-files-view">
      {/* Page Header */}
      <div className="tabs-page-header">
        <h1 className="tabs-page-title">Files</h1>
        <div className="tabs-header-actions">
          <button className="tabs-btn-primary-outlined">
            <Icon name="arrow-up-from-bracket" size={16} />
            <span>Upload File</span>
          </button>
          <button className="tabs-btn-icon">
            <Icon name="folder-plus" size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Category Tabs */}
      <div className="tabs-horizontal-container mobile-only">
        <div className="tabs-horizontal">
          {fileCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`tabs-horizontal-tab ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs-files-layout">
        {/* Files Sidebar - Desktop */}
        <aside className="tabs-files-sidebar">
          <nav className="tabs-folder-list">
            {fileCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`tabs-folder-item ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <Icon name="folder" size={16} />
                <span className="tabs-folder-label">{category.label}</span>
                {category.count > 0 && (
                  <span className="tabs-folder-count">({category.count})</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Files Content */}
        <div className="tabs-files-content">
          <div className="tabs-files-card">
            {/* Card Header */}
            <div className="tabs-files-card-header">
              <h2 className="tabs-section-title">{currentCategoryLabel}</h2>
              <div className="tabs-files-actions">
                {/* Sort Dropdown */}
                <div className="tabs-dropdown-wrapper">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="tabs-sort-btn"
                  >
                    <span className="tabs-sort-label">Sort by</span>
                    <span className="tabs-sort-value">
                      {sortOptions.find(opt => opt.value === sortBy)?.label}
                    </span>
                    <Icon name="chevron-down" size={12} />
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div className="tabs-dropdown-overlay" onClick={() => setSortDropdownOpen(false)} />
                      <div className="tabs-dropdown-menu">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => { onSortChange(option.value as SortOption); setSortDropdownOpen(false); }}
                            className={`tabs-dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button className="tabs-icon-btn-bordered">
                  <Icon name="arrow-down-to-line" size={16} />
                </button>
                <button className="tabs-icon-btn-bordered">
                  <Icon name="trash-can" size={16} />
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="tabs-file-list">
              {filteredAndSortedFiles.map((file) => {
                const icon = getFileIcon(file.type);
                const isSelected = selectedFiles.has(file.id);

                return (
                  <div
                    key={file.id}
                    className={`tabs-file-row ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFileSelection(file.id)}
                      className="tabs-checkbox"
                    />
                    <Icon name={icon.name} size={20} style={{ color: icon.color }} />
                    <div className="tabs-file-info">
                      <a href="#" className="tabs-file-name" onClick={(e) => e.preventDefault()}>
                        {file.name}
                      </a>
                      <div className="tabs-file-meta">
                        <Icon name="folder" size={12} variant="regular" />
                        <span>Added {file.addedDate} by {file.addedBy} ({file.size})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView: React.FC<{
  activeNav: string;
  activeSubTab: string;
  onNavChange: (nav: string) => void;
  onSubTabChange: (tab: string) => void;
}> = ({ activeNav, activeSubTab, onNavChange, onSubTabChange }) => {
  // Get current nav label for title
  const currentNavLabel = settingsTabs.find(item => item.id === activeNav)?.label || 'Account';

  return (
    <div className="tabs-view tabs-settings-view">
      {/* Page Header */}
      <div className="tabs-page-header-group">
        <h1 className="tabs-page-title tabs-settings-title">Settings</h1>
        <p className="tabs-page-description">Manage your account and preferences.</p>
      </div>

      {/* Mobile Settings Section Tabs */}
      <div className="tabs-horizontal-container mobile-only">
        <div className="tabs-horizontal">
          {settingsTabs.slice(0, 12).map((item) => (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`tabs-horizontal-tab ${activeNav === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Sub-tabs (only show for Account) */}
      {activeNav === 'account' && (
        <div className="tabs-secondary-container mobile-only">
          <div className="tabs-secondary">
            {accountSubTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSubTabChange(tab.id)}
                className={`tabs-secondary-tab ${activeSubTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Settings Content */}
      <div className="tabs-settings-mobile-content mobile-only">
        <div className="tabs-settings-form-mobile">
          <SettingsContent activeNav={activeNav} activeSubTab={activeSubTab} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="tabs-settings-layout">
        {/* Settings Sidebar */}
        <aside className="tabs-settings-sidebar">
          <nav className="tabs-settings-nav">
            {settingsTabs.slice(0, 12).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`tabs-settings-item ${activeNav === item.id ? 'active' : ''}`}
              >
                <Icon
                  name={item.icon || 'wrench'}
                  size={18}
                  className={activeNav === item.id ? 'text-white' : ''}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content Card */}
        <div className="tabs-settings-content-area">
          <div className="tabs-settings-card">
            {/* Dynamic Heading */}
            <h2 className="tabs-settings-card-title">{currentNavLabel}</h2>

            <div className="tabs-settings-inner-layout">
              {/* Sub-tabs (only for Account) */}
              {activeNav === 'account' && (
                <div className="tabs-subtabs">
                  <nav className="tabs-subtabs-nav">
                    {accountSubTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => onSubTabChange(tab.id)}
                        className={`tabs-subtab ${activeSubTab === tab.id ? 'active' : ''}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Dynamic Content */}
              <div className="tabs-settings-form">
                <SettingsContent activeNav={activeNav} activeSubTab={activeSubTab} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsNav;
