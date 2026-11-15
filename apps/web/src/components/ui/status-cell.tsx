import type { Locale } from '@simcbp/i18n';
import { StatusBadge } from './status-badge';
import { statusLabel, type StatusMeta } from '@/lib/statuses';

export function StatusCell({ meta, locale }: { meta: StatusMeta | undefined; locale: Locale }) {
  if (!meta) return null;
  return <StatusBadge tone={meta.tone} label={statusLabel(meta, locale)} />;
}
