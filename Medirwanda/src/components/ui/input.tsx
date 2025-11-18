import { cn } from '../../lib/utils/helpers'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Input({ label, hint, error, leftIcon, rightIcon, className, ...props }: Props) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && <label className="block text-sm">{label}</label>}
      <div className={cn('flex items-center gap-2 rounded-md bg-white/5 border border-white/10 px-3', error && 'border-red-500/60')}>
        {leftIcon && <span className="text-neutral-500">{leftIcon}</span>}
        <input {...props} className="w-full bg-transparent py-2 outline-none" />
        {rightIcon && <span className="text-neutral-500">{rightIcon}</span>}
      </div>
      {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}