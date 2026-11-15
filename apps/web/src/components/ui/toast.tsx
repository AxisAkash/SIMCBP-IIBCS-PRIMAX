'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react';
import type { StatusTone } from '@simcbp/design-tokens';
import { cn } from '@/lib/cn';

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: StatusTone;
}

interface ToastApi {
  toast: (t: { title: string; description?: string; tone?: StatusTone }) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const icons: Partial<Record<StatusTone, typeof Info>> = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
  danger: XCircle,
};

const toneText: Record<StatusTone, string> = {
  neutral: 'text-muted-foreground',
  info: 'text-info',
  brand: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback<ToastApi['toast']>((t) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [
      ...prev,
      { id, title: t.title, description: t.description, tone: t.tone ?? 'success' },
    ]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-toast flex w-full max-w-sm flex-col gap-2">
        {items.map((item) => {
          const Icon = icons[item.tone] ?? Info;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-md border border-border bg-surface-raised px-4 py-3 shadow-overlay"
              role="status"
            >
              <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', toneText[item.tone])} aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                {item.description ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
