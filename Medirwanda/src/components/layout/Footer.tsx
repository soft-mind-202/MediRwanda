export default function Footer() {
  return (
    <footer className="border-t border-white/10 glass">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm flex items-center justify-between">
        <span>© MediLink Rwanda</span>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}