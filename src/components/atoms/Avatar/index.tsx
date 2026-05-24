import * as RadixAvatar from '@radix-ui/react-avatar'
import { cn } from '@/utils/cn'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

function initials(name?: string) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  return (
    <RadixAvatar.Root
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-border',
        sizes[size],
        className
      )}
    >
      <RadixAvatar.Image src={src ?? undefined} alt={name} className="h-full w-full object-cover" />
      <RadixAvatar.Fallback className="flex h-full w-full items-center justify-center bg-secondary/20 font-heading font-bold text-secondary">
        {initials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
