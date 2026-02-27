import React from 'react';
import { Icon } from '../../../components';
import {
  accountInfo,
  subscription,
  accessLevels,
  employeeFieldCategories,
  approvalWorkflows,
  installedApps,
  availableApps,
  benefitPlans,
  directorySettings,
  compensationSettings,
  payGrades,
  emailAlerts,
  hiringSettings,
  hiringStages,
  timeOffPolicies,
  billingInfo,
  billingHistory,
  generalSettings,
  loginSettings,
  apiKeys,
  webhooks,
  askBamboohrSettings,
} from '../../../data/settingsData';
import './SettingsContent.css';

interface SettingsContentProps {
  activeNav: string;
  activeSubTab: string;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({ activeNav, activeSubTab }) => {
  // Account section with sub-tabs
  if (activeNav === 'account') {
    return renderAccountContent(activeSubTab);
  }

  // Other settings sections
  switch (activeNav) {
    case 'access-levels':
      return <AccessLevelsContent />;
    case 'employee-fields':
      return <EmployeeFieldsContent />;
    case 'approvals':
      return <ApprovalsContent />;
    case 'apps':
      return <AppsContent />;
    case 'ask-bamboohr':
      return <AskBambooHRContent />;
    case 'benefits':
      return <BenefitsContent />;
    case 'company-directory':
      return <CompanyDirectoryContent />;
    case 'compensation':
      return <CompensationContent />;
    case 'email-alerts':
      return <EmailAlertsContent />;
    case 'hiring':
      return <HiringContent />;
    case 'time-off':
      return <TimeOffContent />;
    default:
      return <GenericSettingsContent title={activeNav} />;
  }
};

// Account sub-tab content
function renderAccountContent(subTab: string) {
  switch (subTab) {
    case 'account-info':
      return <AccountInfoContent />;
    case 'billing':
      return <BillingContent />;
    case 'general-settings':
      return <GeneralSettingsContent />;
    case 'login-settings':
      return <LoginSettingsContent />;
    case 'api-app-access':
      return <ApiAccessContent />;
    case 'webhooks':
      return <WebhooksContent />;
    case 'aca-settings':
    case 'icalendar-feeds':
    case 'import-hours':
    case 'company-ownership':
      return <GenericSubTabContent title={subTab} />;
    case '':
    default:
      // When no sub-tab is selected, show the Account Info as the main Account page
      return <AccountInfoContent />;
  }
}

// =============================================================================
// ACCOUNT SUB-TAB CONTENT
// =============================================================================

const AccountInfoContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Account Info</h3>
    <div className="settings-company-header">
      <h4 className="settings-company-name">{accountInfo.companyName}</h4>
      <div className="settings-company-details">
        <div className="settings-company-meta">
          <Icon name="building" size={16} />
          <span>{accountInfo.accountNumber}</span>
        </div>
        <div className="settings-company-meta">
          <Icon name="link" size={16} />
          <span>{accountInfo.url}</span>
        </div>
      </div>
    </div>
    <div className="settings-subscription">
      <div className="settings-subscription-header">
        <h4 className="settings-subscription-title">My Subscription</h4>
        <button className="settings-btn-manage">Manage Subscription</button>
      </div>
      <div className="settings-subscription-card">
        <div className="settings-subscription-icon">
          <Icon name="shield" size={24} />
        </div>
        <div className="settings-subscription-info">
          <h5 className="settings-subscription-plan">{subscription.plan}</h5>
          <p className="settings-subscription-type">{subscription.packageType}</p>
        </div>
        <span className="settings-subscription-employees">{subscription.employees} Employees</span>
      </div>
    </div>
  </div>
);

const BillingContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Billing</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Current Plan</h4>
        <button className="settings-btn-secondary">Change Plan</button>
      </div>
      <div className="settings-billing-summary">
        <div className="settings-billing-item">
          <span className="settings-billing-label">Plan</span>
          <span className="settings-billing-value">{billingInfo.planName}</span>
        </div>
        <div className="settings-billing-item">
          <span className="settings-billing-label">Billing Cycle</span>
          <span className="settings-billing-value">{billingInfo.billingCycle}</span>
        </div>
        <div className="settings-billing-item">
          <span className="settings-billing-label">Next Billing Date</span>
          <span className="settings-billing-value">{billingInfo.nextBillingDate}</span>
        </div>
        <div className="settings-billing-item">
          <span className="settings-billing-label">Amount</span>
          <span className="settings-billing-value">${billingInfo.amount.toLocaleString()}/month</span>
        </div>
      </div>
    </div>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Payment Method</h4>
        <button className="settings-btn-secondary">Update</button>
      </div>
      <div className="settings-payment-method">
        <Icon name="address-card" size={20} />
        <span>{billingInfo.paymentMethod}</span>
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">Billing History</h4>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td className="settings-link">{item.invoice}</td>
                <td>${item.amount.toLocaleString()}</td>
                <td><span className="settings-badge settings-badge-success">{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GeneralSettingsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">General Settings</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">Regional Settings</h4>
      <div className="settings-form-grid">
        <div className="settings-form-field">
          <label className="settings-label">Timezone</label>
          <div className="settings-select-display">{generalSettings.timezone}</div>
        </div>
        <div className="settings-form-field">
          <label className="settings-label">Date Format</label>
          <div className="settings-select-display">{generalSettings.dateFormat}</div>
        </div>
        <div className="settings-form-field">
          <label className="settings-label">Time Format</label>
          <div className="settings-select-display">{generalSettings.timeFormat}</div>
        </div>
        <div className="settings-form-field">
          <label className="settings-label">Language</label>
          <div className="settings-select-display">{generalSettings.language}</div>
        </div>
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">Calendar Settings</h4>
      <div className="settings-form-grid">
        <div className="settings-form-field">
          <label className="settings-label">Fiscal Year Starts</label>
          <div className="settings-select-display">{generalSettings.fiscalYearStart}</div>
        </div>
        <div className="settings-form-field">
          <label className="settings-label">Week Starts On</label>
          <div className="settings-select-display">{generalSettings.weekStartsOn}</div>
        </div>
      </div>
    </div>
  </div>
);

const LoginSettingsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Login Settings</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">Password Requirements</h4>
      <div className="settings-toggle-list">
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Minimum Password Length</span>
            <span className="settings-toggle-value">{loginSettings.passwordMinLength} characters</span>
          </div>
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Require Special Characters</span>
          </div>
          <input type="checkbox" defaultChecked={loginSettings.requireSpecialChars} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Require Numbers</span>
          </div>
          <input type="checkbox" defaultChecked={loginSettings.requireNumbers} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Password Expiration</span>
            <span className="settings-toggle-value">Every {loginSettings.passwordExpireDays} days</span>
          </div>
        </div>
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">Security</h4>
      <div className="settings-toggle-list">
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Two-Factor Authentication</span>
            <span className="settings-toggle-desc">Require 2FA for all users</span>
          </div>
          <input type="checkbox" defaultChecked={loginSettings.twoFactorEnabled} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Session Timeout</span>
            <span className="settings-toggle-value">{loginSettings.sessionTimeoutMinutes} minutes</span>
          </div>
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Max Login Attempts</span>
            <span className="settings-toggle-value">{loginSettings.maxLoginAttempts} attempts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ApiAccessContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">API & App Access</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">API Keys</h4>
        <button className="settings-btn-primary">Generate New Key</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Last Used</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id}>
                <td>{key.name}</td>
                <td>{key.created}</td>
                <td>{key.lastUsed}</td>
                <td>
                  <span className={`settings-badge ${key.status === 'active' ? 'settings-badge-success' : 'settings-badge-neutral'}`}>
                    {key.status}
                  </span>
                </td>
                <td>
                  <button className="settings-btn-text">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const WebhooksContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Webhooks</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Configured Webhooks</h4>
        <button className="settings-btn-primary">Add Webhook</button>
      </div>
      {webhooks.length > 0 ? (
        <div className="settings-table-container">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Events</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook) => (
                <tr key={webhook.id}>
                  <td>{webhook.name}</td>
                  <td className="settings-url">{webhook.url}</td>
                  <td>{webhook.events.join(', ')}</td>
                  <td>
                    <span className="settings-badge settings-badge-success">{webhook.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="settings-empty-state">
          <p>No webhooks configured yet.</p>
        </div>
      )}
    </div>
  </div>
);

// =============================================================================
// MAIN SETTINGS SECTION CONTENT
// =============================================================================

const AccessLevelsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Access Levels</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">User Roles</h4>
        <button className="settings-btn-primary">Create Role</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Users</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accessLevels.map((level) => (
              <tr key={level.id}>
                <td className="settings-text-bold">{level.name}</td>
                <td>{level.users}</td>
                <td className="settings-text-muted">{level.description}</td>
                <td>
                  <button className="settings-btn-text">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const EmployeeFieldsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Employee Fields</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Field Categories</h4>
        <button className="settings-btn-primary">Add Custom Field</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Fields</th>
              <th>Required</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeFieldCategories.map((category) => (
              <tr key={category.id}>
                <td className="settings-text-bold">{category.name}</td>
                <td>{category.fields}</td>
                <td>{category.required}</td>
                <td>
                  <button className="settings-btn-text">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ApprovalsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Approvals</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Approval Workflows</h4>
        <button className="settings-btn-primary">Create Workflow</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Approvers</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvalWorkflows.map((workflow) => (
              <tr key={workflow.id}>
                <td className="settings-text-bold">{workflow.name}</td>
                <td>{workflow.approvers}</td>
                <td>
                  <span className={`settings-badge ${workflow.status === 'active' ? 'settings-badge-success' : 'settings-badge-neutral'}`}>
                    {workflow.status}
                  </span>
                </td>
                <td>
                  <button className="settings-btn-text">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AppsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Apps</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">Connected Apps</h4>
      <div className="settings-apps-grid">
        {installedApps.map((app) => (
          <div key={app.id} className="settings-app-card">
            <div className="settings-app-info">
              <div className="settings-app-icon">
                <Icon name="link" size={20} />
              </div>
              <div>
                <h5 className="settings-app-name">{app.name}</h5>
                <span className="settings-app-category">{app.category}</span>
              </div>
            </div>
            <div className="settings-app-status">
              <span className="settings-badge settings-badge-success">{app.status}</span>
              <span className="settings-text-muted">Last sync: {app.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">Available Integrations</h4>
      <div className="settings-apps-grid">
        {availableApps.map((app) => (
          <div key={app.id} className="settings-app-card settings-app-card-available">
            <div className="settings-app-info">
              <div className="settings-app-icon settings-app-icon-muted">
                <Icon name="link" size={20} />
              </div>
              <div>
                <h5 className="settings-app-name">{app.name}</h5>
                <span className="settings-app-description">{app.description}</span>
              </div>
            </div>
            <button className="settings-btn-secondary">Connect</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AskBambooHRContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Ask BambooHR</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">General Settings</h4>
      <div className="settings-toggle-list">
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Enable Ask BambooHR</span>
            <span className="settings-toggle-desc">Allow employees to submit questions</span>
          </div>
          <input type="checkbox" defaultChecked={askBamboohrSettings.enabled} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Allow Anonymous Questions</span>
            <span className="settings-toggle-desc">Let employees ask questions without revealing their identity</span>
          </div>
          <input type="checkbox" defaultChecked={askBamboohrSettings.allowAnonymous} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Auto-Response</span>
            <span className="settings-toggle-desc">Automatically send acknowledgment emails</span>
          </div>
          <input type="checkbox" defaultChecked={askBamboohrSettings.autoResponseEnabled} className="settings-toggle" />
        </div>
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">Question Categories</h4>
      <div className="settings-tags">
        {askBamboohrSettings.categories.map((category) => (
          <span key={category} className="settings-tag">{category}</span>
        ))}
        <button className="settings-btn-text">+ Add Category</button>
      </div>
    </div>
  </div>
);

const BenefitsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Benefits</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Benefit Plans</h4>
        <button className="settings-btn-primary">Add Plan</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Provider</th>
              <th>Enrolled</th>
              <th>Eligible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {benefitPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="settings-text-bold">{plan.name}</td>
                <td>{plan.provider}</td>
                <td>{plan.enrolled}</td>
                <td>{plan.eligible}</td>
                <td>
                  <button className="settings-btn-text">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CompanyDirectoryContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Company Directory</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">Display Settings</h4>
      <div className="settings-toggle-list">
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Employee Photos</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showPhotos} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Job Titles</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showJobTitles} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Departments</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showDepartments} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Phone Numbers</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showPhoneNumbers} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Email Addresses</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showEmail} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Birthdays</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showBirthdays} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Work Anniversaries</span>
          </div>
          <input type="checkbox" defaultChecked={directorySettings.showAnniversaries} className="settings-toggle" />
        </div>
      </div>
    </div>
  </div>
);

const CompensationContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Compensation</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">General Settings</h4>
      <div className="settings-form-grid">
        <div className="settings-form-field">
          <label className="settings-label">Default Currency</label>
          <div className="settings-select-display">{compensationSettings.currency}</div>
        </div>
        <div className="settings-form-field">
          <label className="settings-label">Default Pay Frequency</label>
          <div className="settings-select-display">{compensationSettings.defaultPayFrequency}</div>
        </div>
      </div>
      <div className="settings-toggle-list" style={{ marginTop: '16px' }}>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Show Salary to Managers</span>
            <span className="settings-toggle-desc">Allow managers to view direct report salaries</span>
          </div>
          <input type="checkbox" defaultChecked={compensationSettings.showSalaryToManagers} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Require Approval for Changes</span>
            <span className="settings-toggle-desc">Compensation changes require manager approval</span>
          </div>
          <input type="checkbox" defaultChecked={compensationSettings.requireApprovalForChanges} className="settings-toggle" />
        </div>
      </div>
    </div>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Pay Grades</h4>
        <button className="settings-btn-primary">Add Grade</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Min Salary</th>
              <th>Max Salary</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            {payGrades.map((grade) => (
              <tr key={grade.id}>
                <td className="settings-text-bold">{grade.name}</td>
                <td>${grade.minSalary.toLocaleString()}</td>
                <td>${grade.maxSalary.toLocaleString()}</td>
                <td>{grade.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const EmailAlertsContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Email Alerts</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Notification Settings</h4>
        <button className="settings-btn-primary">Create Alert</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Alert Name</th>
              <th>Recipients</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>
            {emailAlerts.map((alert) => (
              <tr key={alert.id}>
                <td className="settings-text-bold">{alert.name}</td>
                <td>{alert.recipients}</td>
                <td>
                  <input type="checkbox" defaultChecked={alert.enabled} className="settings-toggle" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const HiringContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Hiring</h3>

    <div className="settings-card">
      <h4 className="settings-card-title">Job Board Integrations</h4>
      <div className="settings-tags">
        {hiringSettings.jobBoardIntegrations.map((board) => (
          <span key={board} className="settings-tag settings-tag-success">{board}</span>
        ))}
        <button className="settings-btn-text">+ Add Integration</button>
      </div>
    </div>

    <div className="settings-card">
      <h4 className="settings-card-title">General Settings</h4>
      <div className="settings-toggle-list">
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Auto-Reject After</span>
            <span className="settings-toggle-value">{hiringSettings.autoRejectAfterDays} days of inactivity</span>
          </div>
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Require Interview Scorecard</span>
            <span className="settings-toggle-desc">Interviewers must complete a scorecard</span>
          </div>
          <input type="checkbox" defaultChecked={hiringSettings.requireInterviewScorecard} className="settings-toggle" />
        </div>
        <div className="settings-toggle-item">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label">Background Check Provider</span>
            <span className="settings-toggle-value">{hiringSettings.backgroundCheckProvider}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Hiring Stages</h4>
        <button className="settings-btn-secondary">Edit Stages</button>
      </div>
      <div className="settings-stages">
        {hiringStages.map((stage, index) => (
          <div key={stage.id} className="settings-stage">
            <span className="settings-stage-number">{index + 1}</span>
            <span className="settings-stage-name">{stage.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TimeOffContent: React.FC = () => (
  <div className="settings-content-section">
    <h3 className="settings-section-title">Time Off</h3>

    <div className="settings-card">
      <div className="settings-card-header">
        <h4 className="settings-card-title">Time Off Policies</h4>
        <button className="settings-btn-primary">Add Policy</button>
      </div>
      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Accrual Rate</th>
              <th>Max Balance</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeOffPolicies.map((policy) => (
              <tr key={policy.id}>
                <td className="settings-text-bold">{policy.name}</td>
                <td>{policy.accrualRate}</td>
                <td>{policy.maxBalance} days</td>
                <td>{policy.employees}</td>
                <td>
                  <button className="settings-btn-text">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Generic fallback content
const GenericSettingsContent: React.FC<{ title: string }> = ({ title }) => {
  const formattedTitle = title.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <div className="settings-content-section">
      <h3 className="settings-section-title">{formattedTitle}</h3>
      <div className="settings-card">
        <p className="settings-text-muted">
          Configure your {formattedTitle.toLowerCase()} settings and preferences here.
        </p>
      </div>
    </div>
  );
};

const GenericSubTabContent: React.FC<{ title: string }> = ({ title }) => {
  const formattedTitle = title.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <div className="settings-content-section">
      <h3 className="settings-section-title">{formattedTitle}</h3>
      <div className="settings-card">
        <p className="settings-text-muted">
          Configure your {formattedTitle.toLowerCase()} settings here.
        </p>
      </div>
    </div>
  );
};

export default SettingsContent;
