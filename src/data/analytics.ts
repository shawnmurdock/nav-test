export interface FavoriteReport {
  id: number;
  title: string;
  icon: 'chart-simple' | 'chart-line' | 'calendar-days';
}

export interface RecentReport {
  id: number;
  name: string;
  owner: string;
  lastViewed: string;
  icon: 'chart' | 'users' | 'document';
}

export const favoriteReports: FavoriteReport[] = [
  {
    id: 1,
    title: 'Headcount',
    icon: 'chart-simple',
  },
  {
    id: 2,
    title: 'Employee Turnover',
    icon: 'chart-simple',
  },
  {
    id: 3,
    title: 'Additions & Terminations',
    icon: 'chart-line',
  },
  {
    id: 4,
    title: 'Time Off Used',
    icon: 'calendar-days',
  },
];

export const recentReports: RecentReport[] = [
  {
    id: 1,
    name: 'Pay by Location',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 2,
    name: 'Age Profile',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 3,
    name: 'Audit Trail',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 4,
    name: 'EEO-1',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'users',
  },
  {
    id: 5,
    name: 'ACA Benefit History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 6,
    name: 'Missing Data',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 7,
    name: 'Birthdays',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 8,
    name: 'Pay by Department',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 9,
    name: 'Employment Status History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 10,
    name: 'Change History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 11,
    name: 'EEO Details',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'users',
  },
  {
    id: 12,
    name: 'Benefit Summary',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 13,
    name: 'Pay by Job Title',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 14,
    name: 'Point-In-Time',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 15,
    name: '2-Step Login Configuration',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 16,
    name: 'ACA Monthly Totals',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
];

export const suggestionQuestions = [
  'What are the key factors of turnover?',
  'Do an analysis of compensation equity',
  'How happy are employees?',
  'What important trends should be aware of?',
];

// =============================================================================
// CATEGORY-SPECIFIC REPORTS DATA
// =============================================================================

export interface CategoryReport {
  id: number;
  name: string;
  description: string;
  owner: string;
  lastModified: string;
  runCount: number;
}

// General Reports
export const generalReports: CategoryReport[] = [
  { id: 1, name: 'Employee Census', description: 'Complete demographic breakdown of workforce', owner: 'System', lastModified: 'Today', runCount: 312 },
  { id: 2, name: 'Department Roster', description: 'Employee listing by department', owner: 'HR Admin', lastModified: 'Today', runCount: 198 },
  { id: 3, name: 'Anniversary Report', description: 'Upcoming work anniversaries', owner: 'System', lastModified: 'Yesterday', runCount: 145 },
  { id: 4, name: 'Birthday Calendar', description: 'Employee birthdays by month', owner: 'System', lastModified: 'Feb 24, 2026', runCount: 89 },
  { id: 5, name: 'Emergency Contacts', description: 'Employee emergency contact information', owner: 'HR Admin', lastModified: 'Feb 23, 2026', runCount: 67 },
  { id: 6, name: 'Org Chart Data', description: 'Reporting structure and hierarchy', owner: 'System', lastModified: 'Feb 22, 2026', runCount: 234 },
];

// Compliance Reports
export const complianceReports: CategoryReport[] = [
  { id: 1, name: 'EEO-1 Report', description: 'Equal Employment Opportunity reporting', owner: 'System', lastModified: 'Today', runCount: 45 },
  { id: 2, name: 'I-9 Verification Status', description: 'Employment eligibility verification', owner: 'HR Admin', lastModified: 'Today', runCount: 78 },
  { id: 3, name: 'OSHA 300 Log', description: 'Workplace injury and illness records', owner: 'Safety Officer', lastModified: 'Yesterday', runCount: 23 },
  { id: 4, name: 'ACA Compliance', description: 'Affordable Care Act reporting', owner: 'Benefits Admin', lastModified: 'Feb 24, 2026', runCount: 56 },
  { id: 5, name: 'VETS-4212 Report', description: 'Veterans employment report', owner: 'System', lastModified: 'Feb 20, 2026', runCount: 12 },
  { id: 6, name: 'Audit Trail', description: 'System changes and access log', owner: 'System', lastModified: 'Feb 19, 2026', runCount: 189 },
  { id: 7, name: 'Policy Acknowledgment', description: 'Employee policy sign-off status', owner: 'HR Admin', lastModified: 'Feb 18, 2026', runCount: 134 },
];

// Payroll Reports
export const payrollReports: CategoryReport[] = [
  { id: 1, name: 'Payroll Register', description: 'Complete payroll transaction history', owner: 'Payroll Admin', lastModified: 'Today', runCount: 456 },
  { id: 2, name: 'Tax Withholding Summary', description: 'Federal and state tax withholdings', owner: 'Payroll Admin', lastModified: 'Today', runCount: 234 },
  { id: 3, name: 'Deductions Report', description: 'All payroll deductions by employee', owner: 'Payroll Admin', lastModified: 'Yesterday', runCount: 178 },
  { id: 4, name: 'Gross to Net', description: 'Earnings breakdown from gross to net', owner: 'System', lastModified: 'Feb 24, 2026', runCount: 312 },
  { id: 5, name: 'W-2 Preview', description: 'Year-end W-2 form preview', owner: 'Payroll Admin', lastModified: 'Feb 23, 2026', runCount: 89 },
  { id: 6, name: 'Labor Distribution', description: 'Payroll costs by department/project', owner: 'Finance', lastModified: 'Feb 22, 2026', runCount: 145 },
  { id: 7, name: 'Overtime Analysis', description: 'Overtime hours and costs by employee', owner: 'Payroll Admin', lastModified: 'Feb 21, 2026', runCount: 98 },
];

// Compensation Reports
export const compensationReports: CategoryReport[] = [
  { id: 1, name: 'Salary by Department', description: 'Average salary breakdown by department', owner: 'Compensation Mgr', lastModified: 'Today', runCount: 167 },
  { id: 2, name: 'Pay Equity Analysis', description: 'Compensation equity across demographics', owner: 'HR Director', lastModified: 'Today', runCount: 89 },
  { id: 3, name: 'Compa-Ratio Report', description: 'Employee pay vs market midpoint', owner: 'Compensation Mgr', lastModified: 'Yesterday', runCount: 134 },
  { id: 4, name: 'Salary Range Positioning', description: 'Where employees fall in pay ranges', owner: 'Compensation Mgr', lastModified: 'Feb 24, 2026', runCount: 112 },
  { id: 5, name: 'Merit Increase History', description: 'Historical merit increase data', owner: 'HR Admin', lastModified: 'Feb 23, 2026', runCount: 78 },
  { id: 6, name: 'Bonus Summary', description: 'Bonus payments by employee and period', owner: 'Compensation Mgr', lastModified: 'Feb 22, 2026', runCount: 56 },
  { id: 7, name: 'Total Compensation Statement', description: 'Full compensation package breakdown', owner: 'System', lastModified: 'Feb 21, 2026', runCount: 234 },
];

// Time & Attendance Reports
export const timeAttendanceReports: CategoryReport[] = [
  { id: 1, name: 'Timesheet Summary', description: 'Hours worked by employee and period', owner: 'System', lastModified: 'Today', runCount: 567 },
  { id: 2, name: 'Attendance Tracking', description: 'Attendance patterns and absences', owner: 'HR Admin', lastModified: 'Today', runCount: 345 },
  { id: 3, name: 'Time Off Requests', description: 'PTO requests and approval status', owner: 'System', lastModified: 'Yesterday', runCount: 289 },
  { id: 4, name: 'Overtime Report', description: 'Overtime hours by department', owner: 'Payroll Admin', lastModified: 'Feb 24, 2026', runCount: 178 },
  { id: 5, name: 'Accrual Balances', description: 'Current PTO accrual balances', owner: 'System', lastModified: 'Feb 23, 2026', runCount: 423 },
  { id: 6, name: 'Schedule Compliance', description: 'Adherence to scheduled shifts', owner: 'Operations Mgr', lastModified: 'Feb 22, 2026', runCount: 156 },
  { id: 7, name: 'Tardiness Report', description: 'Late arrivals by employee', owner: 'HR Admin', lastModified: 'Feb 21, 2026', runCount: 89 },
];

// Benefits Reports
export const benefitsReports: CategoryReport[] = [
  { id: 1, name: 'Enrollment Summary', description: 'Current benefits enrollment by plan', owner: 'Benefits Admin', lastModified: 'Today', runCount: 198 },
  { id: 2, name: 'Dependent Coverage', description: 'Employees with dependent coverage', owner: 'Benefits Admin', lastModified: 'Today', runCount: 145 },
  { id: 3, name: '401(k) Participation', description: 'Retirement plan participation rates', owner: 'Benefits Admin', lastModified: 'Yesterday', runCount: 167 },
  { id: 4, name: 'HSA/FSA Balances', description: 'Health savings account balances', owner: 'Benefits Admin', lastModified: 'Feb 24, 2026', runCount: 134 },
  { id: 5, name: 'COBRA Tracking', description: 'COBRA continuation coverage status', owner: 'Benefits Admin', lastModified: 'Feb 23, 2026', runCount: 34 },
  { id: 6, name: 'Life Insurance Coverage', description: 'Life insurance elections summary', owner: 'Benefits Admin', lastModified: 'Feb 22, 2026', runCount: 89 },
  { id: 7, name: 'Benefits Cost Analysis', description: 'Employer benefits cost breakdown', owner: 'Finance', lastModified: 'Feb 21, 2026', runCount: 78 },
];

// Training Reports
export const trainingReports: CategoryReport[] = [
  { id: 1, name: 'Training Completion', description: 'Course completion rates by employee', owner: 'L&D Manager', lastModified: 'Today', runCount: 234 },
  { id: 2, name: 'Certification Status', description: 'Required certifications and expiry', owner: 'L&D Manager', lastModified: 'Today', runCount: 189 },
  { id: 3, name: 'Learning Hours', description: 'Training hours logged by employee', owner: 'L&D Manager', lastModified: 'Yesterday', runCount: 156 },
  { id: 4, name: 'Compliance Training', description: 'Required compliance training status', owner: 'HR Admin', lastModified: 'Feb 24, 2026', runCount: 278 },
  { id: 5, name: 'Skills Inventory', description: 'Employee skills and competencies', owner: 'L&D Manager', lastModified: 'Feb 23, 2026', runCount: 112 },
  { id: 6, name: 'Training Cost Report', description: 'Training expenditure by department', owner: 'Finance', lastModified: 'Feb 22, 2026', runCount: 67 },
  { id: 7, name: 'New Hire Training', description: 'Onboarding training completion', owner: 'L&D Manager', lastModified: 'Feb 21, 2026', runCount: 145 },
];

// Performance Reports
export const performanceReports: CategoryReport[] = [
  { id: 1, name: 'Review Completion', description: 'Performance review completion status', owner: 'HR Manager', lastModified: 'Today', runCount: 198 },
  { id: 2, name: 'Rating Distribution', description: 'Performance ratings across org', owner: 'HR Director', lastModified: 'Today', runCount: 156 },
  { id: 3, name: 'Goal Progress', description: 'Employee goal completion tracking', owner: 'HR Manager', lastModified: 'Yesterday', runCount: 234 },
  { id: 4, name: 'eNPS Results', description: 'Employee Net Promoter Score trends', owner: 'HR Director', lastModified: 'Feb 24, 2026', runCount: 89 },
  { id: 5, name: 'Engagement Survey', description: 'Employee engagement survey results', owner: 'HR Director', lastModified: 'Feb 23, 2026', runCount: 145 },
  { id: 6, name: '360 Feedback Summary', description: 'Multi-rater feedback overview', owner: 'HR Manager', lastModified: 'Feb 22, 2026', runCount: 78 },
  { id: 7, name: 'Recognition Report', description: 'Employee recognition activity', owner: 'HR Admin', lastModified: 'Feb 21, 2026', runCount: 167 },
];

// Hiring Reports
export const hiringReports: CategoryReport[] = [
  { id: 1, name: 'Applicant Pipeline', description: 'Candidates by stage in hiring process', owner: 'Recruiting Mgr', lastModified: 'Today', runCount: 345 },
  { id: 2, name: 'Time to Fill', description: 'Average days to fill open positions', owner: 'Recruiting Mgr', lastModified: 'Today', runCount: 234 },
  { id: 3, name: 'Source Effectiveness', description: 'Candidate sources and quality', owner: 'Recruiting Mgr', lastModified: 'Yesterday', runCount: 189 },
  { id: 4, name: 'Offer Acceptance Rate', description: 'Offer extended vs accepted', owner: 'Recruiting Mgr', lastModified: 'Feb 24, 2026', runCount: 156 },
  { id: 5, name: 'Cost per Hire', description: 'Recruiting costs by position', owner: 'HR Director', lastModified: 'Feb 23, 2026', runCount: 78 },
  { id: 6, name: 'Requisition Status', description: 'Open positions and status', owner: 'Recruiting Mgr', lastModified: 'Feb 22, 2026', runCount: 267 },
  { id: 7, name: 'New Hire Report', description: 'Recent hires and start dates', owner: 'HR Admin', lastModified: 'Feb 21, 2026', runCount: 198 },
  { id: 8, name: 'Interview Activity', description: 'Interviews scheduled and completed', owner: 'Recruiting Mgr', lastModified: 'Feb 20, 2026', runCount: 145 },
];

// Custom Reports
export const customReports: CategoryReport[] = [
  { id: 1, name: 'Q1 Headcount Analysis', description: 'Custom quarterly headcount report', owner: 'Janet Parker', lastModified: 'Feb 15, 2026', runCount: 23 },
  { id: 2, name: 'Marketing Team Metrics', description: 'Department-specific HR metrics', owner: 'Marketing Dir', lastModified: 'Feb 10, 2026', runCount: 45 },
  { id: 3, name: 'Remote Work Summary', description: 'Work location and remote status', owner: 'HR Admin', lastModified: 'Feb 8, 2026', runCount: 67 },
  { id: 4, name: 'Tenure Analysis', description: 'Employee tenure distribution', owner: 'HR Director', lastModified: 'Feb 5, 2026', runCount: 34 },
  { id: 5, name: 'Skills Gap Report', description: 'Custom skills analysis by team', owner: 'L&D Manager', lastModified: 'Feb 1, 2026', runCount: 12 },
];

// Map category ID to report data
export const reportsByCategory: Record<string, CategoryReport[]> = {
  'general': generalReports,
  'compliance': complianceReports,
  'payroll': payrollReports,
  'compensation': compensationReports,
  'time-attendance': timeAttendanceReports,
  'benefits': benefitsReports,
  'training': trainingReports,
  'performance': performanceReports,
  'hiring': hiringReports,
  'custom': customReports,
};
