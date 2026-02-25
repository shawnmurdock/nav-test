import React, { useState, useMemo } from 'react';
import { Icon, Avatar, Button, TextHeadline, Gridlet, MobilePageSelect } from '../../../components';
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
import './DropdownNav.css';

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

export const DropdownNav: React.FC = () => {
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

  // Mobile select options for each page
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
    { value: 'compensation', label: 'Compensation' },
    { value: 'time-attendance', label: 'Time & Attendance' },
    { value: 'benefits', label: 'Benefits' },
    { value: 'training', label: 'Training' },
    { value: 'performance', label: 'Performance & Culture' },
    { value: 'hiring', label: 'Hiring' },
    { value: 'custom', label: 'Custom folder' },
  ];

  const myInfoTabOptions = [
    { value: 'personal', label: 'Personal' },
    { value: 'job', label: 'Job' },
    { value: 'time-off', label: 'Time off' },
    { value: 'documents', label: 'Documents' },
    { value: 'timesheets', label: 'Timesheets' },
    { value: 'performance', label: 'Performance' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'training', label: 'Training' },
  ];

  return (
    <div className="dropdown-nav">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="dropdown-mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="dropdown-mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="dropdown-mobile-menu-header">
              <img src={bamboohrLogo} alt="BambooHR" className="dropdown-mobile-logo-img" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <Icon name="xmark" size={20} />
              </button>
            </div>
            <nav className="dropdown-mobile-menu-nav">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id as View); setMobileMenuOpen(false); }}
                  className={`dropdown-mobile-menu-item ${currentView === item.id ? 'active' : ''}`}
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
            <div className="dropdown-mobile-menu-footer">
              <img src={avatarSmall} alt="John Doe" className="dropdown-mobile-avatar" />
              <div className="dropdown-mobile-user-info">
                <span className="dropdown-mobile-user-name">John Doe</span>
                <span className="dropdown-mobile-user-email">john@example.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Sidebar - Desktop */}
      <aside className={`dropdown-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="dropdown-logo">
          {sidebarCollapsed ? (
            <div className="dropdown-logo-icon">
              <Icon name="spa" size={20} />
            </div>
          ) : (
            <img src={bamboohrLogo} alt="BambooHR" className="dropdown-logo-img" />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="dropdown-nav-items">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`dropdown-nav-item ${currentView === item.id ? 'active' : ''}`}
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
          className="dropdown-collapse-btn"
        >
          <Icon name={sidebarCollapsed ? 'arrow-right-from-line' : 'arrow-left-from-line'} size={20} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>

        {/* User Profile */}
        <div className="dropdown-user">
          <img
            src={avatarSmall}
            alt="Account"
            className="dropdown-user-avatar"
          />
          {!sidebarCollapsed && (
            <span className="dropdown-user-name">Account</span>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="dropdown-main">
        {/* Mobile Top Bar */}
        <header className="dropdown-topbar">
          <div className="dropdown-topbar-left">
            <button className="dropdown-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Icon name="bars" size={20} />
            </button>
            <img src={bamboohrLogo} alt="BambooHR" className="dropdown-topbar-logo" />
          </div>
          <div className="dropdown-topbar-actions">
            <button className="dropdown-icon-btn">
              <Icon name="magnifying-glass" size={18} />
            </button>
            <button className="dropdown-icon-btn">
              <Icon name="bell" size={18} />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="dropdown-content">
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
            <div className="dropdown-embedded-view">
              <h1 className="dropdown-embedded-page-title">Hiring</h1>
              <div className="dropdown-mobile-page-select">
                <MobilePageSelect
                  options={hiringTabOptions}
                  value={hiringTab}
                  onChange={(value) => setHiringTab(value as HiringTab)}
                />
              </div>
              <Hiring controlledTab={hiringTab} onTabChange={setHiringTab} />
            </div>
          )}
          {currentView === 'my-info' && (
            <div className="dropdown-embedded-view dropdown-embedded-view-myinfo">
              <MyInfo
                controlledTab={myInfoTab}
                onTabChange={setMyInfoTab}
                mobileSelect={
                  <div className="dropdown-mobile-page-select">
                    <MobilePageSelect
                      options={myInfoTabOptions}
                      value={myInfoTab}
                      onChange={(value) => setMyInfoTab(value as MyInfoTab)}
                    />
                  </div>
                }
              />
            </div>
          )}
          {currentView === 'people' && (
            <div className="dropdown-embedded-view">
              <h1 className="dropdown-embedded-page-title">People</h1>
              <div className="dropdown-mobile-page-select">
                <MobilePageSelect
                  options={peopleViewOptions}
                  value={peopleView}
                  onChange={(value) => setPeopleView(value as PeopleViewMode)}
                />
              </div>
              <People controlledView={peopleView} onViewChange={setPeopleView} />
            </div>
          )}
          {currentView === 'reports' && (
            <div className="dropdown-embedded-view">
              <h1 className="dropdown-embedded-page-title">Reports</h1>
              <div className="dropdown-mobile-page-select">
                <MobilePageSelect
                  options={reportsCategoryOptions}
                  value={reportsCategory}
                  onChange={(value) => setReportsCategory(value as ReportsCategory)}
                />
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
  <div className="dropdown-view dropdown-home-view">
    {/* Profile Header */}
    <div className="dropdown-profile-header">
      <div className="dropdown-profile-info">
        <Avatar src={user.avatar} size="large" />
        <div className="dropdown-profile-text">
          <TextHeadline size="large" color="primary">
            {`Hi, ${user.name}`}
          </TextHeadline>
          <p className="dropdown-profile-subtitle">
            {user.title} in {user.department}
          </p>
        </div>
      </div>
      <Button icon="pen-to-square" variant="standard">
        Edit
      </Button>
    </div>

    {/* Gridlet Dashboard */}
    <div className="dropdown-dashboard-grid">
      <Gridlet title="Timesheet" minHeight={200} />
      <Gridlet title="What's happening at BambooHR" minHeight={200} className="dropdown-gridlet-wide" />
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

  // Options for MobilePageSelect
  const fileCategoryOptions = fileCategories.map(cat => ({
    value: cat.id,
    label: cat.label,
  }));

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
    <div className="dropdown-view dropdown-files-view dropdown-embedded-view">
      {/* Page Header */}
      <h1 className="dropdown-embedded-page-title">Files</h1>

      {/* Mobile Category Select */}
      <div className="dropdown-mobile-page-select">
        <MobilePageSelect
          options={fileCategoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>

      {/* Desktop Page Header */}
      <div className="dropdown-page-header dropdown-desktop-only">
        <h1 className="dropdown-page-title">Files</h1>
        <div className="dropdown-header-actions">
          <button className="dropdown-btn-upload">
            <Icon name="arrow-up-from-bracket" size={16} />
            <span>Upload file</span>
          </button>
        </div>
      </div>

      <div className="dropdown-files-layout">
        {/* Files Sidebar - Desktop */}
        <aside className="dropdown-files-sidebar">
          <nav className="dropdown-folder-list">
            {fileCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`dropdown-folder-item ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <Icon name="folder" size={16} />
                <span className="dropdown-folder-label">{category.label}</span>
                {category.count > 0 && (
                  <span className="dropdown-folder-count">({category.count})</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Files Content */}
        <div className="dropdown-files-content">
          <div className="dropdown-files-card">
            {/* Card Header */}
            <div className="dropdown-files-card-header">
              <h2 className="dropdown-section-title">{currentCategoryLabel}</h2>
              <div className="dropdown-files-actions">
                {/* Sort Dropdown */}
                <div className="dropdown-wrapper">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="dropdown-sort-btn"
                  >
                    <span className="dropdown-sort-label">Sort by</span>
                    <span className="dropdown-sort-value">
                      {sortOptions.find(opt => opt.value === sortBy)?.label}
                    </span>
                    <Icon name="chevron-down" size={12} />
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div className="dropdown-overlay" onClick={() => setSortDropdownOpen(false)} />
                      <div className="dropdown-menu">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => { onSortChange(option.value as SortOption); setSortDropdownOpen(false); }}
                            className={`dropdown-menu-item ${sortBy === option.value ? 'active' : ''}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button className="dropdown-icon-btn-bordered">
                  <Icon name="arrow-down-to-line" size={16} />
                </button>
                <button className="dropdown-icon-btn-bordered">
                  <Icon name="trash-can" size={16} />
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="dropdown-file-list">
              {filteredAndSortedFiles.map((file) => {
                const icon = getFileIcon(file.type);
                const isSelected = selectedFiles.has(file.id);

                return (
                  <div
                    key={file.id}
                    className={`dropdown-file-row ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFileSelection(file.id)}
                      className="dropdown-checkbox"
                    />
                    <Icon name={icon.name} size={20} style={{ color: icon.color }} />
                    <div className="dropdown-file-info">
                      <a href="#" className="dropdown-file-name" onClick={(e) => e.preventDefault()}>
                        {file.name}
                      </a>
                      <div className="dropdown-file-meta">
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
}> = ({
  activeNav,
  activeSubTab,
  onNavChange,
  onSubTabChange,
}) => {
  // Options for MobilePageSelect
  const settingsNavOptions = settingsNavItems.slice(0, 12).map(item => ({
    value: item.id,
    label: item.label,
  }));

  const subTabOptions = accountSubTabs.map(tab => ({
    value: tab.id,
    label: tab.label,
  }));

  return (
    <div className="dropdown-view dropdown-settings-view dropdown-embedded-view">
      {/* Mobile Page Title */}
      <h1 className="dropdown-embedded-page-title">Settings</h1>

      {/* Mobile Select - Settings Section */}
      <div className="dropdown-mobile-page-select">
        <MobilePageSelect
          options={settingsNavOptions}
          value={activeNav}
          onChange={onNavChange}
        />
      </div>

      {/* Mobile Select - Sub-tab */}
      <div className="dropdown-mobile-page-select dropdown-mobile-page-select-secondary">
        <MobilePageSelect
          options={subTabOptions}
          value={activeSubTab}
          onChange={onSubTabChange}
        />
      </div>

      {/* Desktop Page Header */}
      <div className="dropdown-page-header-group dropdown-desktop-only">
        <h1 className="dropdown-page-title dropdown-settings-title">Settings</h1>
        <p className="dropdown-page-description">Manage your account and preferences.</p>
      </div>

      <div className="dropdown-settings-layout">
        {/* Settings Sidebar - Desktop */}
        <aside className="dropdown-settings-sidebar">
          <nav className="dropdown-settings-nav">
            {settingsNavItems.slice(0, 12).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`dropdown-settings-item ${activeNav === item.id ? 'active' : ''}`}
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
        <div className="dropdown-settings-content-area">
          <div className="dropdown-settings-card">
            {/* Account Heading */}
            <h2 className="dropdown-settings-card-title">Account</h2>

            <div className="dropdown-settings-inner-layout">
              {/* Sub-tabs - Desktop */}
              <div className="dropdown-subtabs">
                <nav className="dropdown-subtabs-nav">
                  {accountSubTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => onSubTabChange(tab.id)}
                      className={`dropdown-subtab ${activeSubTab === tab.id ? 'active' : ''}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Account Info Content */}
              <div className="dropdown-settings-form">
                <h3 className="dropdown-form-section-title">Account Info</h3>

                {/* Company Info */}
                <div className="dropdown-company-header">
                  <h4 className="dropdown-company-name">{accountInfo.companyName}</h4>
                  <div className="dropdown-company-details">
                    <div className="dropdown-company-meta">
                      <Icon name="building" size={16} />
                      <span>{accountInfo.accountNumber}</span>
                    </div>
                    <div className="dropdown-company-meta">
                      <Icon name="link" size={16} />
                      <span>{accountInfo.url}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription */}
                <div className="dropdown-subscription">
                  <div className="dropdown-subscription-header">
                    <h4 className="dropdown-subscription-title">My Subscription</h4>
                    <button className="dropdown-btn-manage">Manage Subscription</button>
                  </div>

                  <div className="dropdown-subscription-card">
                    <div className="dropdown-subscription-icon">
                      <Icon name="shield" size={24} />
                    </div>
                    <div className="dropdown-subscription-info">
                      <h5 className="dropdown-subscription-plan">{subscription.plan}</h5>
                      <p className="dropdown-subscription-type">{subscription.packageType}</p>
                    </div>
                    <span className="dropdown-subscription-employees">{subscription.employees} Employees</span>
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

export default DropdownNav;
