import React from 'react'
import { cn } from '../../lib/utils/helpers'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  full?: boolean
  asChild?: boolean
}

export default function Button({ variant = 'primary', size = 'md', loading, full, asChild, className, children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
  const sizes: Record<Size, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-5 text-lg',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    secondary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    outline: 'border border-white/10 hover:bg-white/10',
    ghost: 'hover:bg-white/10',
  }
  const classes = cn(base, sizes[size], variants[variant], full && 'w-full', className)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn((children as any).props?.className, classes),
    })
  }
  return (
    <button {...props} className={classes}>
      {loading && <span className="size-3 rounded-full bg-white/60 animate-ping" />}
      {children}
    </button>
  )
}