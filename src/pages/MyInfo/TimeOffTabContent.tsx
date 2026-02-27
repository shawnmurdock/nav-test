import { Icon, Button, IconButton } from '../../components';

interface TimeOffTabContentProps {
  employeeName: string;
}

export function TimeOffTabContent({ employeeName: _employeeName }: TimeOffTabContentProps) {
  // Mock data for time off balances and requests
  const timeOffData = {
    balances: [
      { type: 'Vacation', available: 80, used: 40, accrued: 120, unit: 'hours' },
      { type: 'Sick Leave', available: 32, used: 8, accrued: 40, unit: 'hours' },
      { type: 'Personal Days', available: 16, used: 8, accrued: 24, unit: 'hours' },
      { type: 'Floating Holiday', available: 8, used: 0, accrued: 8, unit: 'hours' },
    ],
    upcomingRequests: [
      {
        id: '1',
        type: 'Vacation',
        startDate: 'Mar 15, 2024',
        endDate: 'Mar 22, 2024',
        hours: 40,
        status: 'Approved',
        approver: 'Lucy Samuels',
        notes: 'Spring break family trip',
      },
      {
        id: '2',
        type: 'Personal Day',
        startDate: 'Apr 5, 2024',
        endDate: 'Apr 5, 2024',
        hours: 8,
        status: 'Pending',
        approver: 'Lucy Samuels',
        notes: 'Doctor appointment',
      },
    ],
    pastRequests: [
      {
        id: '3',
        type: 'Vacation',
        startDate: 'Dec 23, 2023',
        endDate: 'Jan 2, 2024',
        hours: 48,
        status: 'Approved',
        approver: 'Lucy Samuels',
        notes: 'Holiday vacation',
      },
      {
        id: '4',
        type: 'Sick Leave',
        startDate: 'Feb 12, 2024',
        endDate: 'Feb 13, 2024',
        hours: 16,
        status: 'Approved',
        approver: 'Lucy Samuels',
        notes: 'Flu recovery',
      },
      {
        id: '5',
        type: 'Vacation',
        startDate: 'Jan 15, 2024',
        endDate: 'Jan 16, 2024',
        hours: 16,
        status: 'Approved',
        approver: 'Lucy Samuels',
        notes: 'Long weekend',
      },
      {
        id: '6',
        type: 'Personal Day',
        startDate: 'Feb 2, 2024',
        endDate: 'Feb 2, 2024',
        hours: 8,
        status: 'Approved',
        approver: 'Lucy Samuels',
        notes: 'Moving day',
      },
    ],
    holidays: [
      { name: 'Memorial Day', date: 'May 27, 2024' },
      { name: 'Independence Day', date: 'Jul 4, 2024' },
      { name: 'Labor Day', date: 'Sep 2, 2024' },
      { name: 'Thanksgiving', date: 'Nov 28, 2024' },
      { name: 'Christmas Day', date: 'Dec 25, 2024' },
    ],
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="calendar" size={24} className="text-[var(--color-primary-strong)]" />
          <h2
            className="text-[26px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
          >
            Time Off
          </h2>
        </div>
        <Button variant="standard" icon="circle-plus" iconPosition="left" className="btn-desktop-only">
          Request Time Off
        </Button>
        <IconButton icon="plus" variant="outlined" size="small" label="Request Time Off" className="btn-mobile-only" />
      </div>

      {/* Time Off Balances */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="chart-pie-simple" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Current Balances
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {timeOffData.balances.map((balance, index) => (
            <div
              key={index}
              className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4"
            >
              <h4 className="text-[15px] font-semibold text-[var(--text-neutral-strong)] mb-3">
                {balance.type}
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--text-neutral-medium)]">Available</span>
                  <span className="text-[14px] font-semibold text-[var(--color-primary-strong)]">
                    {balance.available} {balance.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--text-neutral-medium)]">Used</span>
                  <span className="text-[14px] text-[var(--text-neutral-strong)]">
                    {balance.used} {balance.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-[var(--text-neutral-medium)]">Accrued YTD</span>
                  <span className="text-[14px] text-[var(--text-neutral-strong)]">
                    {balance.accrued} {balance.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Time Off Requests */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="calendar-days" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Upcoming Requests
            </h3>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Hours
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Approver
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {timeOffData.upcomingRequests.map((request) => (
                <tr key={request.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.type}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.startDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.endDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.hours}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {request.approver}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-medium)]">
                    {request.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Past Time Off Requests */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="rotate-left" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Request History
            </h3>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Hours
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Approver
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {timeOffData.pastRequests.map((request) => (
                <tr key={request.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.type}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.startDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.endDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {request.hours}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {request.approver}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-medium)]">
                    {request.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Holidays */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="calendar" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Upcoming Company Holidays
            </h3>
          </div>
        </div>

        <div>
          <table className="w-full max-w-[500px]">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Holiday
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {timeOffData.holidays.map((holiday, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {holiday.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {holiday.date}
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

export default TimeOffTabContent;
