export type ViewId = 'overview' | 'services' | 'deployments' | 'metrics' | 'alerts' | 'config';

export interface NavItem {
  id: ViewId;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'deployments', label: 'Deployments' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'config', label: 'Config' },
];
