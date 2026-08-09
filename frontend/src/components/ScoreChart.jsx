import { ResponsiveContainer, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function ScoreChart({ trend = [] }) {
  if (!trend.length) return <section className="card p-5 sm:p-6"><p className="eyebrow">Score trend</p><h2 className="mt-1 text-lg font-semibold text-ink">Performance over time</h2><p className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">Your score trend will appear after your first prediction.</p></section>
  const data = trend.map((item) => ({ ...item, date: formatDate(item.created_at), score: Number(item.predicted_score) }))
  return <section className="card p-5 sm:p-6"><div><p className="eyebrow">Score trend</p><h2 className="mt-1 text-lg font-semibold text-ink">Performance over time</h2><p className="mt-1 text-xs text-slate-500">Predictions are ordered from oldest to newest.</p></div><div className="mt-5 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 16, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e9eef5" /><XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} minTickGap={28} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} /><Tooltip formatter={(value, name, item) => { if (name === 'score') return [`${Number(value).toFixed(1)} / 100`, 'Predicted score']; return [value, name] }} labelFormatter={(_, dataPoints) => { const item = dataPoints?.[0]?.payload; return item ? new Date(item.created_at).toLocaleString() : '' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,.08)' }} /><Line type="monotone" dataKey="score" stroke="#2674d9" strokeWidth={3} dot={{ r: 4, fill: '#2674d9' }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div></section>
}
