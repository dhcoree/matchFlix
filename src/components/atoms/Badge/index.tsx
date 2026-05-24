import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-body font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface border border-border text-muted',
        primary: 'bg-primary/15 text-primary border border-primary/20',
        secondary: 'bg-secondary/15 text-secondary border border-secondary/20',
        accent: 'bg-accent/15 text-accent border border-accent/20',
        success: 'bg-success/15 text-success border border-success/20',
        warning: 'bg-warning/15 text-warning border border-warning/20',
        glass: 'glass text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
}
