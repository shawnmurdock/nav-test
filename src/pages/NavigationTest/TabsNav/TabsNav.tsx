import React, { useState, useMemo } from 'react';
import { Icon, Avatar, Button, TextHeadline, Gridlet } from '../../../components';
import { files, fileCategories } from '../../../data/files';
import {
  settingsNavItems,
  accountSubTabs,
  accountInfo,
  subscription,
} from '../../../data/settingsData';
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
import './TabsNav.css';

type View = 'home' | 'files' | 'settings' | 'hiring' | 'my-info' | 'people' | 'reports';
type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';

// Mock user data
const user = {
  name: 'Jess',
  title: 'Director, Demand Generation',
  department: 'Marketing',
  avatar: avatarLarge,
};

const navItems: { id: string; label: string; icon: 'home' | 'file-lines' | 'wrench' | 'user-group' | 'circle-user' | 'users' | 'chart-line' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'files', label: 'Files', icon: 'file-lines' },
  { id: 'hiring', label: 'Hiring', icon: 'user-group' },
  { id: 'my-info', label: 'My Info', icon: 'circle-user' },
  { id: 'people', label: 'People', icon: 'users' },
  { id: 'reports', label: 'Reports', icon: 'chart-line' },
  { id: 'settings', label: 'Settings', icon: 'wrench' },
];

export const TabsNav: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Files state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('size-largest');

  // Settings state
  const [activeNav, setActiveNav] = useState('account');
  const [activeSubTab, setActiveSubTab] = useState('account-info');

  // Controlled state for embedded pages (used on mobile)
  const [hiringTab, setHiringTab] = useState<HiringTab>('openings');
  const [peopleView, setPeopleView] = useState<PeopleViewMode>('list');
  const [reportsCategory, setReportsCategory] = useState<ReportsCategory>('overview');
  const [myInfoTab, setMyInfoTab] = useState<MyInfoTab>('personal');

  // Tab options for each page
  const hiringTabOptions = [
    { value: 'openings', label: 'Job openings' },
    { value: 'candidates', label: 'Candidates' },
    { value: 'pools', label: 'Talent pools' },
  ];

  const peopleViewOptions = [
    { value: 'list', label: 'List' },
    { value: 'directory', label: 'Directory' },
    { value: 'orgChart', label: 'Org Chart' },
  ];

  const reportsCategoryOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'all', label: 'All' },
    { value: 'general', label: 'General' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'payroll', label: 'Payroll' },
  ];

  const myInfoTabOptions = [
    { value: 'personal', label: 'Personal' },
    { value: 'job', label: 'Job' },
    { value: 'time-off', label: 'Time off' },
    { value: 'documents', label: 'Documents' },
    { value: 'timesheets', label: 'Timesheets' },
    { value: 'performance', label: 'Performance' },
  ];

  return (
    <div className="tabs-nav">
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
        {/* Mobile Top Bar */}
        <header className="tabs-topbar">
          <div className="tabs-topbar-left">
            <button className="tabs-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Icon name="bars" size={20} />
            </button>
            <img src={bamboohrLogo} alt="BambooHR" className="tabs-topbar-logo" />
          </div>
          <div className="tabs-topbar-actions">
            <button className="tabs-icon-btn">
              <Icon name="magnifying-glass" size={18} />
            </button>
            <button className="tabs-icon-btn">
              <Icon name="bell" size={18} />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="tabs-content">
          {currentView === 'home' && <HomeView user={user} />}
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
              <Hiring controlledTab={hiringTab} onTabChange={setHiringTab} />
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
              <div className="tabs-page-header-group">
                <h1 className="tabs-page-title">Reports</h1>
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

// Home View Component
const HomeView: React.FC<{ user: typeof user }> = ({ user }) => (
  <div className="tabs-view tabs-home-view">
    {/* Profile Header */}
    <div className="tabs-profile-header">
      <div className="tabs-profile-info">
        <Avatar src={user.avatar} size="large" />
        <div className="tabs-profile-text">
          <TextHeadline size="large" color="primary">
            {`Hi, ${user.name}`}
          </TextHeadline>
          <p className="tabs-profile-subtitle">
            {user.title} in {user.department}
          </p>
        </div>
      </div>
      <Button icon="pen-to-square" variant="standard">
        Edit
      </Button>
    </div>

    {/* Gridlet Dashboard */}
    <div className="tabs-dashboard-grid">
      <Gridlet title="Timesheet" minHeight={200} />
      <Gridlet title="What's happening at BambooHR" minHeight={200} className="tabs-gridlet-wide" />
      <Gridlet title="Time off" minHeight={200} />
      <Gridlet title="Celebrations" minHeight={200} />
      <Gridlet title="Who's out" minHeight={200} />
      <Gridlet title="Starting soon" minHeight={200} />
    </div>
  </div>
);

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
          <button className="tabs-btn-upload">
            <Icon name="arrow-up-from-bracket" size={16} />
            <span>Upload file</span>
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
          {settingsNavItems.slice(0, 6).map((item) => (
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

      {/* Mobile Sub-tabs */}
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

      {/* Mobile Settings Content */}
      <div className="tabs-settings-mobile-content mobile-only">
        <div className="tabs-settings-form-mobile">
          <h3 className="tabs-form-section-title">Account Info</h3>

          <div className="tabs-company-header">
            <h4 className="tabs-company-name">{accountInfo.companyName}</h4>
            <div className="tabs-company-details">
              <div className="tabs-company-meta">
                <Icon name="building" size={16} />
                <span>{accountInfo.accountNumber}</span>
              </div>
              <div className="tabs-company-meta">
                <Icon name="link" size={16} />
                <span>{accountInfo.url}</span>
              </div>
            </div>
          </div>

          <div className="tabs-subscription">
            <div className="tabs-subscription-header">
              <h4 className="tabs-subscription-title">My Subscription</h4>
              <button className="tabs-btn-manage">Manage</button>
            </div>

            <div className="tabs-subscription-card">
              <div className="tabs-subscription-icon">
                <Icon name="shield" size={24} />
              </div>
              <div className="tabs-subscription-info">
                <h5 className="tabs-subscription-plan">{subscription.plan}</h5>
                <p className="tabs-subscription-type">{subscription.packageType}</p>
              </div>
              <span className="tabs-subscription-employees">{subscription.employees} Employees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="tabs-settings-layout">
        {/* Settings Sidebar */}
        <aside className="tabs-settings-sidebar">
          <nav className="tabs-settings-nav">
            {settingsNavItems.slice(0, 12).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`tabs-settings-item ${activeNav === item.id ? 'active' : ''}`}
              >
                <Icon
                  name={item.icon}
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
            {/* Account Heading */}
            <h2 className="tabs-settings-card-title">Account</h2>

            <div className="tabs-settings-inner-layout">
              {/* Sub-tabs */}
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

              {/* Account Info Content */}
              <div className="tabs-settings-form">
                <h3 className="tabs-form-section-title">Account Info</h3>

                {/* Company Info */}
                <div className="tabs-company-header">
                  <h4 className="tabs-company-name">{accountInfo.companyName}</h4>
                  <div className="tabs-company-details">
                    <div className="tabs-company-meta">
                      <Icon name="building" size={16} />
                      <span>{accountInfo.accountNumber}</span>
                    </div>
                    <div className="tabs-company-meta">
                      <Icon name="link" size={16} />
                      <span>{accountInfo.url}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription */}
                <div className="tabs-subscription">
                  <div className="tabs-subscription-header">
                    <h4 className="tabs-subscription-title">My Subscription</h4>
                    <button className="tabs-btn-manage">Manage Subscription</button>
                  </div>

                  <div className="tabs-subscription-card">
                    <div className="tabs-subscription-icon">
                      <Icon name="shield" size={24} />
                    </div>
                    <div className="tabs-subscription-info">
                      <h5 className="tabs-subscription-plan">{subscription.plan}</h5>
                      <p className="tabs-subscription-type">{subscription.packageType}</p>
                    </div>
                    <span className="tabs-subscription-employees">{subscription.employees} Employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsNav;
