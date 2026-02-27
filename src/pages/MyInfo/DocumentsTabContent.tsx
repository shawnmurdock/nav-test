import { Icon, Button, IconButton } from '../../components';

interface DocumentsTabContentProps {
  employeeName: string;
}

export function DocumentsTabContent({ employeeName: _employeeName }: DocumentsTabContentProps) {
  // Mock data for documents
  const documentsData = {
    signatureRequests: [
      {
        id: '1',
        title: 'W-4 (2024)',
        description: 'Federal Tax Withholding Form',
        requestedDate: 'Feb 15, 2024',
        status: 'Pending Signature',
      },
      {
        id: '2',
        title: 'Direct Deposit Authorization',
        description: 'Banking information update',
        requestedDate: 'Feb 10, 2024',
        status: 'Pending Signature',
      },
    ],
    personalDocuments: [
      {
        id: '1',
        name: 'Offer Letter.pdf',
        category: 'Employment',
        uploadDate: 'Jan 15, 2020',
        size: '245 KB',
      },
      {
        id: '2',
        name: 'Employment Contract.pdf',
        category: 'Employment',
        uploadDate: 'Jan 15, 2020',
        size: '512 KB',
      },
      {
        id: '3',
        name: 'Benefits Enrollment.pdf',
        category: 'Benefits',
        uploadDate: 'Feb 1, 2024',
        size: '189 KB',
      },
      {
        id: '4',
        name: 'Performance Review 2023.pdf',
        category: 'Performance',
        uploadDate: 'Dec 15, 2023',
        size: '156 KB',
      },
    ],
    companyDocuments: [
      {
        id: '1',
        name: 'Employee Handbook 2024',
        category: 'Policies',
        lastUpdated: 'Jan 1, 2024',
      },
      {
        id: '2',
        name: 'Code of Conduct',
        category: 'Policies',
        lastUpdated: 'Jan 1, 2024',
      },
      {
        id: '3',
        name: 'Benefits Guide 2024',
        category: 'Benefits',
        lastUpdated: 'Jan 1, 2024',
      },
      {
        id: '4',
        name: 'IT Security Policy',
        category: 'IT',
        lastUpdated: 'Mar 15, 2023',
      },
    ],
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon name="folder" size={24} className="text-[var(--color-primary-strong)]" />
        <h2
          className="myinfo-section-title text-[26px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
        >
          Documents
        </h2>
      </div>

      {/* Signature Requests */}
      {documentsData.signatureRequests.length > 0 && (
        <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-small)] p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
              <Icon name="pen" size={16} className="text-[var(--color-primary-strong)]" />
            </div>
            <h3
              className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Signature Requests
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {documentsData.signatureRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between bg-[var(--surface-neutral-white)] rounded-[var(--radius-x-small)] p-4 border border-[var(--border-neutral-x-weak)]"
              >
                <div className="flex items-center gap-3">
                  <Icon name="file" size={20} className="text-[var(--text-neutral-medium)]" />
                  <div>
                    <p className="text-[15px] font-medium text-[var(--text-neutral-strong)]">
                      {request.title}
                    </p>
                    <p className="text-[13px] text-[var(--text-neutral-medium)]">
                      {request.description} - Requested {request.requestedDate}
                    </p>
                  </div>
                </div>
                <IconButton icon="pen-to-square" variant="standard" size="small" label="Sign Now" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Documents */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="file" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              My Documents
            </h3>
            <Button variant="outlined" size="small" className="btn-desktop-only">
              Upload Document
            </Button>
            <IconButton icon="plus" variant="outlined" size="small" label="Upload Document" className="btn-mobile-only" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-6 py-3 text-left text-[13px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)] whitespace-nowrap">
                  Document Name
                </th>
                <th className="px-6 py-3 text-left text-[13px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-[13px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-[13px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] whitespace-nowrap">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-[13px] md:text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {documentsData.personalDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon name="file" size={16} className="text-red-500 shrink-0" />
                      <span className="text-[13px] md:text-[15px] text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] md:text-[15px] text-[var(--text-neutral-x-strong)] whitespace-nowrap">
                    {doc.category}
                  </td>
                  <td className="px-6 py-4 text-[13px] md:text-[15px] text-[var(--text-neutral-x-strong)] whitespace-nowrap">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4 text-[13px] md:text-[15px] text-[var(--text-neutral-medium)] whitespace-nowrap">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[var(--surface-neutral-x-weak)] rounded">
                        <Icon name="arrow-down-to-line" size={14} className="text-[var(--text-neutral-medium)]" />
                      </button>
                      <button className="p-2 hover:bg-[var(--surface-neutral-x-weak)] rounded">
                        <Icon name="trash-can" size={14} className="text-[var(--text-neutral-medium)]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Documents */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="building" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Company Documents
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {documentsData.companyDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 p-4 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-x-small)] hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors"
            >
              <Icon name="file-lines" size={24} className="text-[var(--color-primary-strong)]" />
              <div className="flex-1">
                <p className="text-[15px] font-medium text-[var(--text-neutral-strong)]">
                  {doc.name}
                </p>
                <p className="text-[13px] text-[var(--text-neutral-medium)]">
                  {doc.category} - Updated {doc.lastUpdated}
                </p>
              </div>
              <Icon name="chevron-right" size={14} className="text-[var(--text-neutral-weak)]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DocumentsTabContent;
