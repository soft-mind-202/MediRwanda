type Props = {
  open: boolean
  title?: string
  children: React.ReactNode
  onClose?: () => void
  actions?: React.ReactNode
}

export default function Dialog({ open, title, children, onClose, actions }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg rounded-xl border border-white/10 glass">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <button onClick={onClose} className="px-2 py-1 rounded-md hover:bg-white/10">✕</button>
          </div>
          <div className="px-5 py-4">
            {children}
          </div>
          {actions && <div className="px-5 py-4 border-t border-white/10 flex items-center justify-end gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  )
}