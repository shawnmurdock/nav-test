import { Icon, Button, IconButton, TextInput } from '../../components';

interface EmergencyTabContentProps {
  employeeName: string;
}

export function EmergencyTabContent({ employeeName: _employeeName }: EmergencyTabContentProps) {
  // Mock data for emergency contacts
  const emergencyData = {
    primaryContact: {
      name: 'Michael Cordova',
      relationship: 'Spouse',
      homePhone: '801-555-1234',
      workPhone: '801-555-5678',
      mobilePhone: '801-555-9012',
      email: 'michael.cordova@email.com',
      address: '1234 Oak Street',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
    secondaryContacts: [
      {
        id: '1',
        name: 'Maria Cordova',
        relationship: 'Mother',
        phone: '801-555-3456',
        email: 'maria.cordova@email.com',
      },
      {
        id: '2',
        name: 'David Cordova',
        relationship: 'Father',
        phone: '801-555-7890',
        email: 'david.cordova@email.com',
      },
    ],
    medicalInfo: {
      bloodType: 'O+',
      allergies: 'Penicillin, Shellfish',
      medications: 'None',
      medicalConditions: 'None',
      physicianName: 'Dr. Sarah Johnson',
      physicianPhone: '801-555-2468',
      preferredHospital: 'Seattle Medical Center',
      insuranceProvider: 'Blue Cross Blue Shield',
      insurancePolicyNumber: 'BCB-123456789',
    },
    dependents: [
      {
        id: '1',
        name: 'Emma Cordova',
        relationship: 'Daughter',
        dateOfBirth: 'Mar 15, 2018',
        ssn: '***-**-1234',
      },
      {
        id: '2',
        name: 'James Cordova',
        relationship: 'Son',
        dateOfBirth: 'Jul 22, 2020',
        ssn: '***-**-5678',
      },
    ],
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="bell" size={24} className="text-[var(--color-primary-strong)]" />
          <h2
            className="myinfo-section-title text-[26px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
          >
            Emergency
          </h2>
        </div>
        <Button variant="text" icon="grid-2-plus" iconPosition="left" showCaret={true}>
          Customize Layout
        </Button>
      </div>

      {/* Primary Emergency Contact */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="myinfo-card-header-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div className="flex items-center justify-center w-9 h-9 bg-red-100 rounded-[var(--radius-x-small)] shrink-0" style={{ width: '36px', height: '36px', minWidth: '36px', flexShrink: 0 }}>
            <Icon name="phone" size={14} className="text-red-600" />
          </div>
          <h3
            className="myinfo-card-title text-base font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '22px', fontSize: '16px' }}
          >
            Primary Emergency Contact
          </h3>
        </div>

        {/* Contact Name and Relationship */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-[416px]">
          <TextInput label="Contact Name" value={emergencyData.primaryContact.name} />
          <TextInput label="Relationship" value={emergencyData.primaryContact.relationship} type="dropdown" />
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-3 gap-4 mb-6 max-w-[624px]">
          <TextInput label="Home Phone" value={emergencyData.primaryContact.homePhone} icon="phone" />
          <TextInput label="Work Phone" value={emergencyData.primaryContact.workPhone} icon="building" />
          <TextInput label="Mobile Phone" value={emergencyData.primaryContact.mobilePhone} icon="mobile" />
        </div>

        {/* Email */}
        <div className="mb-6 max-w-[288px]">
          <TextInput label="Email" value={emergencyData.primaryContact.email} icon="envelope" />
        </div>

        {/* Address */}
        <div className="mb-6 max-w-[416px]">
          <TextInput label="Street Address" value={emergencyData.primaryContact.address} />
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-[624px]">
          <TextInput label="City" value={emergencyData.primaryContact.city} />
          <TextInput label="State" value={emergencyData.primaryContact.state} type="dropdown" />
          <TextInput label="ZIP Code" value={emergencyData.primaryContact.zip} />
        </div>
      </div>

      {/* Secondary Emergency Contacts */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="users" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Secondary Contacts
            </h3>
            <Button variant="outlined" size="small" className="btn-desktop-only">
              Add Contact
            </Button>
            <IconButton icon="plus" variant="outlined" size="small" label="Add Contact" className="btn-mobile-only" />
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Relationship
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {emergencyData.secondaryContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {contact.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {contact.relationship}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {contact.phone}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {contact.email}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[var(--surface-neutral-x-weak)] rounded">
                        <Icon name="pen" size={14} className="text-[var(--text-neutral-medium)]" />
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

      {/* Medical Information */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="myinfo-card-header-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div className="flex items-center justify-center w-9 h-9 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0" style={{ width: '36px', height: '36px', minWidth: '36px', flexShrink: 0 }}>
            <Icon name="heart" size={14} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="myinfo-card-title text-base font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '22px', fontSize: '16px' }}
          >
            Medical Information
          </h3>
        </div>

        {/* Blood Type and Allergies */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-[416px]">
          <TextInput label="Blood Type" value={emergencyData.medicalInfo.bloodType} type="dropdown" />
          <TextInput label="Allergies" value={emergencyData.medicalInfo.allergies} />
        </div>

        {/* Medications and Conditions */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-[416px]">
          <TextInput label="Current Medications" value={emergencyData.medicalInfo.medications} />
          <TextInput label="Medical Conditions" value={emergencyData.medicalInfo.medicalConditions} />
        </div>

        {/* Physician Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-[416px]">
          <TextInput label="Physician Name" value={emergencyData.medicalInfo.physicianName} />
          <TextInput label="Physician Phone" value={emergencyData.medicalInfo.physicianPhone} icon="phone" />
        </div>

        {/* Hospital */}
        <div className="mb-6 max-w-[288px]">
          <TextInput label="Preferred Hospital" value={emergencyData.medicalInfo.preferredHospital} />
        </div>

        {/* Insurance */}
        <div className="grid grid-cols-2 gap-4 max-w-[416px]">
          <TextInput label="Insurance Provider" value={emergencyData.medicalInfo.insuranceProvider} />
          <TextInput label="Policy Number" value={emergencyData.medicalInfo.insurancePolicyNumber} />
        </div>
      </div>

      {/* Dependents */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="user-group" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Dependents
            </h3>
            <Button variant="outlined" size="small" className="btn-desktop-only">
              Add Dependent
            </Button>
            <IconButton icon="plus" variant="outlined" size="small" label="Add Dependent" className="btn-mobile-only" />
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Relationship
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Date of Birth
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  SSN
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {emergencyData.dependents.map((dependent) => (
                <tr key={dependent.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {dependent.name}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {dependent.relationship}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {dependent.dateOfBirth}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-medium)]">
                    {dependent.ssn}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[var(--surface-neutral-x-weak)] rounded">
                        <Icon name="pen" size={14} className="text-[var(--text-neutral-medium)]" />
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
    </>
  );
}

export default EmergencyTabContent;
