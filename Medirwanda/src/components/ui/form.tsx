export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>
}

export function FormSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="p-5 rounded-xl border border-white/10 glass space-y-4">{children}</div>
    </section>
  )
}