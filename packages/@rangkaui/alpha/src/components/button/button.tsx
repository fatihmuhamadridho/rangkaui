import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClassName =
  'inline-flex items-center justify-center rounded-full border font-semibold whitespace-nowrap select-none transition-colors transition-opacity disabled:cursor-not-allowed disabled:opacity-50';

const variantClassNameMap: Record<ButtonVariant, string> = {
  solid: 'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-800',
  outline: 'border-slate-900 bg-transparent text-slate-900 hover:bg-slate-100',
  ghost: 'border-transparent bg-transparent text-slate-900 hover:bg-slate-100',
};

const sizeClassNameMap: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
};

function cn(...values: Array<string | undefined | false | null>) {
  return values.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', size = 'md', className, style, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(baseClassName, variantClassNameMap[variant], sizeClassNameMap[size], className)}
      style={style}
      disabled={disabled}
      {...props}
    />
  );
});
