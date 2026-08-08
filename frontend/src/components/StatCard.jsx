export default function StatCard({ label, value, detail, icon: Icon, tone = 'brand' }) {
  const tones = { brand: 'bg-brand-50 text-brand-700', green: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700', red: 'bg-red-50 text-red-700' }
  return <article className="card p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>{detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}</div>{Icon && <span className={`grid h-9 w-9 place-items-center rounded-lg ${tones[tone]}`}><Icon size={18} aria-hidden="true" /></span>}</div></article>
}
