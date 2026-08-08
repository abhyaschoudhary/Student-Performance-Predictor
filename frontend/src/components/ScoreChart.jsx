import { ResponsiveContainer, Tooltip, Bar, BarChart, Cell, XAxis, YAxis } from 'recharts'
import { getScoreState } from '../utils/predictionUtils'

export default function ScoreChart({ score }) {
  const state = getScoreState(score)
  const data = [{ name: 'Predicted score', score: Number(score), maximum: 100 }]
  return <section className="card p-5 sm:p-6"><div><p className="eyebrow">Score overview</p><h2 className="mt-1 text-lg font-semibold text-ink">Prediction against the 100-point scale</h2></div><div className="mt-5 h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}><XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis type="category" dataKey="name" width={102} tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 12 }} /><Tooltip formatter={(value) => [`${Number(value).toFixed(1)} / 100`, 'Score']} cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,.08)' }} /><Bar dataKey="score" radius={[0, 7, 7, 0]} barSize={34}>{data.map((entry) => <Cell key={entry.name} fill={state.color} />)}</Bar></BarChart></ResponsiveContainer></div></section>
}
