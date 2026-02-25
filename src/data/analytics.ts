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
