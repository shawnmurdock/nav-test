import React, { useState, useMemo } from 'react';
import { Icon } from '../../../components';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { useBreakpoint, useMazeTracking } from '../../../hooks';
import { files, fileCategories } from '../../../data/files';
import {
  settingsNavItems,
  accountSubTabs,
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
import { HomeContent } from '../shared/HomeContent';
import './PanelsNav.css';

type View = 'home' | 'files' | 'settings' | 'hiring' | 'my-info' | 'people' | 'reports';
type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';
type PanelLevel = 'main' | 'section' | 'subsection';

// Mock user data
const user = {
  name: 'Jess',
  title: 'Director, Demand Generation',
  department: 'Marketing',
  avatar: avatarLarge,
};

// Main navigation items
const mainNavItems: { id: string; label: string; icon: 'home' | 'file-lines' | 'wrench' | 'user-group' | 'circle-user' | 'users' | 'chart-line' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'files', label: 'Files', icon: 'file-lines' },
  { id: 'hiring', label: 'Hiring', icon: 'user-group' },
  { id: 'my-info', label: 'My Info', icon: 'circle-user' },
  { id: 'people', label: 'People', icon: 'users' },
  { id: 'reports', label: 'Reports', icon: 'chart-line' },
  { id: 'settings', label: 'Settings', icon: 'wrench' },
];

// Home sub-items
const homeSubItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'team', label: 'Team' },
  { id: 'projects', label: 'Projects' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'messages', label: 'Messages' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'finance', label: 'Finance' },
];

// Files sub-items - derived from fileCategories data
const filesSubItems = fileCategories.map(cat => ({
  id: cat.id,
  label: cat.label,
  count: cat.count,
}));

// Security sub-items (for Settings > Security)
const securitySubItems = [
  { id: 'password', label: 'Password' },
  { id: 'two-factor', label: 'Two-Factor Auth' },
  { id: 'login-history', label: 'Login History' },
  { id: 'active-sessions', label: 'Active Sessions' },
];

// Hiring sub-items
const hiringSubItems = [
  { id: 'openings', label: 'Job Openings' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'pools', label: 'Talent Pools' },
];

// My Info sub-items
const myInfoSubItems = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job' },
  { id: 'time-off', label: 'Time Off' },
  { id: 'documents', label: 'Documents' },
  { id: 'timesheets', label: 'Timesheets' },
  { id: 'performance', label: 'Performance' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'training', label: 'Training' },
];

// People sub-items
const peopleSubItems = [
  { id: 'list', label: 'List' },
  { id: 'directory', label: 'Directory' },
  { id: 'orgChart', label: 'Org Chart' },
];

// Reports sub-items
const reportsSubItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'compensation', label: 'Compensation' },
  { id: 'time-attendance', label: 'Time & Attendance' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'training', label: 'Training' },
  { id: 'performance', label: 'Performance & Culture' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'custom', label: 'Custom Folder' },
];

export const PanelsNav: React.FC = () => {
  useMazeTracking();
  const breakpoint = useBreakpoint();
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentSubView, setCurrentSubView] = useState<string>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [panelLevel, setPanelLevel] = useState<PanelLevel>('main');
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeSubsection, setActiveSubsection] = useState<string>('');
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Files state
  const [sortBy, setSortBy] = useState<SortOption>('size-largest');

  // Settings state
  const [activeNav, setActiveNav] = useState('account');
  const [activeSubTab, setActiveSubTab] = useState('account-info');

  // Controlled state for embedded pages
  const [hiringTab, setHiringTab] = useState<HiringTab>('openings');
  const [myInfoTab, setMyInfoTab] = useState<MyInfoTab>('personal');
  const [peopleView, setPeopleView] = useState<PeopleViewMode>('list');
  const [reportsCategory, setReportsCategory] = useState<ReportsCategory>('overview');
  const [filesCategory, setFilesCategory] = useState<string>('all');

  // Navigation history for breadcrumbs
  const [, setNavHistory] = useState<{ view: View; subView: string; label: string }[]>([]);

  // Get sub-items based on active section
  const getSubItems = (section: string) => {
    switch (section) {
      case 'home': return homeSubItems;
      case 'files': return filesSubItems;
      case 'hiring': return hiringSubItems;
      case 'my-info': return myInfoSubItems;
      case 'people': return peopleSubItems;
      case 'reports': return reportsSubItems;
      case 'settings': return settingsNavItems.slice(0, 12).map(item => ({ id: item.id, label: item.label }));
      default: return [];
    }
  };

  // Get sub-sub-items for settings sections
  const getSubSubItems = (subsection: string) => {
    if (subsection === 'security') return securitySubItems;
    if (subsection === 'account') return accountSubTabs;
    return [];
  };

  // Handle main nav item click
  const handleMainNavClick = (itemId: string) => {
    setActiveSection(itemId);
    setPanelLevel('section');
  };

  // Handle section item click
  const handleSectionItemClick = (itemId: string) => {
    const subSubItems = getSubSubItems(itemId);
    if (subSubItems.length > 0) {
      setActiveSubsection(itemId);
      setPanelLevel('subsection');
    } else {
      // No sub-items, navigate directly
      const sectionLabel = mainNavItems.find(i => i.id === activeSection)?.label || '';

      // Track navigation history
      setNavHistory([{ view: activeSection as View, subView: itemId, label: sectionLabel }]);

      // Set controlled state based on the section
      if (activeSection === 'hiring') {
        setHiringTab(itemId as HiringTab);
      } else if (activeSection === 'my-info') {
        setMyInfoTab(itemId as MyInfoTab);
      } else if (activeSection === 'people') {
        setPeopleView(itemId as PeopleViewMode);
      } else if (activeSection === 'reports') {
        setReportsCategory(itemId as ReportsCategory);
      } else if (activeSection === 'files') {
        setFilesCategory(itemId);
      }

      setCurrentView(activeSection as View);
      setCurrentSubView(itemId);
      setMobileMenuOpen(false);
      setPanelLevel('main');
      setActiveSection('');
      setActiveSubsection('');
    }
  };

  // Handle subsection item click
  const handleSubsectionItemClick = (itemId: string) => {
    const sectionLabel = mainNavItems.find(i => i.id === activeSection)?.label || '';
    const subsectionLabel = getSubItems(activeSection).find(i => i.id === activeSubsection)?.label || '';

    // Track navigation history with multiple levels
    setNavHistory([
      { view: activeSection as View, subView: '', label: sectionLabel },
      { view: activeSection as View, subView: activeSubsection, label: subsectionLabel },
    ]);

    setCurrentView(activeSection as View);
    setCurrentSubView(itemId);
    if (activeSection === 'settings') {
      setActiveNav(activeSubsection);
      setActiveSubTab(itemId);
    }
    setMobileMenuOpen(false);
    setPanelLevel('main');
    setActiveSection('');
    setActiveSubsection('');
  };

  // Handle back navigation
  const handleBack = () => {
    if (panelLevel === 'subsection') {
      setPanelLevel('section');
      setActiveSubsection('');
    } else if (panelLevel === 'section') {
      setPanelLevel('main');
      setActiveSection('');
    }
  };

  // Get panel title
  const getPanelTitle = () => {
    if (panelLevel === 'subsection') {
      const item = getSubItems(activeSection).find(i => i.id === activeSubsection);
      return item?.label || '';
    }
    if (panelLevel === 'section') {
      const item = mainNavItems.find(i => i.id === activeSection);
      return item?.label || '';
    }
    return '';
  };

  // Get current page title for content area
  const getCurrentPageTitle = () => {
    const mainItem = mainNavItems.find(i => i.id === currentView);
    if (!mainItem) return '';

    // If there's a sub-view, get that label
    if (currentSubView) {
      const subItems = getSubItems(currentView);
      const subItem = subItems.find(i => i.id === currentSubView);
      if (subItem) return subItem.label;
    }

    return mainItem.label;
  };

  // Handle breadcrumb back click - goes back to main page of current section
  const handleBreadcrumbBack = () => {
    // Reset to the default sub-view for the current section
    switch (currentView) {
      case 'files':
        setFilesCategory('all');
        break;
      case 'hiring':
        setHiringTab('openings');
        break;
      case 'my-info':
        setMyInfoTab('personal');
        break;
      case 'people':
        setPeopleView('list');
        break;
      case 'reports':
        setReportsCategory('overview');
        break;
      case 'settings':
        setActiveNav('account');
        setActiveSubTab('account-info');
        break;
    }

    // Clear sub-view and navigation history
    setCurrentSubView('');
    setNavHistory([]);
  };

  // Clear history when directly clicking sidebar nav
  const handleSidebarNavClick = (itemId: string) => {
    setNavHistory([]);
    setCurrentView(itemId as View);
    setCurrentSubView('');
  };

  return (
    <div className={`panels-nav ${breakpoint.isLaptopOrAbove ? 'with-global-header' : ''}`}>
      {/* Main Sidebar - Desktop Only */}
      <aside className={`panels-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo */}
        <div className="panels-logo">
          {sidebarCollapsed ? (
            <div className="panels-logo-icon">
              <Icon name="spa" size={20} />
            </div>
          ) : (
            <img src={bamboohrLogo} alt="BambooHR" className="panels-logo-img" />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="panels-nav-items">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarNavClick(item.id)}
              className={`panels-nav-item ${currentView === item.id ? 'active' : ''}`}
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
          className="panels-collapse-btn"
        >
          <Icon name={sidebarCollapsed ? 'arrow-right-from-line' : 'arrow-left-from-line'} size={20} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>

        {/* User Profile */}
        <div className="panels-user">
          <img
            src={avatarSmall}
            alt="Account"
            className="panels-user-avatar"
          />
          {!sidebarCollapsed && (
            <span className="panels-user-name">Account</span>
          )}
        </div>
      </aside>

      {/* Full-Screen Mobile Panel */}
      {mobileMenuOpen && (
        <div className="panels-fullscreen-panel">
          {/* Panel Header */}
          <div className="panels-panel-header">
            {panelLevel !== 'main' && (
              <button className="panels-back-btn" onClick={handleBack}>
                <Icon name="chevron-left" size={16} />
              </button>
            )}
            {panelLevel === 'main' ? (
              <img src={bamboohrLogo} alt="BambooHR" className="panels-panel-logo" />
            ) : (
              <span className="panels-panel-title">{getPanelTitle()}</span>
            )}
            <button className="panels-close-btn" onClick={() => {
              setMobileMenuOpen(false);
              setPanelLevel('main');
              setActiveSection('');
              setActiveSubsection('');
            }}>
              <Icon name="xmark" size={20} />
            </button>
          </div>

          {/* Panel Content */}
          <div className="panels-panel-content">
            {/* Main Level - Show main nav items */}
            {panelLevel === 'main' && (
              <nav className="panels-panel-nav">
                {mainNavItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleMainNavClick(item.id)}
                    className={`panels-panel-item ${currentView === item.id ? 'active' : ''}`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                    <Icon name="chevron-right" size={16} className="panels-panel-arrow" />
                  </button>
                ))}
              </nav>
            )}

            {/* Section Level - Show sub-items */}
            {panelLevel === 'section' && (
              <nav className="panels-panel-nav">
                {getSubItems(activeSection).map(item => {
                  const hasSubItems = getSubSubItems(item.id).length > 0;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSectionItemClick(item.id)}
                      className={`panels-panel-item ${currentSubView === item.id ? 'active' : ''}`}
                    >
                      <span>{item.label}</span>
                      {hasSubItems && (
                        <Icon name="chevron-right" size={16} className="panels-panel-arrow" />
                      )}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Subsection Level - Show sub-sub-items */}
            {panelLevel === 'subsection' && (
              <nav className="panels-panel-nav">
                {getSubSubItems(activeSubsection).map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSubsectionItemClick(item.id)}
                    className={`panels-panel-item ${activeSubTab === item.id ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Panel Footer - User */}
          <div className="panels-panel-footer">
            <img src={avatarSmall} alt="John Doe" className="panels-panel-user-avatar" />
            <div className="panels-panel-user-info">
              <span className="panels-panel-user-name">John Doe</span>
              <span className="panels-panel-user-email">john@example.com</span>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <main className="panels-main">
        {/* GlobalHeader - Only visible on Laptop, Desktop, Monitor (>= 1024px) */}
        {breakpoint.isLaptopOrAbove && (
          <GlobalHeader className="panels-global-header" />
        )}

        {/* Mobile Top Bar */}
        <header className="panels-topbar">
          {searchExpanded ? (
            /* Expanded Search Bar */
            <div className="panels-topbar-search-expanded">
              <Icon name="magnifying-glass" size={16} className="panels-search-icon" />
              <input
                type="text"
                placeholder="Search anything..."
                className="panels-search-input"
                autoFocus
              />
              <button
                className="panels-search-close"
                onClick={() => setSearchExpanded(false)}
              >
                <Icon name="xmark" size={18} />
              </button>
            </div>
          ) : (
            /* Default Top Bar */
            <>
              <div className="panels-topbar-left">
                <button className="panels-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                  <Icon name="bars" size={20} />
                </button>
                <img src={bamboohrLogo} alt="BambooHR" className="panels-topbar-logo" />
              </div>
              <div className="panels-topbar-actions">
                <button className="panels-icon-btn" onClick={() => setSearchExpanded(true)}>
                  <Icon name="magnifying-glass" size={18} />
                </button>
                <button className="panels-icon-btn">
                  <Icon name="bell" size={18} />
                </button>
              </div>
            </>
          )}
        </header>

        {/* View Content */}
        <div className="panels-content">
          {currentView === 'home' && (
            <div className="panels-view">
              <HomeContent user={user} />
            </div>
          )}
          {currentView === 'files' && (
            <FilesView
              sortBy={sortBy}
              onSortChange={setSortBy}
              onBackClick={handleBreadcrumbBack}
              showBreadcrumb={filesCategory !== 'all'}
              selectedCategory={filesCategory}
            />
          )}
          {currentView === 'hiring' && (
            <div className="panels-embedded-view">
              {currentSubView && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={handleBreadcrumbBack}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">{getCurrentPageTitle()}</h1>
              </div>
              <Hiring controlledTab={hiringTab} onTabChange={setHiringTab} hideTabs />
            </div>
          )}
          {currentView === 'my-info' && (
            <div className="panels-embedded-view">
              {currentSubView && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={handleBreadcrumbBack}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">{getCurrentPageTitle()}</h1>
              </div>
              <MyInfo controlledTab={myInfoTab} onTabChange={setMyInfoTab} />
            </div>
          )}
          {currentView === 'people' && (
            <div className="panels-embedded-view">
              {currentSubView && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={handleBreadcrumbBack}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">{getCurrentPageTitle()}</h1>
              </div>
              <People controlledView={peopleView} onViewChange={setPeopleView} />
            </div>
          )}
          {currentView === 'reports' && (
            <div className="panels-embedded-view">
              {currentSubView && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={handleBreadcrumbBack}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">{getCurrentPageTitle()}</h1>
              </div>
              <Reports controlledCategory={reportsCategory} onCategoryChange={setReportsCategory} />
            </div>
          )}
          {currentView === 'settings' && (
            <SettingsView
              activeNav={activeNav}
              activeSubTab={activeSubTab}
              onBackClick={handleBreadcrumbBack}
              showBreadcrumb={!!currentSubView}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Files View Component - No folder navigation sidebar on mobile
const FilesView: React.FC<{
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onBackClick?: () => void;
  showBreadcrumb?: boolean;
  selectedCategory?: string;
}> = ({ sortBy, onBackClick, showBreadcrumb, selectedCategory = 'all' }) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  // Map category IDs to category names in file data
  const getCategoryName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'all',
      'signature-templates': 'Signature Templates',
      'benefits-docs': 'Benefits Docs',
      'payroll': 'Payroll',
      'trainings': 'Trainings',
      'company-policies': 'Company Policies',
    };
    return categoryMap[categoryId] || categoryId;
  };

  // Filter files by category
  const filteredFiles = useMemo(() => {
    if (selectedCategory === 'all') {
      return files;
    }
    const categoryName = getCategoryName(selectedCategory);
    return files.filter(f => f.category === categoryName);
  }, [selectedCategory]);

  const sortedFiles = useMemo(() => {
    const sorted = [...filteredFiles];
    switch (sortBy) {
      case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent': return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest': return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      case 'size-largest': return sorted.sort((a, b) => b.sizeBytes - a.sizeBytes);
      case 'size-smallest': return sorted.sort((a, b) => a.sizeBytes - b.sizeBytes);
      default: return sorted;
    }
  }, [sortBy, filteredFiles]);

  // Get display title based on selected category
  const getCategoryTitle = () => {
    const category = fileCategories.find(c => c.id === selectedCategory);
    return category?.label || 'All files';
  };

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
    <div className="panels-view panels-files-view">
      {/* Breadcrumb */}
      {showBreadcrumb && onBackClick && (
        <div className="panels-breadcrumb">
          <button className="panels-breadcrumb-back" onClick={onBackClick}>
            <Icon name="chevron-left" size={14} />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="panels-page-header">
        <div className="panels-page-header-text">
          <h1 className="panels-page-title">{getCategoryTitle()}</h1>
          <p className="panels-page-subtitle">{sortedFiles.length} {sortedFiles.length === 1 ? 'item' : 'items'}</p>
        </div>
        <div className="panels-header-actions">
          <button className="panels-btn-upload-primary">
            Upload File
          </button>
        </div>
      </div>

      {/* Files Content - No sidebar navigation on mobile */}
      <div className="panels-files-content-mobile">
        <div className="panels-files-card">
          {/* Card Header */}
          <div className="panels-files-card-header">
            <span className="panels-files-column-name">NAME</span>
            <span className="panels-files-column-size">SIZE</span>
          </div>

          {/* File List */}
          <div className="panels-file-list">
            {sortedFiles.map((file) => {
              const icon = getFileIcon(file.type);
              const isSelected = selectedFiles.has(file.id);

              return (
                <div
                  key={file.id}
                  className={`panels-file-row-mobile ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="panels-file-row-left">
                    <Icon name={icon.name} size={20} style={{ color: icon.color }} />
                    <span className="panels-file-name-mobile">{file.name}</span>
                  </div>
                  <span className="panels-file-size-mobile">{file.size}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings View Component - No sidebar navigation on mobile
const SettingsView: React.FC<{
  activeNav: string;
  activeSubTab: string;
  onBackClick?: () => void;
  showBreadcrumb?: boolean;
}> = ({ onBackClick, showBreadcrumb }) => {
  return (
    <div className="panels-view panels-settings-view">
      {/* Breadcrumb */}
      {showBreadcrumb && onBackClick && (
        <div className="panels-breadcrumb">
          <button className="panels-breadcrumb-back" onClick={onBackClick}>
            <Icon name="chevron-left" size={14} />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="panels-settings-header-mobile">
        <h1 className="panels-page-title">Security - Two-Factor Auth</h1>
        <p className="panels-settings-description">
          Manage your security settings and configuration preferences.
        </p>
      </div>

      {/* Settings Content - No sidebar on mobile */}
      <div className="panels-settings-content-mobile">
        {/* General Information */}
        <div className="panels-settings-section">
          <h2 className="panels-settings-section-title">General Information</h2>
          <div className="panels-settings-form-row">
            <div className="panels-settings-field">
              <label className="panels-settings-label">Display Name</label>
              <input type="text" className="panels-settings-input" value="John Doe" readOnly />
            </div>
            <div className="panels-settings-field">
              <label className="panels-settings-label">Email Address</label>
              <input type="text" className="panels-settings-input" value="john@example.c" readOnly />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="panels-settings-section">
          <h2 className="panels-settings-section-title">Preferences</h2>
          <div className="panels-settings-toggle-list">
            <div className="panels-settings-toggle-item">
              <div className="panels-settings-toggle-info">
                <span className="panels-settings-toggle-label">Enable Feature 1</span>
                <span className="panels-settings-toggle-desc">Receive automatic updates for this specific module.</span>
              </div>
              <div className="panels-settings-toggle">
                <input type="checkbox" defaultChecked />
              </div>
            </div>
            <div className="panels-settings-toggle-item">
              <div className="panels-settings-toggle-info">
                <span className="panels-settings-toggle-label">Enable Feature 2</span>
                <span className="panels-settings-toggle-desc">Receive automatic updates for this specific module.</span>
              </div>
              <div className="panels-settings-toggle">
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelsNav;
