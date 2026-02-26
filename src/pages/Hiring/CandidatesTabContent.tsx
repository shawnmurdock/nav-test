import { useState } from 'react';
import { Icon, StarRating, MobilePageSelect } from '../../components';
import { useBreakpoint } from '../../hooks';
import { candidates } from '../../data/candidates';

export function CandidatesTabContent() {
  const breakpoint = useBreakpoint();
  const isMobile = !breakpoint.isLaptopOrAbove;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('still-in-running');
  const [selectedFilter, setSelectedFilter] = useState('job-statuses');

  const statusOptions = [
    { value: 'still-in-running', label: 'Still in the Running' },
    { value: 'all', label: 'All Candidates' },
    { value: 'reviewed', label: 'Reviewed' },
  ];

  const filterSections = [
    { id: 'job-statuses', label: '2 Job Statuses', hasActive: true },
    { id: 'job-openings', label: 'Job Openings', hasActive: false },
    { id: 'candidate-statuses', label: 'Candidate Statuses', hasActive: false },
    { id: 'star-rating', label: 'Star Rating', hasActive: false },
    { id: 'application-dates', label: 'Application Dates', hasActive: false },
    { id: 'job-locations', label: 'Job Locations', hasActive: false },
    { id: 'hiring-leads', label: 'Hiring Leads', hasActive: false },
  ];

  const filterSelectOptions = filterSections.map(section => ({
    value: section.id,
    label: section.label,
  }));

  const toggleFilter = (filterId: string) => {
    // Filter toggle functionality preserved for desktop sidebar
    console.log('Toggle filter:', filterId);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Search Input - Full Width */}
      <div className="relative">
        <Icon
          name="magnifying-glass"
          size={20}
          className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[var(--text-neutral-strong)]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isMobile ? "Search candidates..." : "Search by keywords, name, location, etc."}
          className="w-full h-[44px] md:h-[48px] pl-11 md:pl-[52px] pr-4 md:pr-5 text-[15px] md:text-[16px] leading-[24px] border border-[var(--border-neutral-medium)] rounded-full bg-[var(--surface-neutral-white)] placeholder:text-[var(--text-neutral-weak)] focus:outline-none focus:border-[var(--color-primary-strong)]"
        />
      </div>

      {/* Mobile Filters - Above Content */}
      {isMobile && (
        <div className="flex flex-col gap-3">
          {/* Status Filter */}
          <MobilePageSelect
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />

          {/* Filter By Select */}
          <MobilePageSelect
            options={filterSelectOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>
      )}

      {/* Main Content Area - Filters + Table/Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Left Sidebar - Filters (Desktop Only) */}
        {!isMobile && (
          <div className="w-[264px] flex-shrink-0">
            {/* Status Filter Dropdown */}
            <div className="mb-3">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full h-10 px-4 pr-10 text-[15px] border border-[var(--border-neutral-medium)] rounded-full bg-[var(--surface-neutral-white)] appearance-none focus:outline-none focus:border-[var(--color-primary-strong)] cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Icon
                  name="caret-down"
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-neutral-strong)] pointer-events-none"
                />
              </div>
            </div>

            {/* Save Filter / Reset Buttons */}
            <div className="flex items-center gap-4 mb-4 text-[13px]">
              <button className="flex items-center gap-2 text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-strong)] transition-colors">
                <Icon name="star" size={12} className="text-[var(--text-neutral-strong)]" />
                <span className="font-medium">Save Filter</span>
              </button>
              <button className="flex items-center gap-2 text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-strong)] transition-colors">
                <Icon name="circle-x" size={12} className="text-[var(--text-neutral-strong)]" />
                <span className="font-medium">Reset</span>
              </button>
            </div>

            {/* Filter Results Panel */}
            <div className="flex flex-col">
              {/* Filter Results Header */}
              <div className="bg-[var(--color-primary-strong)] rounded-lg px-4 py-3 mb-0">
                <h3 className="text-[15px] font-bold text-white">Filter Results</h3>
              </div>

              {/* Filter Sections */}
              {filterSections.map((section) => (
                <div key={section.id} className="relative">
                  <button
                    onClick={() => toggleFilter(section.id)}
                    className="w-full h-[46px] flex items-center gap-2 px-5 hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                  >
                    <Icon
                      name="chevron-right"
                      size={16}
                      className={
                        section.hasActive
                          ? 'text-[var(--color-primary-strong)]'
                          : 'text-[var(--text-neutral-x-strong)]'
                      }
                    />
                    <span
                      className={`text-[15px] flex-1 text-left ${
                        section.hasActive
                          ? 'font-semibold text-[var(--color-primary-strong)]'
                          : 'font-medium text-[var(--text-neutral-x-strong)]'
                      }`}
                    >
                      {section.label}
                    </span>
                    {section.hasActive && (
                      <Icon name="circle-x" size={12} className="text-[var(--text-neutral-medium)]" />
                    )}
                  </button>
                  {/* Divider */}
                  <div className="absolute bottom-0 left-[21px] right-0 h-px bg-[var(--border-neutral-x-weak)]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content - Candidates Table */}
        <div className="flex-1">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] shadow-[2px_2px_0px_2px_rgba(56,49,47,0.05)] overflow-hidden">
            {/* Header */}
            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-[var(--border-neutral-x-weak)]">
              <h2
                className="text-[20px] md:text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                {candidates.length} Candidates
              </h2>
            </div>

            {/* Table with horizontal scroll */}
            <div
              className="candidates-table-scroll overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-[var(--surface-neutral-xx-weak)]">
                    <th className="px-4 md:px-[26px] py-[13px] text-left text-[14px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-tl-lg rounded-bl-lg whitespace-nowrap">
                      Candidate Info
                    </th>
                    <th className="px-4 py-[13px] text-left text-[14px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                      Job Opening
                    </th>
                    <th className="px-4 py-[13px] text-left text-[14px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-[13px] text-left text-[14px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                      Rating
                    </th>
                    <th className="px-4 py-[13px] text-left text-[14px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-tr-lg rounded-br-lg whitespace-nowrap">
                      Last Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-t border-[var(--border-neutral-x-weak)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                    >
                      {/* Candidate Info */}
                      <td className="px-4 md:px-[26px] py-4">
                        <div className="flex flex-col gap-[2px]">
                          <a
                            href="#"
                            className="text-[14px] md:text-[15px] font-medium text-[#0b4fd1] hover:underline whitespace-nowrap"
                            onClick={(e) => e.preventDefault()}
                          >
                            {candidate.name}
                          </a>
                          <div className="text-[12px] md:text-[13px] text-[var(--text-neutral-medium)] leading-[19px]">
                            <div>{candidate.location}</div>
                            <div>{candidate.phone}</div>
                          </div>
                        </div>
                      </td>

                      {/* Job Opening */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-[2px]">
                          <a
                            href="#"
                            className="text-[14px] md:text-[15px] font-medium text-[#0b4fd1] hover:underline whitespace-nowrap"
                            onClick={(e) => e.preventDefault()}
                          >
                            {candidate.jobTitle}
                          </a>
                          <span className="text-[12px] md:text-[13px] text-[var(--text-neutral-medium)] leading-[19px] whitespace-nowrap">
                            {candidate.jobLocation}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-[2px]">
                          <span className="text-[14px] md:text-[15px] text-[var(--text-neutral-x-strong)] leading-[22px] whitespace-nowrap">
                            {candidate.status}
                          </span>
                          <span className="text-[12px] md:text-[13px] text-[var(--text-neutral-medium)] leading-[19px] whitespace-nowrap">
                            {candidate.statusTimestamp}
                          </span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-4">
                        <StarRating rating={candidate.rating} />
                      </td>

                      {/* Last Email */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-[2px]">
                          <span className="text-[14px] md:text-[15px] text-[var(--text-neutral-x-strong)] leading-[22px] whitespace-nowrap">
                            {candidate.lastEmail}
                          </span>
                          <span className="text-[12px] md:text-[13px] text-[var(--text-neutral-medium)] leading-[19px] whitespace-nowrap">
                            {candidate.lastEmailTimestamp}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesTabContent;
