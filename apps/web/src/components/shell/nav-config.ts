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
  ShieldCheck,
  Settings,
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

/**
 * Navigation model for the application shell. Hrefs map to real routes:
 * `/dashboard` is implemented; the rest resolve to the honest "planned module"
 * placeholder (see app/(app)/[...slug]) so there are no dead links.
 */
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
    ],
  },
  {
    key: 'support',
    items: [{ key: 'helpdesk', href: '/helpdesk', icon: LifeBuoy }],
  },
  {
    key: 'governance',
    items: [{ key: 'handover', href: '/handover', icon: PackageCheck }],
  },
  {
    key: 'system',
    items: [
      { key: 'administration', href: '/administration', icon: ShieldCheck },
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
