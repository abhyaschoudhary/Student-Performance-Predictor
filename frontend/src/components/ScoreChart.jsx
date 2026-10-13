import { ResponsiveContainer, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function ScoreChart({ trend = [] }) {
  if (!trend.length) return <section className="card p-5 sm:p-6"><p className="eyebrow">Score trend</p><h2 className="mt-1 text-lg font-semibold text-ink">Performance over time</h2><p className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">Your score trend will appear after your first prediction.</p></section>
  const data = trend.map((item) => ({ ...item, date: formatDate(item.created_at), score: Number(item.predicted_score) }))
  return <section className="card p-5 sm:p-6"><div><p className="eyebrow">Score trend</p><h2 className="mt-1 text-lg font-semibold text-ink">Performance over time</h2><p className="mt-1 text-xs text-slate-500">Predictions are ordered from oldest to newest.</p></div><div className="chart-well mt-5 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 16, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e7e5e0" /><XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#686660', fontSize: 11 }} minTickGap={28} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#686660', fontSize: 11 }} /><Tooltip formatter={(value, name) => { if (name === 'score') return [`${Number(value).toFixed(1)} / 100`, 'Predicted score']; return [value, name] }} labelFormatter={(_, dataPoints) => { const item = dataPoints?.[0]?.payload; return item ? new Date(item.created_at).toLocaleString() : '' }} contentStyle={{ borderRadius: 8, background: '#fff', color: '#171717', border: '1px solid #e7e5e0', boxShadow: '0 6px 18px rgba(23,23,23,.08)' }} /><Line type="monotone" dataKey="score" stroke="#54763c" strokeWidth={2.5} dot={{ r: 4, fill: '#a6513f', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#a6513f', stroke: '#fff', strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div></section>
}
