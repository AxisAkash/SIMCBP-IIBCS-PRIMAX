import { FlaskConical } from 'lucide-react';

/** Prominent, unmissable marker that dashboard figures are illustrative. */
export function DemoBanner({ message }: { message: string }) {
  return (
    <div
      role="note"
      className="mb-6 flex items-center gap-2.5 rounded-md border-l-2 border-warning bg-warning-soft px-4 py-2.5 text-sm text-foreground"
    >
      <FlaskConical className="h-4 w-4 shrink-0 text-warning" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
