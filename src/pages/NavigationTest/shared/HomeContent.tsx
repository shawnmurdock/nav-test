import React, { useState, useRef, useEffect } from 'react';
import { Icon, Avatar, Button, TextHeadline, Gridlet } from '../../../components';
import { employees } from '../../../data/employees';
import './HomeContent.css';

interface HomeContentProps {
  user: {
    name: string;
    title: string;
    department: string;
    avatar: string;
  };
}

// Celebration data
const celebrations = [
  { id: 1, name: 'Jake Bryan', event: 'Happy Birthday!', date: 'March 7', avatar: 'https://i.pravatar.cc/300?img=11' },
  { id: 2, name: 'Jeremy Steel', event: 'Happy Birthday!', date: 'March 23', avatar: 'https://i.pravatar.cc/300?img=12' },
  { id: 3, name: 'Shawn Murdock', event: 'Happy Birthday!', date: 'March 23', avatar: 'https://i.pravatar.cc/300?img=13' },
  { id: 4, name: 'Ryota Saito', event: 'Happy Birthday!', date: 'March 28', avatar: 'https://i.pravatar.cc/300?img=14' },
];

// Company links data
const companyLinks = [
  { category: 'Company', links: ['Company website'] },
  { category: 'Benefits', links: ['401k', 'Health', 'Vision', 'Dental'] },
  { category: 'COVID-19', links: [] },
];

// Time off requests data
const timeOffRequests = [
  { id: 1, name: 'Charlotte Abbott', approver: 'Ryota Saito', request: 'May 31—Jun 3 (16 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 2, name: 'Shawn Murdock', approver: '—', request: 'Jul 16—Jul 17 (16 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 3, name: 'Charlotte Abbott', approver: '—', request: 'Aug 3—Aug 7 (40 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 4, name: 'Jennifer Caldwell', approver: 'Shawn Murdock', request: 'Aug 10—Aug 14 (40 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 5, name: 'Charlotte Abbott', approver: 'Ryota Saito', request: 'Aug 29—Sep 4 (40 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 6, name: 'Maja Andev', approver: 'Shawn Murdock', request: 'Sep 28—Oct 2 (40 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 7, name: 'Eric Asture', approver: 'Ryota Saito', request: 'Oct 15—Oct 18 (24 hours Vacation)', submitted: '1 year ago', urgent: true },
  { id: 8, name: 'Dorothy Chou', approver: '—', request: 'Nov 1—Nov 5 (40 hours Vacation)', submitted: '1 year ago', urgent: true },
];

// Trainings data
const trainings = [
  { id: 1, name: 'Annual Security Training', employees: 89 },
  { id: 2, name: 'BambooHR Advantage Package...', employees: 89 },
];

// What's happening data
const whatsHappening = [
  { id: 1, text: 'Take a moment to complete your Employee Assessments.', subtext: 'Complete the assessments on the Performance tab on each employee\'s profile.', dueDate: 'Dec 31 (57 days ago)', pastDue: true },
  { id: 2, text: 'Take a few minutes to complete your Self Assessment.', subtext: '', dueDate: 'Dec 31 (57 days ago)', pastDue: true },
  { id: 3, text: 'Take a moment to select people to give feedback about your team members.', subtext: 'Requests for feedback must be sent before Feb 19 (7 days ago).', dueDate: '', pastDue: true },
  { id: 4, text: 'Time Tracking is enabled and ready for setup.', subtext: '1 year ago', pastDue: false },
  { id: 5, text: 'Benefits Administration is enabled and ready for setup.', subtext: '1 year ago', pastDue: false },
];

// My stuff data
const myStuff = [
  { id: 1, icon: 'graduation-cap' as const, label: 'Training', detail: '3 active trainings, 4 past due or expired' },
  { id: 2, icon: 'heart' as const, label: 'Benefits', detail: 'You are enrolled in 2 benefit plans' },
];

// Direct reports - get from employees data
const directReports = employees.slice(1, 10).map(emp => ({
  id: emp.id,
  name: emp.name,
  avatar: emp.avatar,
  startDate: emp.id % 3 === 0 ? `Mar ${emp.id} (${emp.id} days)` : undefined,
}));

export const HomeContent: React.FC<HomeContentProps> = ({ user }) => {
  const [timeOffExpanded, setTimeOffExpanded] = useState(false);
  const [activeTimeOffTab, setActiveTimeOffTab] = useState<'urgent' | 'other'>('urgent');
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [timeOffTypeIndex, setTimeOffTypeIndex] = useState(0);
  const newDropdownRef = useRef<HTMLDivElement>(null);

  // Time off types for the carousel
  const timeOffTypes = [
    { type: 'Bereavement', hours: 0, unit: 'days', label: 'used (YTD)', icon: 'briefcase' as const },
    { type: 'COVID-19 Related A...', hours: 0, unit: 'hours', label: 'used (YTD)', icon: 'clock' as const },
    { type: 'Comp/In Lieu Time', hours: 0, unit: 'hours', label: 'used (YTD)', icon: 'briefcase' as const },
    { type: 'FMLA', hours: 0, unit: 'hours', label: 'used (YTD)', icon: 'users' as const },
    { type: 'Sick', hours: 24, unit: 'hours', label: 'available', icon: 'clipboard' as const },
    { type: 'Vacation', hours: 144, unit: 'hours', label: 'available', icon: 'spa' as const },
  ];

  const currentTimeOffType = timeOffTypes[timeOffTypeIndex];

  const handleNextTimeOffType = () => {
    setTimeOffTypeIndex((prev) => (prev + 1) % timeOffTypes.length);
  };

  const handlePrevTimeOffType = () => {
    setTimeOffTypeIndex((prev) => (prev - 1 + timeOffTypes.length) % timeOffTypes.length);
  };

  const urgentCount = timeOffRequests.filter(r => r.urgent).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (newDropdownRef.current && !newDropdownRef.current.contains(event.target as Node)) {
        setNewDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="home-content">
      {/* Profile Header */}
      <div className="home-profile-header">
        <div className="home-profile-info">
          <Avatar src={user.avatar} size="large" />
          <div className="home-profile-text">
            <TextHeadline size="large" color="primary">
              {`Hi, ${user.name}`}
            </TextHeadline>
            <p className="home-profile-subtitle">
              {user.title} in {user.department}
            </p>
          </div>
        </div>
        <div className="home-header-actions">
          {/* New... Dropdown Button */}
          <div className="home-new-dropdown" ref={newDropdownRef}>
            <button
              className="home-new-button"
              onClick={() => setNewDropdownOpen(!newDropdownOpen)}
            >
              <Icon name="circle-plus" size={16} />
              <span>New...</span>
              <Icon name="caret-down" size={10} />
            </button>
            {newDropdownOpen && (
              <div className="home-new-dropdown-menu">
                <button className="home-new-dropdown-item" onClick={() => setNewDropdownOpen(false)}>
                  New Employee
                </button>
                <button className="home-new-dropdown-item" onClick={() => setNewDropdownOpen(false)}>
                  New Report
                </button>
              </div>
            )}
          </div>
          {/* Edit Button */}
          <Button icon="table-cells" variant="standard">
            Edit
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="home-dashboard-grid">
        {/* Row 1 */}
        {/* Time Off Card */}
        <Gridlet title="Time Off" icon="calendar" minHeight={200} className="home-time-off-gridlet">
          <div className="home-time-off-card-content">
            <div className="home-time-off-display">
              <span className="home-time-off-type-label">{currentTimeOffType.type}</span>
              <div className="home-time-off-icon-row">
                {timeOffTypeIndex > 0 && (
                  <button className="home-time-off-nav-btn home-time-off-prev-btn" onClick={handlePrevTimeOffType}>
                    <Icon name="chevron-left" size={14} />
                  </button>
                )}
                <div className="home-time-off-center">
                  <Icon name={currentTimeOffType.icon} size={32} className="home-time-off-type-icon" />
                  <span className="home-time-off-hours">
                    <span className="home-time-off-hours-number">{currentTimeOffType.hours}</span>
                  </span>
                </div>
                <button className="home-time-off-nav-btn home-time-off-next-btn" onClick={handleNextTimeOffType}>
                  <Icon name="chevron-right" size={14} />
                </button>
              </div>
              <span className="home-time-off-label">{currentTimeOffType.unit} {currentTimeOffType.label}</span>
            </div>
            <div className="home-time-off-actions">
              <button className="home-time-off-request-btn">
                <Icon name="calendar" size={16} variant="regular" />
                <span>Request Time Off</span>
              </button>
              <button className="home-time-off-calc-btn">
                <Icon name="table-cells" size={18} />
              </button>
            </div>
          </div>
        </Gridlet>

        {/* My Stuff Card - Moved before What's Happening for mobile order */}
        <Gridlet title="My Stuff" icon="clipboard" minHeight={180} className="home-my-stuff-gridlet">
          <div className="home-my-stuff-content">
            {myStuff.map(item => (
              <div key={item.id} className="home-stuff-item">
                <Icon name={item.icon} size={18} className="home-stuff-icon" />
                <div className="home-stuff-text">
                  <span className="home-stuff-label">{item.label}</span>
                  <span className="home-stuff-detail">{item.detail}</span>
                </div>
              </div>
            ))}
            <div className="home-stuff-item">
              <Icon name="file-lines" size={18} className="home-stuff-icon" />
              <div className="home-stuff-text">
                <span className="home-stuff-label">W-4 (2024) is waiting for your signature!</span>
              </div>
            </div>
          </div>
        </Gridlet>

        {/* What's Happening Card - Wide */}
        <Gridlet title="What's Happening" icon="bell" className="home-gridlet-wide home-whats-happening-gridlet" minHeight={200}>
          <div className="home-whats-happening-content">
            {whatsHappening.map(item => (
              <div key={item.id} className="home-happening-item">
                <Icon name={item.pastDue ? 'circle-info' : 'check-circle'} size={16} className={item.pastDue ? 'home-happening-icon-warning' : 'home-happening-icon-info'} />
                <div className="home-happening-text">
                  <span className="home-happening-title">{item.text}</span>
                  {item.subtext && <span className="home-happening-subtext">{item.subtext}</span>}
                  {item.dueDate && (
                    <span className={`home-happening-date ${item.pastDue ? 'past-due' : ''}`}>
                      Please complete by {item.dueDate}. {item.pastDue && <span className="home-past-due-badge">PAST DUE</span>}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Gridlet>

        {/* My Direct Reports Card - Wide */}
        <Gridlet title="My Direct Reports" icon="users" className="home-gridlet-wide home-direct-reports-gridlet" minHeight={280}>
          <div className="home-direct-reports-content">
            <div className="home-direct-reports-tabs">
              <button className="home-dr-tab">Headcount</button>
              <button className="home-dr-tab active">My Direct Reports</button>
              <button className="home-dr-tab">Turnover</button>
            </div>
            <div className="home-direct-reports-grid">
              {directReports.map(report => (
                <div key={report.id} className="home-direct-report">
                  <img src={report.avatar} alt={report.name} className="home-dr-avatar" />
                  <span className="home-dr-name">{report.name}</span>
                  {report.startDate && <span className="home-dr-start-date">📅 {report.startDate}</span>}
                </div>
              ))}
            </div>
          </div>
        </Gridlet>

        {/* Row 3 */}
        {/* Celebrations Card */}
        <Gridlet title="Celebrations" icon="face-smile" minHeight={200}>
          <div className="home-celebrations-content">
            {celebrations.map(person => (
              <div key={person.id} className="home-celebration-item">
                <img src={person.avatar} alt={person.name} className="home-celebration-avatar" />
                <div className="home-celebration-text">
                  <span className="home-celebration-name">{person.name}</span>
                  <span className="home-celebration-event">{person.date} - {person.event}</span>
                </div>
                <button className="home-celebration-action">
                  <Icon name="ellipsis" size={16} />
                </button>
              </div>
            ))}
            <a href="#" className="home-full-calendar-link">Full Calendar</a>
          </div>
        </Gridlet>

        {/* Who's Out Card */}
        <Gridlet title="Who's Out" icon="plane" minHeight={200}>
          <div className="home-whos-out-content">
            <div className="home-whos-out-day">
              <span className="home-whos-out-label">Today</span>
              <span className="home-whos-out-status">Nobody requested time off for today</span>
            </div>
            <a href="#" className="home-full-calendar-link">Full Calendar</a>
          </div>
        </Gridlet>

        {/* Company Links Card */}
        <Gridlet title="Company Links" icon="link" minHeight={200}>
          <div className="home-company-links-content">
            {companyLinks.map(group => (
              <div key={group.category} className="home-links-group">
                <span className="home-links-category">{group.category}</span>
                {group.links.map(link => (
                  <a key={link} href="#" className="home-link-item">{link}</a>
                ))}
              </div>
            ))}
            <a href="#" className="home-more-links">12 more links...</a>
          </div>
        </Gridlet>

        {/* Row 4 */}
        {/* Incomplete Trainings Card */}
        <Gridlet title="Incomplete Trainings" icon="graduation-cap" minHeight={200}>
          <div className="home-trainings-content">
            {trainings.map(training => (
              <div key={training.id} className="home-training-item">
                <span className="home-training-name">{training.name}</span>
                <span className="home-training-count">
                  <Icon name="users" size={12} /> {training.employees} Employees
                </span>
              </div>
            ))}
            <a href="#" className="home-more-link">9 more trainings...</a>
          </div>
        </Gridlet>

        {/* Location Card */}
        <Gridlet title="Location" icon="location-dot" minHeight={200}>
          <div className="home-location-content">
            <div className="home-location-chart">
              <div className="home-donut-chart">
                <Icon name="location-dot" size={24} className="home-location-icon" />
                <span className="home-location-label">Location</span>
              </div>
            </div>
          </div>
        </Gridlet>

        {/* Onboarding Card */}
        <Gridlet title="Onboarding" icon="user-check" minHeight={200}>
          <div className="home-onboarding-content">
            <div className="home-onboarding-header">
              <button className="home-onboarding-filter">
                <Icon name="sliders" size={14} />
              </button>
              <button className="home-onboarding-expand">
                <Icon name="expand" size={14} />
              </button>
            </div>
            <div className="home-onboarding-empty">
              <Icon name="clipboard" size={40} className="home-onboarding-icon" />
              <span>No one is joining soon</span>
            </div>
          </div>
        </Gridlet>

        {/* Row 5 - Time Off Requests (Expandable) */}
        <div className={`home-time-off-requests ${timeOffExpanded ? 'expanded' : ''}`}>
          <Gridlet
            title="Time Off Requests"
            icon="calendar"
            minHeight={timeOffExpanded ? 500 : 200}
          >
            <div className="home-tor-content">
              {!timeOffExpanded ? (
                /* Collapsed View */
                <div className="home-tor-collapsed" onClick={() => setTimeOffExpanded(true)}>
                  <div className="home-tor-stat">
                    <Icon name="clock" size={40} className="home-tor-stat-icon" />
                    <span className="home-tor-stat-number">{urgentCount}</span>
                    <span className="home-tor-stat-label">Urgent Requests</span>
                  </div>
                  <div className="home-tor-divider" />
                  <div className="home-tor-stat">
                    <Icon name="calendar" size={40} className="home-tor-stat-icon other" />
                    <span className="home-tor-stat-number">0</span>
                    <span className="home-tor-stat-label">Other Requests</span>
                  </div>
                </div>
              ) : (
                /* Expanded View */
                <div className="home-tor-expanded">
                  <div className="home-tor-header">
                    <div className="home-tor-tabs">
                      <button
                        className={`home-tor-tab ${activeTimeOffTab === 'urgent' ? 'active' : ''}`}
                        onClick={() => setActiveTimeOffTab('urgent')}
                      >
                        <Icon name="clock" size={14} /> {urgentCount} Urgent
                      </button>
                      <button
                        className={`home-tor-tab ${activeTimeOffTab === 'other' ? 'active' : ''}`}
                        onClick={() => setActiveTimeOffTab('other')}
                      >
                        <Icon name="calendar" size={14} /> 0 Other Requests
                      </button>
                    </div>
                    <div className="home-tor-actions">
                      <button className="home-tor-filter-btn">
                        <Icon name="sliders" size={14} />
                      </button>
                      <button className="home-tor-collapse-btn" onClick={() => setTimeOffExpanded(false)}>
                        <Icon name="compress" size={14} />
                      </button>
                    </div>
                  </div>

                  <table className="home-tor-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Approver</th>
                        <th>Request</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeOffRequests.map(request => (
                        <tr key={request.id}>
                          <td>
                            <div className="home-tor-name-cell">
                              {request.urgent && <Icon name="circle-info" size={14} className="home-tor-urgent-icon" />}
                              <a href="#" className="home-tor-name-link">{request.name}</a>
                            </div>
                          </td>
                          <td>{request.approver}</td>
                          <td>{request.request}</td>
                          <td>{request.submitted}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="home-tor-footer">
                    <a href="#" className="home-tor-report-link">Time Off Balances Report</a>
                    <a href="#" className="home-tor-report-link">Time Off Schedule Report</a>
                    <a href="#" className="home-tor-report-link">Time Off Used Report</a>
                  </div>
                </div>
              )}
            </div>
          </Gridlet>
        </div>

        {/* Welcome Card */}
        <Gridlet title="Welcome" icon="sparkles" minHeight={200}>
          <div className="home-welcome-content">
            <div className="home-welcome-icon">
              <Icon name="sparkles" size={40} className="home-welcome-sparkle" />
            </div>
            <span className="home-welcome-title">Welcome 1 New Team Member!</span>
            <span className="home-welcome-date">Started Saturday, November 9, 2024</span>
            <div className="home-welcome-avatar">
              <Icon name="circle-user" size={48} className="home-welcome-user-icon" />
            </div>
          </div>
        </Gridlet>

        {/* People Without Pay Raise Card */}
        <Gridlet title="People Without a Pay Raise" icon="piggy-bank" minHeight={200}>
          <div className="home-pay-raise-content">
            <div className="home-pay-raise-stat">
              <Icon name="users" size={36} className="home-pay-raise-icon" />
              <span className="home-pay-raise-number">86</span>
            </div>
            <span className="home-pay-raise-label">Without Pay Raise</span>
            <span className="home-pay-raise-period">for 12+ Months</span>
          </div>
        </Gridlet>

        {/* Time Off Used Chart Card */}
        <Gridlet title="Time Off Used" icon="chart-simple" minHeight={200}>
          <div className="home-time-off-used-content">
            <select className="home-time-off-select">
              <option>Bereavement</option>
              <option>Vacation</option>
              <option>Sick</option>
            </select>
            <div className="home-time-off-chart">
              <div className="home-chart-placeholder">
                <div className="home-chart-line" />
                <div className="home-chart-labels">
                  <span>Nov</span>
                  <span>Feb</span>
                </div>
              </div>
            </div>
            <div className="home-chart-slider">
              <div className="home-slider-track">
                <div className="home-slider-handle start" />
                <div className="home-slider-handle end" />
              </div>
            </div>
          </div>
        </Gridlet>
      </div>
    </div>
  );
};

export default HomeContent;
