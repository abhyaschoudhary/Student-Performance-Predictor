import { AlertCircle, X } from 'lucide-react'

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null
  return <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><AlertCircle className="mt-0.5 shrink-0" size={18} /><p className="flex-1">{message}</p>{onDismiss && <button className="rounded p-0.5 hover:bg-red-100" aria-label="Dismiss error" onClick={onDismiss}><X size={17} /></button>}</div>
}
