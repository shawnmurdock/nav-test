import { Icon, Button } from '../../components';

interface TrainingTabContentProps {
  employeeName: string;
}

export function TrainingTabContent({ employeeName: _employeeName }: TrainingTabContentProps) {
  // Mock data for training
  const trainingData = {
    learningPath: {
      name: 'Marketing Professional Development',
      progress: 65,
      completedCourses: 8,
      totalCourses: 12,
      nextDue: 'Data Analytics Fundamentals',
      nextDueDate: 'Mar 15, 2024',
    },
    requiredTraining: [
      {
        id: '1',
        name: 'Annual Security Awareness',
        category: 'Compliance',
        dueDate: 'Mar 31, 2024',
        duration: '45 min',
        status: 'Not Started',
      },
      {
        id: '2',
        name: 'Workplace Harassment Prevention',
        category: 'Compliance',
        dueDate: 'Apr 15, 2024',
        duration: '60 min',
        status: 'Not Started',
      },
      {
        id: '3',
        name: 'Data Privacy & GDPR',
        category: 'Compliance',
        dueDate: 'Apr 30, 2024',
        duration: '30 min',
        status: 'In Progress',
        progress: 40,
      },
    ],
    completedTraining: [
      {
        id: '1',
        name: 'New Employee Onboarding',
        category: 'Onboarding',
        completedDate: 'Jan 20, 2020',
        score: '95%',
      },
      {
        id: '2',
        name: 'Marketing Tools Overview',
        category: 'Skills',
        completedDate: 'Feb 5, 2020',
        score: '88%',
      },
      {
        id: '3',
        name: 'Leadership Fundamentals',
        category: 'Development',
        completedDate: 'Jun 15, 2022',
        score: '92%',
      },
      {
        id: '4',
        name: 'Project Management Basics',
        category: 'Skills',
        completedDate: 'Sep 10, 2023',
        score: '90%',
      },
      {
        id: '5',
        name: 'Annual Security Awareness 2023',
        category: 'Compliance',
        completedDate: 'Dec 1, 2023',
        score: '100%',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'Google Analytics Certified',
        issuer: 'Google',
        earnedDate: 'Mar 2022',
        expiryDate: 'Mar 2025',
        status: 'Active',
      },
      {
        id: '2',
        name: 'HubSpot Inbound Marketing',
        issuer: 'HubSpot',
        earnedDate: 'Jun 2023',
        expiryDate: 'Jun 2025',
        status: 'Active',
      },
      {
        id: '3',
        name: 'Meta Blueprint Certification',
        issuer: 'Meta',
        earnedDate: 'Jan 2023',
        expiryDate: 'Jan 2024',
        status: 'Expired',
      },
    ],
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon name="graduation-cap" size={24} className="text-[var(--color-primary-strong)]" />
        <h2
          className="myinfo-section-title text-[26px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
        >
          Training
        </h2>
      </div>

      {/* Learning Path Progress */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="file-lines" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex-1">
            <h3
              className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Learning Path
            </h3>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">
              {trainingData.learningPath.name}
            </p>
          </div>
        </div>

        <div className="learning-path-cards flex gap-4 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-center flex-shrink-0 min-w-[140px]">
            <p className="text-[32px] font-bold text-[var(--color-primary-strong)]">
              {trainingData.learningPath.progress}%
            </p>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">Complete</p>
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-center flex-shrink-0 min-w-[140px]">
            <p className="text-[32px] font-bold text-[var(--text-neutral-strong)]">
              {trainingData.learningPath.completedCourses}/{trainingData.learningPath.totalCourses}
            </p>
            <p className="text-[14px] text-[var(--text-neutral-medium)]">Courses</p>
          </div>
          <div className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 flex-shrink-0 min-w-[160px]">
            <p className="text-[14px] font-medium text-[var(--text-neutral-strong)] mb-1">
              Next Up
            </p>
            <p className="text-[15px] text-[var(--color-primary-strong)]">
              {trainingData.learningPath.nextDue}
            </p>
            <p className="text-[13px] text-[var(--text-neutral-medium)]">
              Due {trainingData.learningPath.nextDueDate}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[var(--color-primary-strong)] h-3 rounded-full"
              style={{ width: `${trainingData.learningPath.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Required Training */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="bell" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Required Training
          </h3>
        </div>

        <div className="space-y-4">
          {trainingData.requiredTraining.map((training) => (
            <div
              key={training.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-x-small)] gap-3"
            >
              <div className="flex-1">
                  <p className="text-[15px] font-medium text-[var(--text-neutral-strong)]">
                    {training.name}
                  </p>
                  <p className="text-[13px] text-[var(--text-neutral-medium)]">
                    {training.category} - {training.duration} - Due {training.dueDate}
                  </p>
                  {training.progress !== undefined && (
                    <div className="mt-2 w-48">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[var(--color-primary-strong)] h-1.5 rounded-full"
                          style={{ width: `${training.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-2 md:hidden">
                    <span className={`inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(training.status)}`}>
                      {training.status}
                    </span>
                  </div>
                </div>
              <div className="flex items-center gap-3">
                <span className={`hidden md:inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(training.status)}`}>
                  {training.status}
                </span>
                <Button variant="standard" size="small">
                  {training.status === 'In Progress' ? 'Continue' : 'Start'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Training */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="check" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Completed Training
          </h3>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Training Name
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Completed Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {trainingData.completedTraining.map((training) => (
                <tr key={training.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {training.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {training.category}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {training.completedDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] font-medium text-green-600">
                    {training.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="star" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Certifications
          </h3>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Certification
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Issuer
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Earned
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Expires
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {trainingData.certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)] font-medium">
                    {cert.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {cert.issuer}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {cert.earnedDate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {cert.expiryDate}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-[13px] font-medium rounded ${getStatusBadgeClass(cert.status)}`}>
                      {cert.status}
                    </span>
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

export default TrainingTabContent;
