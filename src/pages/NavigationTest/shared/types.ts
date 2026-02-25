// Shared types for navigation prototypes

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  modified: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  files: FileItem[];
}

export interface SettingsSection {
  id: string;
  label: string;
  icon: string;
  categories: SettingsCategory[];
}

export interface SettingsCategory {
  id: string;
  label: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

export interface HomeTab {
  id: string;
  label: string;
}
