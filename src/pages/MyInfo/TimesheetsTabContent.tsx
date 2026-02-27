import { Icon, Button, IconButton } from '../../components';

interface TimesheetsTabContentProps {
  employeeName: string;
}

export function TimesheetsTabContent({ employeeName: _employeeName }: TimesheetsTabContentProps) {
  // Mock data for timesheets
  const timesheetData = {
    currentPeriod: {
      startDate: 'Feb 19, 2024',
      endDate: 'Mar 3, 2024',
      status: 'In Progress',
      totalHours: 64,
      targetHours: 80,
      overtime: 0,
    },
    weeklyEntries: [
      { day: 'Monday', date: 'Feb 19', hours: 8, project: 'Marketing Campaign Q1' },
      { day: 'Tuesday', date: 'Feb 20', hours: 8, project: 'Marketing Campaign Q1' },
      { day: 'Wednesday', date: 'Feb 21', hours: 8, project: 'Brand Refresh' },
      { day: 'Thursday', date: 'Feb 22', hours: 8, project: 'Marketing Campaign Q1' },
      { day: 'Friday', date: 'Feb 23', hours: 8, project: 'Team Meeting' },
      { day: 'Saturday', date: 'Feb 24', hours: 0, project: '-' },
      { day: 'Sunday', date: 'Feb 25', hours: 0, project: '-' },
    ],
    projects: [
      { name: 'Marketing Campaign Q1', hours: 32, percentage: 50 },
      { name: 'Brand Refresh', hours: 16, percentage: 25 },
      { name: 'Team Meetings', hours: 8, percentage: 12.5 },
      { name: 'Administrative', hours: 8, percentage: 12.5 },
    ],
    history: [
      {
        id: '1',
        period: 'Feb 5 - Feb 18, 2024',
        totalHours: 80,
        status: 'Approved',
        approvedBy: 'Lucy Samuels',
        approvedDate: 'Feb 19, 2024',
      },
      {
        id: '2',
        period: 'Jan 22 - Feb 4, 2024',
        totalHours: 80,
        status: 'Approved',
        approvedBy: 'Lucy Samuels',
        approvedDate: 'Feb 5, 2024',
      },
      {
        id: '3',
        period: 'Jan 8 - Jan 21, 2024',
        totalHours: 72,
        status: 'Approved',
        approvedBy: 'Lucy Samuels',
        approvedDate: 'Jan 22, 2024',
      },
    ],
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon name="clock" size={24} className="text-[var(--color-primary-strong)]" />
        <h2
          className="myinfo-section-title text-[26px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
        >
          Timesheets
        </h2>
        <Button variant="standard" icon="circle-plus" iconPosition="left" className="btn-desktop-only">
          Log Time
        </Button>
        <IconButton icon="plus" variant="outlined" size="small" label="Log Time" className="btn-mobile-only" />
      </div>

      {/* Current Pay Period Summary */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="calendar" size={16} className="text-blue-700" />
          </div>
          <div className="flex-1">
            <h3
              className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Current Pay Period
            </h3>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">
              {timesheetData.currentPeriod.startDate} - {timesheetData.currentPeriod.endDate}
            </p>
          </div>
          <span className={`inline-flex px-3 py-1 text-[13px] font-medium rounded-full ${getStatusBadgeClass(timesheetData.currentPeriod.status)}`}>
            {timesheetData.currentPeriod.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-center">
            <p className="text-[32px] font-bold text-[var(--color-primary-strong)]">
              {timesheetData.currentPeriod.totalHours}
            </p>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">Hours Logged</p>
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-center">
            <p className="text-[32px] font-bold text-[var(--text-neutral-strong)]">
              {timesheetData.currentPeriod.targetHours}
            </p>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">Target Hours</p>
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-center">
            <p className="text-[32px] font-bold text-[var(--text-neutral-strong)]">
              {timesheetData.currentPeriod.overtime}
            </p>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">Overtime</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-[13px] text-[var(--text-neutral-medium)] mb-1">
            <span>Progress</span>
            <span>{Math.round((timesheetData.currentPeriod.totalHours / timesheetData.currentPeriod.targetHours) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[var(--color-primary-strong)] h-2 rounded-full"
              style={{ width: `${(timesheetData.currentPeriod.totalHours / timesheetData.currentPeriod.targetHours) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hours by Project */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="chart-pie-simple" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Hours by Project
          </h3>
        </div>

        <div className="space-y-4">
          {timesheetData.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between text-[14px] mb-1">
                <span className="text-[var(--text-neutral-strong)]">{project.name}</span>
                <span className="text-[var(--text-neutral-medium)]">{project.hours} hrs ({project.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[var(--color-primary-strong)] h-2 rounded-full"
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Time Entries */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="table-cells" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            This Week
          </h3>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Day
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Hours
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Project
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {timesheetData.weeklyEntries.map((entry, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)] font-medium">
                    {entry.day}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {entry.date}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {entry.hours > 0 ? `${entry.hours} hrs` : '-'}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-medium)]">
                    {entry.project}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timesheet History */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="clock" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            History
          </h3>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Pay Period
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Total Hours
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Approved By
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Approved Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {timesheetData.history.map((entry) => (
                <tr key={entry.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {entry.period}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {entry.totalHours} hrs
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {entry.approvedBy}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-medium)]">
                    {entry.approvedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TimesheetsTabContent;
