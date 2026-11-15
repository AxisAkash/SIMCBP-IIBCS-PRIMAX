import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs',
  secondary: 'bg-surface-sunken text-foreground border border-border hover:bg-surface',
  outline: 'border border-border-strong text-foreground hover:bg-surface-sunken',
  ghost: 'text-foreground hover:bg-surface-sunken',
  danger: 'bg-danger text-white hover:brightness-95 shadow-xs',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-base gap-2',
  lg: 'h-10 px-5 text-base gap-2',
  icon: 'h-9 w-9 justify-center',
};

const buttonBase =
  'inline-flex items-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1';

/** Compose button classes for non-button elements (e.g. links styled as buttons). */
export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(buttonBase, variantClasses[variant], sizeClasses[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', leftIcon, rightIcon, children, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});
