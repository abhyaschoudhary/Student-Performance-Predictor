import { LoaderCircle } from 'lucide-react'

export default function LoadingState({ text = 'Analyzing student performance...' }) {
  return <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700" role="status" aria-live="polite"><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />{text}</div>
}
