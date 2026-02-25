import React from 'react';
import { Icon } from './Icons';
import type { StatCard, FileItem } from './types';

// Toggle Switch Component
export const Toggle: React.FC<{ checked?: boolean; onChange?: () => void }> = ({
  checked = true,
  onChange
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-violet-600' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Search Bar Component
export const SearchBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 ${className}`}>
    <Icon name="search" size={16} className="text-gray-400" />
    <input
      type="text"
      placeholder="Search anything..."
      className="bg-transparent border-none outline-none text-sm flex-1 text-gray-600"
    />
  </div>
);

// Stat Card Component
export const StatCardComponent: React.FC<{ stat: StatCard }> = ({ stat }) => (
  <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
    <p className="text-xs text-gray-500 font-medium tracking-wide">{stat.label}</p>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
    <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-500'}`}>
      {stat.change}
    </p>
  </div>
);

// Traffic Chart Placeholder
export const TrafficChart: React.FC = () => (
  <div className="bg-gray-900 rounded-xl p-5 text-white">
    <h3 className="text-lg font-semibold">Traffic Distribution</h3>
    <p className="text-sm text-gray-400 mt-1">Real-time monitoring of global traffic nodes.</p>
    <div className="flex items-end justify-between gap-2 mt-6 h-32">
      {[40, 60, 55, 75, 65, 80, 70, 85, 75, 65].map((height, i) => (
        <div
          key={i}
          className="bg-violet-500 rounded-t flex-1 max-w-6"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  </div>
);

// Node Card Component
export const NodeCard: React.FC<{ node: { id: number; uptime: string } }> = ({ node }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center">
    <Icon name="server" size={24} className="text-gray-400" />
    <p className="text-sm font-medium mt-2">Node {node.id}</p>
    <p className="text-xs text-gray-500">{node.uptime} Uptime</p>
  </div>
);

// File Table Component
export const FileTable: React.FC<{ files: FileItem[]; compact?: boolean }> = ({ files, compact = false }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Size</th>
          {!compact && <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Modified</th>}
          {!compact && <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Actions</th>}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {files.map((file) => (
          <tr key={file.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Icon name="file" size={18} className="text-gray-400" />
                <span className="text-sm text-gray-900">{file.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">{file.size}</td>
            {!compact && <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{file.modified}</td>}
            {!compact && (
              <td className="px-4 py-3 text-right hidden sm:table-cell">
                <Icon name="chevronRight" size={16} className="text-gray-400" />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Settings Form Content
export const SettingsFormContent: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>

    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">General Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Display Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>

    <div className="border-t border-gray-100 pt-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Preferences</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Enable Feature {i}</p>
              <p className="text-xs text-gray-500">Receive automatic updates for this specific module.</p>
            </div>
            <Toggle />
          </div>
        ))}
      </div>
    </div>

    <div className="flex gap-3 pt-4">
      <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700">
        Save Changes
      </button>
      <button className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-900">
        Cancel
      </button>
    </div>
  </div>
);

// User Avatar
export const UserAvatar: React.FC<{ name: string; email: string; size?: 'sm' | 'md' }> = ({
  name,
  email,
  size = 'md'
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses} bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium`}>
        {initials}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
};

// Primary Button
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}> = ({ children, variant = 'primary', onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      variant === 'primary'
        ? 'bg-violet-600 text-white hover:bg-violet-700'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    } ${className}`}
  >
    {children}
  </button>
);

// Dashboard Visualization Placeholder
export const DashboardPlaceholder: React.FC = () => (
  <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 flex items-center justify-center min-h-[200px]">
    <p className="text-gray-400 italic">Main Dashboard Visualization Placeholder</p>
  </div>
);
