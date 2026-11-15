import {
  LayoutDashboard,
  Users,
  Banknote,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Map,
  LifeBuoy,
  PackageCheck,
  Settings,
  Bot,
  Smartphone,
  Share2,
  Boxes,
  Layers,
  ScrollText,
  UsersRound,
  Lock,
  Server,
  Database,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  /** i18n key under `nav.*`. */
  key: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  /** i18n key under `navGroups.*`. */
  key: string;
  items: NavItem[];
}

/** Navigation model for the application shell — every href resolves to a real page. */
export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'overview',
    items: [{ key: 'dashboard', href: '/dashboard', icon: LayoutDashboard }],
  },
  {
    key: 'programme',
    items: [
      { key: 'beneficiaries', href: '/beneficiaries', icon: Users },
      { key: 'payments', href: '/payments', icon: Banknote },
      { key: 'training', href: '/training', icon: GraduationCap },
      { key: 'grievance', href: '/grievance', icon: MessageSquare },
    ],
  },
  {
    key: 'intelligence',
    items: [
      { key: 'monitoring', href: '/monitoring', icon: BarChart3 },
      { key: 'gis', href: '/gis', icon: Map },
      { key: 'aiAssistant', href: '/ai-assistant', icon: Bot },
    ],
  },
  {
    key: 'operations',
    items: [
      { key: 'helpdesk', href: '/helpdesk', icon: LifeBuoy },
      { key: 'mobile', href: '/mobile', icon: Smartphone },
      { key: 'integration', href: '/integration', icon: Share2 },
    ],
  },
  {
    key: 'configuration',
    items: [
      { key: 'dynamicModules', href: '/dynamic-modules', icon: Boxes },
      { key: 'multiScheme', href: '/schemes', icon: Layers },
    ],
  },
  {
    key: 'governance',
    items: [
      { key: 'handover', href: '/handover', icon: PackageCheck },
      { key: 'audit', href: '/audit', icon: ScrollText },
    ],
  },
  {
    key: 'system',
    items: [
      { key: 'administration', href: '/administration', icon: UsersRound },
      { key: 'privacy', href: '/privacy', icon: Lock },
      { key: 'sysadmin', href: '/system-admin', icon: Server },
      { key: 'dataStore', href: '/data-store', icon: Database },
      { key: 'localization', href: '/localization', icon: Globe },
      { key: 'settings', href: '/settings', icon: Settings },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

/** Find the nav item whose href is the active route (longest-prefix match). */
export function findActiveItem(pathname: string): NavItem | undefined {
  return ALL_NAV_ITEMS.filter((i) => pathname === i.href || pathname.startsWith(`${i.href}/`)).sort(
    (a, b) => b.href.length - a.href.length,
  )[0];
}
