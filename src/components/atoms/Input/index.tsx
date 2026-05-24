import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-heading font-medium text-muted">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-muted pointer-events-none">{leftIcon}</span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60',
              'transition-all duration-200 outline-none',
              'focus:border-secondary focus:ring-2 focus:ring-secondary/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-primary focus:border-primary focus:ring-primary/20',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-muted pointer-events-none">{rightIcon}</span>
          )}
        </div>
        {error && <p className="text-xs text-primary">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
