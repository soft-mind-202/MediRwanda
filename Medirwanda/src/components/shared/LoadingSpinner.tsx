export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block size-3 rounded-full bg-indigo-500 animate-ping"></span>
      <span className="inline-block size-3 rounded-full bg-sky-500 animate-ping [animation-delay:.2s]"></span>
      <span className="inline-block size-3 rounded-full bg-emerald-500 animate-ping [animation-delay:.4s]"></span>
    </div>
  )
}