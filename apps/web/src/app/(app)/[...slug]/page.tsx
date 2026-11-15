import { Hammer } from 'lucide-react';
import { getLocale } from '@/lib/i18n/server';
import { getMessages, createTranslator } from '@/lib/i18n/messages';
import { ALL_NAV_ITEMS } from '@/components/shell/nav-config';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/states';

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

/**
 * Honest placeholder for every nav target that is on the roadmap but not yet
 * implemented. Ensures there are no dead links while being truthful that the
 * module is not built.
 */
export default async function PlannedModulePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const messages = getMessages(locale);
  const tNav = createTranslator(messages, 'nav');
  const tShell = createTranslator(messages, 'shell');

  const first = slug?.[0] ?? '';
  const navItem = ALL_NAV_ITEMS.find((i) => i.href === `/${first}`);
  const title = navItem ? tNav(navItem.key) : titleCase(first);

  return (
    <div>
      <PageHeader title={title} />
      <Card>
        <CardContent className="p-0">
          <EmptyState icon={Hammer} title={tShell('planned')} description={tShell('plannedHint')} />
        </CardContent>
      </Card>
    </div>
  );
}
