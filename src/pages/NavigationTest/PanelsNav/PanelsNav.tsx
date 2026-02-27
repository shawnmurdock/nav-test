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
import { SettingsContent } from '../shared/SettingsContent';
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

// Main navigation items - order: Home, My Info, People, Hiring, Reports, Files, Settings
const mainNavItems: { id: string; label: string; icon: 'house' | 'file-lines' | 'gear' | 'user-group' | 'circle-user' | 'id-badge' | 'chart-pie-simple' }[] = [
  { id: 'home', label: 'Home', icon: 'house' },
  { id: 'my-info', label: 'My Info', icon: 'circle-user' },
  { id: 'people', label: 'People', icon: 'user-group' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge' },
  { id: 'reports', label: 'Reports', icon: 'chart-pie-simple' },
  { id: 'files', label: 'Files', icon: 'file-lines' },
  { id: 'settings', label: 'Settings', icon: 'gear' },
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

// People sub-items
const peopleSubItems = [
  { id: 'list', label: 'List' },
  { id: 'directory', label: 'Directory' },
  { id: 'orgChart', label: 'Org Chart' },
];

// Reports sub-items
const reportsSubItems = [
  { id: 'recent', label: 'Recent' },
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

// Hiring sub-items
const hiringSubItems = [
  { id: 'openings', label: 'New Job Openings' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'pools', label: 'Talent Pools' },
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
  const [reportsCategory, setReportsCategory] = useState<ReportsCategory>('recent');
  const [filesCategory, setFilesCategory] = useState<string>('all');

  // Navigation history for breadcrumbs
  const [, setNavHistory] = useState<{ view: View; subView: string; label: string }[]>([]);

  // Get sub-items based on active section
  const getSubItems = (section: string) => {
    switch (section) {
      case 'files': return filesSubItems;
      case 'my-info': return myInfoSubItems;
      case 'people': return peopleSubItems;
      case 'reports': return reportsSubItems;
      case 'hiring': return hiringSubItems;
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
    const subItems = getSubItems(itemId);
    if (subItems.length === 0) {
      // No sub-items, navigate directly (e.g., Home)
      setCurrentView(itemId as View);
      setCurrentSubView('');
      setMobileMenuOpen(false);
      setPanelLevel('main');
      setActiveSection('');
      return;
    }
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
      } else if (activeSection === 'settings') {
        setActiveNav(itemId);
        // Set default sub-tab for account, otherwise clear it
        if (itemId === 'account') {
          setActiveSubTab('account-info');
        } else {
          setActiveSubTab('');
        }
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

  // Handle opening the mobile menu - opens to the current section if applicable
  const handleOpenMenu = () => {
    // If we're on a section that has sub-items, open directly to that section panel
    const sectionsWithSubItems = ['files', 'my-info', 'people', 'reports', 'hiring', 'settings'];
    if (sectionsWithSubItems.includes(currentView)) {
      setPanelLevel('section');
      setActiveSection(currentView);
    } else {
      setPanelLevel('main');
      setActiveSection('');
    }
    setMobileMenuOpen(true);
  };

  // Handle breadcrumb back click - goes back through navigation hierarchy
  const handleBreadcrumbBack = () => {
    // Settings has multi-level navigation: sub-tab → nav section → main
    if (currentView === 'settings') {
      // If we have a sub-tab, go back to the nav section (clear sub-tab)
      if (activeSubTab) {
        setActiveSubTab('');
        setCurrentSubView(activeNav);
        return;
      }
      // If we have a nav section, go back to main settings (default: account)
      if (activeNav && activeNav !== 'account') {
        setActiveNav('account');
        setActiveSubTab('');
        setCurrentSubView('');
        setNavHistory([]);
        return;
      }
      // Already at account with no sub-tab, clear everything
      setCurrentSubView('');
      setNavHistory([]);
      return;
    }

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
        setReportsCategory('recent');
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
            <button className="panels-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <Icon name="xmark" size={20} />
            </button>
          </div>

          {/* Panel Content */}
          <div className="panels-panel-content">
            {/* Main Level - Show main nav items */}
            {panelLevel === 'main' && (
              <nav className="panels-panel-nav">
                {mainNavItems.map(item => {
                  const hasSubItems = getSubItems(item.id).length > 0;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMainNavClick(item.id)}
                      className={`panels-panel-item ${currentView === item.id ? 'active' : ''}`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                      {hasSubItems && (
                        <Icon name="chevron-right" size={16} className="panels-panel-arrow" />
                      )}
                    </button>
                  );
                })}
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
                <button className="panels-menu-btn" onClick={handleOpenMenu}>
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
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">Hiring</h1>
              </div>
              <Hiring controlledTab={hiringTab} onTabChange={setHiringTab} hideTabs />
            </div>
          )}
          {currentView === 'my-info' && (
            <div className="panels-embedded-view">
              {myInfoTab !== 'personal' && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={() => {
                    setMyInfoTab('personal');
                    setCurrentSubView('personal');
                  }}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <MyInfo controlledTab={myInfoTab} onTabChange={setMyInfoTab} />
            </div>
          )}
          {currentView === 'people' && (
            <div className="panels-embedded-view">
              {peopleView !== 'list' && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={() => {
                    setPeopleView('list');
                    setCurrentSubView('list');
                  }}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header-group">
                <h1 className="panels-page-title">People</h1>
              </div>
              <People controlledView={peopleView} onViewChange={setPeopleView} />
            </div>
          )}
          {currentView === 'reports' && (
            <div className="panels-embedded-view">
              {reportsCategory !== 'recent' && (
                <div className="panels-breadcrumb">
                  <button className="panels-breadcrumb-back" onClick={() => {
                    setReportsCategory('recent');
                    setCurrentSubView('recent');
                  }}>
                    <Icon name="chevron-left" size={14} />
                    <span>Back</span>
                  </button>
                </div>
              )}
              <div className="panels-page-header">
                <h1 className="panels-page-title">
                  {reportsCategory === 'recent'
                    ? 'Reports'
                    : `${reportsSubItems.find(item => item.id === reportsCategory)?.label || 'Reports'} Report`}
                </h1>
                <div className="panels-header-actions">
                  <button className="panels-btn-primary-outlined">
                    <Icon name="circle-plus" size={16} />
                    New Report
                  </button>
                  <button className="panels-btn-icon">
                    <Icon name="folder-plus" size={18} />
                  </button>
                </div>
              </div>
              <Reports controlledCategory={reportsCategory} onCategoryChange={setReportsCategory} />
            </div>
          )}
          {currentView === 'settings' && (
            <SettingsView
              activeNav={activeNav}
              activeSubTab={activeSubTab}
              onBackClick={handleBreadcrumbBack}
              showBreadcrumb={(!!currentSubView && currentSubView !== 'account-info') || (!!activeSubTab && activeSubTab !== 'account-info') || (!!activeNav && activeNav !== 'account')}
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
    if (selectedCategory === 'all') return 'Files';
    const category = fileCategories.find(c => c.id === selectedCategory);
    return category?.label || 'Files';
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
          <button className="panels-btn-primary-outlined">
            <Icon name="arrow-up-from-bracket" size={16} />
            Upload File
          </button>
          <button className="panels-btn-icon">
            <Icon name="folder-plus" size={18} />
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
}> = ({ activeNav, activeSubTab, onBackClick, showBreadcrumb }) => {
  // Get settings tab label for display
  const getSettingsTitle = () => {
    const navItem = settingsNavItems.find(item => item.id === activeNav);
    if (!navItem) return 'Settings';

    // Account section always shows just "Account"
    if (activeNav === 'account') {
      return 'Account';
    }

    // For other sections with sub-tabs, show "Section - SubTab" format
    if (activeSubTab) {
      if (activeNav === 'security') {
        const subTab = securitySubItems.find(tab => tab.id === activeSubTab);
        if (subTab) return `${navItem.label} - ${subTab.label}`;
      }
    }

    return navItem.label;
  };

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
        <h1 className="panels-page-title">{getSettingsTitle()}</h1>
      </div>

      {/* Settings Content - Card wrapper like Dropdown */}
      <div className="panels-settings-content-area">
        <div className="panels-settings-card">
          <div className="panels-settings-inner-layout">
            <div className="panels-settings-form">
              <SettingsContent activeNav={activeNav} activeSubTab={activeSubTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelsNav;
